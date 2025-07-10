#!/usr/bin/env node

import { mostrarMenu, interpretarArchivo } from '../src/funciones.js';

const args = process.argv.slice(2);

if (args[0] === 'run' && args[1]) {
  interpretarArchivo(args[1]);
} else {
  mostrarMenu();
}
