const FileRestructure = require('../lib/index');

// 示例1: 基本用法
console.log('=== 示例1: 基本用法 ===');
const restructure1 = new FileRestructure({
  sourceDir: './test/source',
  referenceDir: './test/reference',
  outputDir: './test/output3',
  extensions: ['.ts', '.js', '.meta'],
  language: 'zh'
});

restructure1.restructure();

// 示例2: 英文输出
console.log('\n=== 示例2: 英文输出 ===');
const restructure2 = new FileRestructure({
  sourceDir: './test/source',
  referenceDir: './test/reference',
  outputDir: './test/output4',
  extensions: ['.ts', '.js', '.meta'],
  language: 'en'
});

restructure2.restructure();

// 示例3: 自定义扩展名
console.log('\n=== 示例3: 自定义扩展名 ===');
const restructure3 = new FileRestructure({
  sourceDir: './test/source',
  referenceDir: './test/reference',
  outputDir: './test/output5',
  extensions: ['.ts', '.js', '.meta', '.txt'],
  assetsDirName: 'my-assets',
  language: 'zh'
});

restructure3.restructure(); 