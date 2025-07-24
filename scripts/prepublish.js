#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 检查发布前准备...');

// 检查必要文件是否存在
const requiredFiles = [
  'package.json',
  'lib/index.js',
  'bin/restructure.js',
  'README.md',
  'LICENSE'
];

console.log('📁 检查必要文件...');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.error(`❌ ${file} 不存在`);
    process.exit(1);
  }
}

// 检查package.json中的必要字段
console.log('\n📦 检查package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const requiredFields = ['name', 'version', 'description', 'main', 'bin'];
for (const field of requiredFields) {
  if (packageJson[field]) {
    console.log(`✅ ${field}: ${packageJson[field]}`);
  } else {
    console.error(`❌ package.json 缺少 ${field} 字段`);
    process.exit(1);
  }
}

// 检查bin文件是否有执行权限
console.log('\n🔧 检查bin文件权限...');
const binPath = path.join(__dirname, '..', 'bin', 'restructure.js');
try {
  fs.accessSync(binPath, fs.constants.X_OK);
  console.log('✅ bin/restructure.js 有执行权限');
} catch (error) {
  console.log('⚠️  bin/restructure.js 没有执行权限，正在设置...');
  fs.chmodSync(binPath, '755');
  console.log('✅ 已设置执行权限');
}

console.log('\n🎉 发布前检查完成！');
console.log('\n📋 发布步骤:');
console.log('1. npm version patch|minor|major');
console.log('2. npm publish');
console.log('3. npm unlink (如果之前使用了npm link)'); 