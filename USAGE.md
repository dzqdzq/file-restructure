# File Restructure - 使用说明

## 快速开始

### 安装

```bash
npm install -g file-restructure
```

### 基本用法

```bash
restructure <源目录> <参考目录> <输出目录>
```

### 示例

```bash
# 基本文件重组
restructure ./src ./reference ./output

# 使用自定义文件扩展名
restructure ./src ./reference ./output -e ".ts,.meta,.json"

# 使用中文输出
restructure ./src ./reference ./output -l zh

# 详细输出模式
restructure ./src ./reference ./output -v

# 自定义资源目录名
restructure ./src ./reference ./output -a "my-assets"
```

## 命令行选项详解

| 选项 | 简写 | 描述 | 默认值 | 示例 |
|------|------|------|--------|------|
| `--extensions` | `-e` | 要匹配的文件扩展名（逗号分隔） | `.ts` | `-e ".ts,.js,.meta"` |
| `--assets-dir` | `-a` | 资源目录名称 | `assets` | `-a "my-assets"` |
| `--language` | `-l` | 输出消息语言 (en/zh) | `en` | `-l zh` |
| `--verbose` | `-v` | 详细输出模式 | `false` | `-v` |
| `--help` | `-h` | 显示帮助信息 | - | `-h` |
| `--version` | - | 显示版本号 | - | `--version` |

## 工作原理

1. **扫描参考目录**: 工具扫描参考目录中指定扩展名的文件
2. **匹配文件**: 对于每个参考文件，在源目录中找到匹配的文件（基于文件名，忽略扩展名）
3. **创建结构**: 创建与参考目录相同的目录结构
4. **复制文件**: 将匹配的文件复制到相应位置
5. **处理剩余**: 将剩余文件放置在资源根目录中

## 使用场景

### 游戏开发
```bash
# 重组游戏资源文件
restructure ./game-assets ./template-assets ./organized-assets -e ".png,.jpg,.meta"
```

### Web项目
```bash
# 重组TypeScript文件
restructure ./src ./template ./output -e ".ts,.js,.json" -l zh
```

### 资源管理
```bash
# 重组媒体文件
restructure ./media ./structure ./organized -e ".mp4,.jpg,.png,.meta"
```

## API使用

### 基本用法

```javascript
const FileRestructure = require('file-restructure');

const restructure = new FileRestructure({
  sourceDir: './src',
  referenceDir: './reference',
  outputDir: './output',
  extensions: ['.ts', '.js', '.meta'],
  assetsDirName: 'assets',
  language: 'zh'
});

restructure.restructure();
```

### 配置选项

| 选项 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `sourceDir` | string | 源目录路径 | - |
| `referenceDir` | string | 参考目录路径 | - |
| `outputDir` | string | 输出目录路径 | - |
| `extensions` | array | 文件扩展名数组 | `['.ts']` |
| `assetsDirName` | string | 资源目录名称 | `'assets'` |
| `language` | string | 语言 (en/zh) | `'en'` |

## 注意事项

1. **文件匹配**: 工具基于文件名（不含扩展名）进行匹配
2. **目录结构**: 输出目录会保持与参考目录相同的结构
3. **文件覆盖**: 如果目标文件已存在，会被覆盖
4. **权限**: 确保有足够的权限读取源目录和写入输出目录

## 故障排除

### 常见错误

1. **源目录不存在**
   ```
   Error: Source directory does not exist: ./src
   ```
   解决：检查源目录路径是否正确

2. **参考目录不存在**
   ```
   Error: Reference directory does not exist: ./reference
   ```
   解决：检查参考目录路径是否正确

3. **权限不足**
   ```
   Error: EACCES: permission denied
   ```
   解决：检查目录权限或使用sudo

### 调试技巧

使用 `-v` 参数查看详细输出：
```bash
restructure ./src ./reference ./output -v
```

## 更新日志

### v1.0.0
- 初始版本发布
- 支持命令行和API使用
- 支持中英文输出
- 支持自定义文件扩展名
- 支持自定义资源目录名 