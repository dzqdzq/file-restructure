# File Restructure

[English] | [中文](README.zh-CN.md)

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

### Configuration Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `sourceDir` | string | Source directory path | - |
| `referenceDir` | string | Reference directory path | - |
| `outputDir` | string | Output directory path | - |
| `extensions` | array | File extensions array | `['.ts']` |
| `assetsDirName` | string | Assets directory name | `'assets'` |
| `language` | string | Language (en/zh) | `'en'` |

### Troubleshooting

#### Common Errors

1. **Source directory does not exist**
   ```
   Error: Source directory does not exist: ./src
   ```
   Solution: Check if the source directory path is correct

2. **Reference directory does not exist**
   ```
   Error: Reference directory does not exist: ./reference
   ```
   Solution: Check if the reference directory path is correct

3. **Permission denied**
   ```
   Error: EACCES: permission denied
   ```
   Solution: Check directory permissions or use sudo

#### Debug Tips

Use `-v` flag for verbose output:
```bash
restructure ./src ./reference ./output -v
```

### Examples

#### Game Development
```bash
# Restructure game asset files
restructure ./game-assets ./template-assets ./organized-assets -e ".png,.jpg,.meta"
```

#### Web Projects
```bash
# Restructure TypeScript files
restructure ./src ./template ./output -e ".ts,.js,.json" -l zh
```

#### Asset Management
```bash
# Restructure media files
restructure ./media ./structure ./organized -e ".mp4,.jpg,.png,.meta"
```

### Notes

1. **File Matching**: Tool matches files based on filename (without extension)
2. **Directory Structure**: Output maintains the same structure as reference directory
3. **File Overwrite**: Existing files in target directory will be overwritten
4. **Permissions**: Ensure you have read access to source directory and write access to output directory

### Changelog

#### v1.0.8
- Initial release
- Support for command line and API usage
- Support for English and Chinese output
- Support for custom file extensions
- Support for custom assets directory name

## License

MIT License 