# File Restructure

[English](#english) | [中文](#chinese)

## English

A powerful command-line tool to restructure files based on a reference directory structure. This tool is particularly useful for organizing assets, TypeScript files, and other project files according to a predefined structure.

### Features

- 🚀 **Fast and Efficient**: Quickly reorganize large numbers of files
- 🔧 **Flexible Configuration**: Support for custom file extensions and directory names
- 🌍 **Internationalization**: Support for English and Chinese output messages
- 📁 **Smart File Matching**: Automatically matches files based on name and extension
- 🎯 **Preserves Structure**: Maintains the reference directory structure in the output

### Installation

```bash
npm install -g file-restructure
```

### Usage

#### Basic Usage

```bash
restructure <sourcePath> <referenceDir> <outputDir>
```

#### Examples

```bash
# Basic file restructuring
restructure ./src ./reference ./output

# With custom file extensions
restructure ./src ./reference ./output -e ".ts,.meta,.json"

# With Chinese language output
restructure ./src ./reference ./output -l zh

# Verbose output with custom assets directory
restructure ./src ./reference ./output -v -a "my-assets"
```

### Command Line Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--extensions` | `-e` | File extensions to match (comma-separated) | `.ts` |
| `--assets-dir` | `-a` | Assets directory name | `assets` |
| `--language` | `-l` | Language for output messages (en/zh) | `en` |
| `--verbose` | `-v` | Verbose output | `false` |
| `--help` | `-h` | Show help | - |
| `--version` | - | Show version | - |

### How It Works

1. **Scan Reference Directory**: The tool scans the reference directory for files with specified extensions
2. **Match Files**: For each reference file, it finds matching files in the source directory
3. **Create Structure**: Creates the same directory structure as the reference directory
4. **Copy Files**: Copies matched files to their corresponding locations
5. **Handle Remaining**: Places remaining files in the assets root directory

### Use Cases

- **Game Development**: Organize game assets according to a reference structure
- **Web Projects**: Restructure TypeScript files based on a template
- **Asset Management**: Reorganize media files and their metadata
- **Code Migration**: Restructure code files when migrating between projects

### API Usage

You can also use the library programmatically:

```javascript
const FileRestructure = require('file-restructure');

const restructure = new FileRestructure({
  sourceDir: './src',
  referenceDir: './reference',
  outputDir: './output',
  extensions: ['.ts', '.meta'],
  assetsDirName: 'assets',
  language: 'en'
});

restructure.restructure();
```

---

## Chinese

一个强大的命令行工具，用于根据参考目录结构重新组织文件。此工具特别适用于按照预定义结构组织资源、TypeScript文件和其他项目文件。

### 功能特点

- 🚀 **快速高效**: 快速重组大量文件
- 🔧 **灵活配置**: 支持自定义文件扩展名和目录名
- 🌍 **国际化**: 支持英文和中文输出消息
- 📁 **智能文件匹配**: 根据名称和扩展名自动匹配文件
- 🎯 **保持结构**: 在输出中保持参考目录结构

### 安装

```bash
npm install -g file-restructure
```

### 使用方法

#### 基本用法

```bash
restructure <源路径> <参考目录> <输出目录>
```

#### 示例

```bash
# 基本文件重组
restructure ./src ./reference ./output

# 使用自定义文件扩展名
restructure ./src ./reference ./output -e ".ts,.meta,.json"

# 使用中文输出
restructure ./src ./reference ./output -l zh

# 详细输出，自定义资源目录
restructure ./src ./reference ./output -v -a "my-assets"
```

### 命令行选项

| 选项 | 简写 | 描述 | 默认值 |
|------|------|------|--------|
| `--extensions` | `-e` | 要匹配的文件扩展名（逗号分隔） | `.ts` |
| `--assets-dir` | `-a` | 资源目录名称 | `assets` |
| `--language` | `-l` | 输出消息语言 (en/zh) | `en` |
| `--verbose` | `-v` | 详细输出 | `false` |
| `--help` | `-h` | 显示帮助 | - |
| `--version` | - | 显示版本 | - |

### 工作原理

1. **扫描参考目录**: 工具扫描参考目录中指定扩展名的文件
2. **匹配文件**: 对于每个参考文件，在源目录中找到匹配的文件
3. **创建结构**: 创建与参考目录相同的目录结构
4. **复制文件**: 将匹配的文件复制到相应位置
5. **处理剩余**: 将剩余文件放置在资源根目录中

### 使用场景

- **游戏开发**: 根据参考结构组织游戏资源
- **Web项目**: 基于模板重组TypeScript文件
- **资源管理**: 重新组织媒体文件及其元数据
- **代码迁移**: 在项目间迁移时重组代码文件

### API使用

您也可以以编程方式使用该库：

```javascript
const FileRestructure = require('file-restructure');

const restructure = new FileRestructure({
  sourceDir: './src',
  referenceDir: './reference',
  outputDir: './output',
  extensions: ['.ts', '.meta'],
  assetsDirName: 'assets',
  language: 'zh'
});

restructure.restructure();
```

## License

MIT License 