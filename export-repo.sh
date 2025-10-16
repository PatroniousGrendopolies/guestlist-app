#!/bin/bash

# Export repository to markdown file
# Usage: ./export-repo.sh [output-file.md]

OUTPUT_FILE="${1:-repo-export.md}"

echo "Exporting repository to $OUTPUT_FILE..."

# Start the markdown file
cat > "$OUTPUT_FILE" << 'HEADER'
# Guestlist App - Complete Repository Export

This document contains the complete source code and structure of the Guestlist App repository.

**Export Date:** $(date)
**Repository:** guestlist-app

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Configuration Files](#configuration-files)
3. [Source Code](#source-code)
4. [Documentation](#documentation)

---

## Project Structure

```
HEADER

# Add directory tree (excluding node_modules, .git, .next, etc.)
echo '```' >> "$OUTPUT_FILE"
tree -I 'node_modules|.next|.git|dist|build|coverage|.turbo|.vercel' -L 4 >> "$OUTPUT_FILE" 2>/dev/null || find . -type f -not -path '*/node_modules/*' -not -path '*/.next/*' -not -path '*/.git/*' -not -path '*/dist/*' -not -path '*/build/*' | head -100 >> "$OUTPUT_FILE"
echo '```' >> "$OUTPUT_FILE"

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Function to add a file to the markdown
add_file() {
    local file="$1"
    local size=$(wc -c < "$file" 2>/dev/null || echo "0")

    # Skip very large files (over 500KB)
    if [ "$size" -gt 512000 ]; then
        echo "Skipping large file: $file ($(($size / 1024))KB)"
        return
    fi

    # Detect file extension for syntax highlighting
    local ext="${file##*.}"
    local lang=""
    case "$ext" in
        ts|tsx) lang="typescript" ;;
        js|jsx) lang="javascript" ;;
        json) lang="json" ;;
        md) lang="markdown" ;;
        css) lang="css" ;;
        yml|yaml) lang="yaml" ;;
        sh) lang="bash" ;;
        sql) lang="sql" ;;
        env) lang="bash" ;;
        *) lang="" ;;
    esac

    echo "" >> "$OUTPUT_FILE"
    echo "## File: \`$file\`" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "\`\`\`$lang" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE" 2>/dev/null
    echo "" >> "$OUTPUT_FILE"
    echo "\`\`\`" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
}

# Add configuration files
echo "## Configuration Files" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

for file in package.json tsconfig.json next.config.js tailwind.config.ts .env.example README.md CLAUDE.md; do
    if [ -f "$file" ]; then
        add_file "$file"
    fi
done

# Add source code files
echo "## Source Code" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Find and add all source files (excluding test files for now to save space)
find src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/.next/*" \
    -not -path "*/dist/*" \
    -not -name "*.test.*" \
    -not -name "*.spec.*" | sort | while read -r file; do
    echo "Adding: $file"
    add_file "$file"
done

# Add important documentation files
echo "## Documentation" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

for file in Frontend-Design-Specs.md PROGRESS_UPDATE.md auth-implementation-roadmap.md; do
    if [ -f "$file" ]; then
        add_file "$file"
    fi
done

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**End of Repository Export**" >> "$OUTPUT_FILE"

echo "✓ Export complete: $OUTPUT_FILE"
echo "File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
