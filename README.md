# File Restructure

[English] | [中文](README.zh-CN.md)

A powerful command-line tool to restructure files based on a reference directory structure

### Use Cases

Often when using file comparison tools to compare file content differences, the file directory structures are different, making it impossible to compare. Use this tool to restructure the file storage directories, then use file comparison tools like Beyond Compare for comparison.

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
# Basic file restructuring (process all files)
restructure ./src ./reference ./output

# With custom file extensions
restructure ./src ./reference ./output -e ".ts,.meta,.json"

# With verbose output
restructure ./src ./reference ./output -v
```

### Command Line Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--extensions` | `-e` | File extensions to match (comma-separated). Leave empty to process all files | `` |
| `--verbose` | `-v` | Verbose output | `false` |
| `--help` | `-h` | Show help | - |
| `--version` | - | Show version | - |

### How It Works

1. **Scan Reference Directory**: The tool scans the reference directory for files with specified extensions
2. **Match Files**: For each reference file, it finds matching files in the source directory
3. **Create Structure**: Creates the same directory structure as the reference directory
4. **Copy Files**: Copies matched files to their corresponding locations
5. **Handle Remaining**: Places remaining files in the output root directory



### API Usage

You can also use the library programmatically:

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

### Configuration Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `sourceDir` | string | Source directory path | - |
| `referenceDir` | string | Reference directory path | - |
| `outputDir` | string | Output directory path | - |
| `extensions` | array | File extensions array. Empty array processes all files | `[]` |

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

#### File Comparison Preparation
```bash
# Restructure files for comparison
restructure ./project1 ./project2 ./restructured-project1 -e ".ts,.js,.json"
```

#### Code Review
```bash
# Restructure code files for review
restructure ./old-version ./new-version ./review-ready -e ".ts,.js,.css,.html"
```

#### Documentation Comparison
```bash
# Restructure documentation files
restructure ./docs-v1 ./docs-v2 ./docs-comparison -e ".md,.txt,.pdf"
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
- Support for custom file extensions
- Direct file restructuring based on reference directory structure

## License

MIT License 