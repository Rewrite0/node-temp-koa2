import fs from 'fs';

const files = fs.readdirSync('./src/controllers').filter(file => file !== 'index.js')

let modules = {};

for(const file of files) {
  const module = await import(`./${file}`);
  modules = {
    ...modules,
    ...module
  }
}

export default modules;