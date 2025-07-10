import fs from 'fs';
import chalk from 'chalk';

export function interpretarArchivo(nombreArchivo) {
  if (!fs.existsSync(nombreArchivo)) {
    console.log(chalk.red(`❌ El archivo ${nombreArchivo} no existe.`));
    return;
  }

  const contenido = fs.readFileSync(nombreArchivo, 'utf8');
  const lineas = contenido.split('\n');
  const variables = {};

  console.log(chalk.cyan(`🧠 Interpretando ${nombreArchivo}...\n`));

  for (let linea of lineas) {
    linea = linea.trim();

    if (linea.startsWith('decir ')) {
      const texto = linea.slice(6).replace(/"/g, '');
      console.log(chalk.green(`🗣️  ${texto}`));
    }

    else if (linea.startsWith('variable ')) {
      const [_, resto] = linea.split('variable ');
      const [nombre, valor] = resto.split('=').map(x => x.trim());
      variables[nombre] = isNaN(valor) ? valor : Number(valor);
      console.log(chalk.yellow(`📦 Variable ${nombre} = ${variables[nombre]}`));
    }

    else if (linea.startsWith('mostrar ')) {
      const nombre = linea.split(' ')[1];
      console.log(`🔍 ${nombre} =`, variables[nombre] ?? chalk.red('❌ No existe'));
    }

    else if (linea.startsWith('si ')) {
      const [cond, accion] = linea.slice(3).split(' entonces ');
      try {
        const evalCond = cond.replace(/\b(\w+)\b/g, w => variables[w] ?? w);
        if (eval(evalCond)) {
          if (accion.startsWith('decir ')) {
            const texto = accion.slice(6).replace(/"/g, '');
            console.log(chalk.blue(`📣 ${texto}`));
          }
        }
      } catch (err) {
        console.log(chalk.red(`❌ Error evaluando condición: ${cond}`));
      }
    }

    else if (linea.startsWith('repetir ')) {
      const partes = linea.split(' ');
      const veces = parseInt(partes[1]);
      const accion = partes.slice(3).join(' ');

      for (let i = 0; i < veces; i++) {
        if (accion.startsWith('decir ')) {
          const texto = accion.slice(6).replace(/"/g, '');
          console.log(chalk.magenta(`🔁 ${texto}`));
        }
      }
    }
  }

  console.log(chalk.cyan('\n✅ Ejecución terminada.\n'));
}
