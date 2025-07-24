# 文件重新整理

[English](README.md) | 中文

一个强大的命令行工具，用于根据参考目录结构重新组织文件

## 使用场景

经常使用文件比较工具比较文件内容差异， 但是文件目录结构不一样导致无法比较。 
用此工具对文件存放目录进行重整， 然后再使用类似Benyond Compare文件比较工具进行比较

## 安装

```bash
npm install -g file-restructure
```

## 使用方法

### 基本用法

```bash
restructure <源路径> <参考目录> <输出目录>
```

### 示例

```bash
# 基本文件重组（处理所有文件）
restructure ./src ./reference ./output

# 使用自定义文件扩展名
restructure ./src ./reference ./output -e ".ts,.meta,.json"

# 详细输出
restructure ./src ./reference ./output -v
```

## 命令行选项

| 选项 | 简写 | 描述 | 默认值 |
|------|------|------|--------|
| `--extensions` | `-e` | 要匹配的文件扩展名（逗号分隔）。留空则处理所有文件 | `` |
| `--verbose` | `-v` | 详细输出 | `false` |
| `--help` | `-h` | 显示帮助 | - |
| `--version` | - | 显示版本 | - |

## 工作原理

1. **扫描参考目录**: 工具扫描参考目录中指定扩展名的文件
2. **匹配文件**: 对于每个参考文件，在源目录中找到匹配的文件
3. **创建结构**: 创建与参考目录相同的目录结构
4. **复制文件**: 将匹配的文件复制到相应位置
5. **处理剩余**: 将剩余文件放置在资源根目录中

## API使用

您也可以以编程方式使用该库：

```javascript
const FileRestructure = require('file-restructure');

const restructure = new FileRestructure({
  sourceDir: './src',
  referenceDir: './reference',
  outputDir: './output',
  extensions: ['.ts', '.meta']
});

restructure.restructure();
```

## 配置选项

| 选项 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `sourceDir` | string | 源目录路径 | - |
| `referenceDir` | string | 参考目录路径 | - |
| `outputDir` | string | 输出目录路径 | - |
| `extensions` | array | 文件扩展名数组。空数组处理所有文件 | `[]` |

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

## 示例

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

## 许可证

MIT License 