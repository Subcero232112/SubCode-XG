import inquirer from 'inquirer';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalk from 'chalk';
import fs from 'fs';
import { interpretarArchivo } from './interprete.js';

export { interpretarArchivo };

export async function mostrarMenu() {
  console.clear();
  console.log(gradient.pastel(figlet.textSync('SubCode X', { horizontalLayout: 'full' })));
  console.log(chalk.yellow("🔥 Tu lenguaje, tu estilo - CLI Oficial"));

  const respuesta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '¿Qué deseas hacer?',
      choices: ['Instalar versión', 'Iniciar proyecto', 'Ejecutar archivo .subx', 'Salir']
    }
  ]);

  switch (respuesta.opcion) {
    case 'Instalar versión':
      await instalarVersion();
      break;
    case 'Iniciar proyecto':
      await iniciarProyecto();
      break;
    case 'Ejecutar archivo .subx':
      const archivos = fs.readdirSync('./').filter(f => f.endsWith('.subx'));
      if (archivos.length === 0) return console.log(chalk.red('❌ No hay archivos .subx'));

      const { archivo } = await inquirer.prompt([
        { type: 'list', name: 'archivo', message: 'Selecciona un archivo:', choices: archivos }
      ]);

      interpretarArchivo(archivo);
      break;
    case 'Salir':
      console.log(chalk.blue("👋 Chao loco, vuelve cuando quieras"));
      process.exit(0);
  }
}

async function instalarVersion() {
  const { version } = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: '¿Qué versión deseas instalar?',
      choices: ['Alpha 0.1', 'Beta 1.0', 'Estable 1.1']
    }
  ]);
  console.log(chalk.green(`📦 Instalando SubCode X versión: ${version}...`));
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(chalk.green("✅ Instalación completada."));
}

async function iniciarProyecto() {
  const { nombre } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: '¿Nombre del nuevo archivo .subx?' }
  ]);

  fs.writeFileSync(`${nombre}.subx`, 'decir "Hola desde SubCode X!"');
  console.log(chalk.green(`📝 Archivo creado: ${nombre}.subx`));
}
