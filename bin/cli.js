#!/usr/bin/env node

const program = require('commander');
const {validateAges, validateLevels, validateGenders} =  require('..');
const pkg = require('../package');

program.version(pkg.version);
program
  .option('-a, --ages', 'Validate ages')
  .option('-l, --levels', 'Validate levels')
  .option('-g, --genders', 'Validate genders');

program.parse(process.argv);

if (!program.ages && !program.levels && !program.genders) {
  program.ages = program.levels = program.genders = true;
}

main();

async function main() {
  if (program.ages) {
    const invalids = await validateAges();

    if (invalids.length === 0) {
      console.log('No invalid ages found.');
    } else {
      console.log('The following ages are invalid:');

      invalids.forEach(console.log);
    }
  }

  if (program.levels) {
    const invalids = await validateLevels();

    if (invalids.length === 0) {
      console.log('No invalid levels found.');
    } else {
      console.log('The following levels are invalid:');

      invalids.forEach(console.log);
    }
  }

  if (program.genders) {
    const invalids = await validateGenders();

    if (invalids.length === 0) {
      console.log('No invalid genders found.');
    } else {
      console.log('The following genders are invalid:');

      invalids.forEach(console.log);
    }
  }
}