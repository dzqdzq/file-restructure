#!/usr/bin/env node

const yargs = require('yargs');
const FileRestructure = require('../lib/index');

// 配置命令行参数
const argv = yargs
  .usage('Usage: $0 <sourcePath> <referenceDir> <outputDir> [options]')
  .command('$0 <sourcePath> <referenceDir> <outputDir>', 'Restructure files based on reference directory', (yargs) => {
    yargs
      .positional('sourcePath', {
        describe: 'Source directory path',
        type: 'string',
        demandOption: true
      })
      .positional('referenceDir', {
        describe: 'Reference directory path',
        type: 'string',
        demandOption: true
      })
      .positional('outputDir', {
        describe: 'Output directory path',
        type: 'string',
        demandOption: true
      });
  })
  .option('extensions', {
    alias: 'e',
    describe: 'File extensions to match (comma-separated). Leave empty to process all files.',
    type: 'string',
    default: ''
  })
  .option('verbose', {
    alias: 'v',
    describe: 'Verbose output',
    type: 'boolean',
    default: false
  })
  .example('$0 ./src ./reference ./output', 'Basic usage')
  .example('$0 ./src ./reference ./output -e ".ts,.meta"', 'With custom extensions')
  .example('$0 ./src ./reference ./output -v', 'With verbose output')
  .help('h')
  .alias('h', 'help')
  .version()
  .argv;

// 解析扩展名参数
const extensions = argv.extensions ? argv.extensions.split(',').map(ext => ext.trim()) : [];

// 创建配置对象
const config = {
  sourceDir: argv.sourcePath,
  referenceDir: argv.referenceDir,
  outputDir: argv.outputDir,
  extensions: extensions
};

// 显示配置信息
if (argv.verbose) {
  console.log('Configuration:');
  console.log(`  Source Directory: ${config.sourceDir}`);
  console.log(`  Reference Directory: ${config.referenceDir}`);
  console.log(`  Output Directory: ${config.outputDir}`);
  console.log(`  Extensions: ${config.extensions.join(', ')}`);
  console.log('');
}

try {
  const restructure = new FileRestructure(config);
  const success = restructure.restructure();
  
  if (success) {
    process.exit(0);
  } else {
    process.exit(1);
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
} 