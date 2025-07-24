const fs = require('fs');
const path = require('path');

/**
 * 文件结构调整工具
 * 根据参考目录的文件结构重新组织源目录的文件
 */
class FileRestructure {
  constructor(config = {}) {
    this.config = {
      sourceDir: config.sourceDir || '',
      referenceDir: config.referenceDir || '',
      outputDir: config.outputDir || '',
      extensions: config.extensions || []
    };
    
    this.messages = {
      startRestructuring: 'Starting file restructuring...',
      sourceDirNotExist: 'Error: Source directory does not exist:',
      referenceDirNotExist: 'Error: Reference directory does not exist:',
      gettingReferenceFiles: 'Getting reference files...',
      foundReferenceFiles: 'Found reference files:',
      gettingSourceFiles: 'Getting source files...',
      foundSourceFiles: 'Found source files:',
      processingRemainingFiles: 'Processing remaining files...',
      restructuringComplete: 'File restructuring complete! Copied files to:',
      copiedFiles: 'Total files copied:',
      generatedStructure: 'Generated directory structure:',
      copyingFile: 'Copying file:',
      to: 'to'
    };
  }

  /**
   * 获取目录下所有文件的相对路径
   * @param {string} dirPath 目录路径
   * @param {string} basePath 基础路径（用于计算相对路径）
   * @returns {Array} 文件路径数组
   */
  getAllFiles(dirPath, basePath = dirPath) {
    const files = [];

    function traverse(currentPath) {
      const items = fs.readdirSync(currentPath);

      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          traverse(fullPath);
        } else {
          const relativePath = path.relative(basePath, fullPath);
          files.push(relativePath);
        }
      }
    }

    traverse(dirPath);
    return files;
  }

  /**
   * 获取参考目录中的文件
   * @param {string} referenceDir 参考目录
   * @returns {Array} 文件路径数组
   */
  getReferenceFiles(referenceDir) {
    const files = [];
    const self = this;

    function traverse(currentPath) {
      const items = fs.readdirSync(currentPath);

      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          traverse(fullPath);
        } else {
          const ext = path.extname(item);
          // 如果extensions为空或未指定，则包含所有文件
          // 如果指定了extensions，则只包含指定扩展名的文件
          if (self.config.extensions.length === 0 || self.config.extensions.includes(ext)) {
            const relativePath = path.relative(referenceDir, fullPath);
            files.push(relativePath);
          }
        }
      }
    }

    traverse(referenceDir);
    return files;
  }

  /**
   * 创建目录（如果不存在）
   * @param {string} dirPath 目录路径
   */
  ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * 复制文件
   * @param {string} sourcePath 源文件路径
   * @param {string} targetPath 目标文件路径
   */
  copyFile(sourcePath, targetPath) {
    this.ensureDir(path.dirname(targetPath));
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`${this.messages.copyingFile} ${sourcePath} ${this.messages.to} ${targetPath}`);
  }

  /**
   * 显示目录结构
   * @param {string} dirPath 目录路径
   * @param {number} maxDepth 最大深度
   */
  showDirectoryStructure(dirPath, maxDepth = 3) {
    function traverse(currentPath, depth = 0, prefix = '') {
      if (depth > maxDepth) return;

      const items = fs.readdirSync(currentPath).sort();

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);
        const isLast = i === items.length - 1;
        const currentPrefix = prefix + (isLast ? '└── ' : '├── ');

        console.log(currentPrefix + item);

        if (stat.isDirectory() && depth < maxDepth) {
          const nextPrefix = prefix + (isLast ? '    ' : '│   ');
          traverse(fullPath, depth + 1, nextPrefix);
        }
      }
    }

    traverse(dirPath);
  }

  /**
   * 执行文件结构调整
   */
  restructure() {
    console.log(this.messages.startRestructuring);

    // 检查目录是否存在
    if (!fs.existsSync(this.config.sourceDir)) {
      console.error(`${this.messages.sourceDirNotExist} ${this.config.sourceDir}`);
      return false;
    }

    if (!fs.existsSync(this.config.referenceDir)) {
      console.error(`${this.messages.referenceDirNotExist} ${this.config.referenceDir}`);
      return false;
    }

    // 获取参考目录中的文件
    console.log(this.messages.gettingReferenceFiles);
    const referenceFiles = this.getReferenceFiles(this.config.referenceDir);
    console.log(`${this.messages.foundReferenceFiles} ${referenceFiles.length}`);

    // 获取源目录中的所有文件
    console.log(this.messages.gettingSourceFiles);
    const sourceFiles = this.getAllFiles(this.config.sourceDir);
    console.log(`${this.messages.foundSourceFiles} ${sourceFiles.length}`);

    // 创建输出目录
    this.ensureDir(this.config.outputDir);

    // 为每个参考文件找到对应的源文件并复制
    let copiedCount = 0;
    const copiedFiles = new Set(); // 记录已复制的文件
    const fileMapping = new Map(); // 记录文件名到目标目录的映射

    // 第一步：处理参考目录中的文件，建立映射关系
    for (const refFile of referenceFiles) {
      const refFileName = path.basename(refFile, path.extname(refFile));
      const refDir = path.dirname(refFile);

      // 在源目录中查找对应的文件
      const matchingFiles = sourceFiles.filter(file => {
        const fileName = path.basename(file);
        const refFileNameWithExt = path.basename(refFile);
        
        // 严格按照完整文件名（包括扩展名）匹配
        return fileName === refFileNameWithExt;
      });

      if (matchingFiles.length > 0) {
        // 创建目标目录结构
        const targetDir = path.join(this.config.outputDir, refDir);
        this.ensureDir(targetDir);

        // 复制匹配的文件
        for (const sourceFile of matchingFiles) {
          const sourcePath = path.join(this.config.sourceDir, sourceFile);
          const targetPath = path.join(targetDir, path.basename(sourceFile));

          this.copyFile(sourcePath, targetPath);
          copiedFiles.add(sourceFile);
          copiedCount++;

          // 记录文件名到目标目录的映射，用于后续处理meta文件
          const baseName = path.basename(sourceFile, path.extname(sourceFile));
          fileMapping.set(baseName, targetDir);
        }
      }
    }

    // 第二步：处理剩余的文件
    console.log(this.messages.processingRemainingFiles);
    for (const sourceFile of sourceFiles) {
      if (!copiedFiles.has(sourceFile)) {
        const sourcePath = path.join(this.config.sourceDir, sourceFile);
        const fileName = path.basename(sourceFile);
        const baseName = path.basename(sourceFile, path.extname(sourceFile));
        const ext = path.extname(sourceFile);

        // 检查是否有对应的主文件已经被复制
        if (fileMapping.has(baseName)) {
          // 文件应该和对应的主文件放在同一个目录
          const targetDir = fileMapping.get(baseName);
          const targetPath = path.join(targetDir, fileName);
          this.copyFile(sourcePath, targetPath);
          copiedCount++;
        } else {
          // 其他文件放在输出目录根目录下
          const targetPath = path.join(this.config.outputDir, fileName);
          this.copyFile(sourcePath, targetPath);
          copiedCount++;
        }
      }
    }

    console.log(`${this.messages.restructuringComplete} ${this.config.outputDir}`);
    console.log(`${this.messages.copiedFiles} ${copiedCount}`);

    // 显示生成的目录结构
    console.log(`\n${this.messages.generatedStructure}`);
    this.showDirectoryStructure(this.config.outputDir);

    return true;
  }
}

module.exports = FileRestructure; 