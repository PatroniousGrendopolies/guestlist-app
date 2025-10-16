#!/bin/bash

# Export EVERYTHING from the repository
OUTPUT_FILE="${1:-complete-repo-export.md}"

echo "Creating comprehensive export with EVERYTHING..."

cat > "$OUTPUT_FILE" << 'HEADER'
# Guestlist App - Complete Repository Export

This document contains the COMPLETE codebase including source files, tests, configuration, documentation, scripts, and database files.

**Export Date:** $(date)

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Package Configuration](#package-configuration)
3. [Environment & Configuration](#environment--configuration)
4. [Database Schema & Migrations](#database-schema--migrations)
5. [Source Code](#source-code)
6. [Tests](#tests)
7. [Scripts](#scripts)
8. [Documentation](#documentation)
9. [GitHub Workflows](#github-workflows)

---

## Project Structure

```
HEADER

# Add directory tree
echo '```' >> "$OUTPUT_FILE"
tree -I 'node_modules|.next|.git|dist|coverage|.turbo|.vercel|.netlify' -L 5 >> "$OUTPUT_FILE" 2>/dev/null || {
    echo "Directory structure:" >> "$OUTPUT_FILE"
    find . -type d -not -path '*/node_modules/*' -not -path '*/.next/*' -not -path '*/.git/*' -not -path '*/coverage/*' | sort >> "$OUTPUT_FILE"
}
echo '```' >> "$OUTPUT_FILE"

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

add_file() {
    local file="$1"
    if [ ! -f "$file" ]; then
        return
    fi

    local size=$(wc -c < "$file" 2>/dev/null || echo "0")

    # Skip binary files and very large files (over 1MB)
    if [ "$size" -gt 1048576 ]; then
        echo "## File: \`$file\` (skipped - too large: $(($size / 1024))KB)" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        return
    fi

    local ext="${file##*.}"
    local lang=""
    case "$ext" in
        ts|tsx) lang="typescript" ;;
        js|jsx|mjs|cjs) lang="javascript" ;;
        json) lang="json" ;;
        sql) lang="sql" ;;
        prisma) lang="prisma" ;;
        md) lang="markdown" ;;
        css) lang="css" ;;
        yml|yaml) lang="yaml" ;;
        sh) lang="bash" ;;
        env*|gitignore|prettierrc|eslintrc) lang="bash" ;;
        html) lang="html" ;;
        xml) lang="xml" ;;
        toml) lang="toml" ;;
        *) lang="text" ;;
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

# Package Configuration
echo "# Package Configuration" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
add_file "package.json"
add_file "package-lock.json"

# Environment & Configuration
echo "# Environment & Configuration" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
for file in .env.example .env.local .eslintrc.json .prettierrc tsconfig.json next.config.js tailwind.config.ts postcss.config.js .gitignore; do
    [ -f "$file" ] && add_file "$file"
done

# Database Schema & Migrations
echo "# Database Schema & Migrations" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Prisma schema
[ -f "prisma/schema.prisma" ] && add_file "prisma/schema.prisma"

# All SQL files (migrations, scripts, etc.)
find . -name "*.sql" -type f -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/coverage/*" | sort | while read -r file; do
    echo "Adding SQL file: $file"
    add_file "$file"
done

# Source Code (all TypeScript/JavaScript files)
echo "# Source Code" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

find src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/.next/*" \
    -not -name "*.test.*" \
    -not -name "*.spec.*" | sort | while read -r file; do
    echo "Adding source file: $file"
    add_file "$file"
done

# Tests
echo "# Tests" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

find . -type f \( -name "*.test.ts" -o -name "*.test.tsx" -o -name "*.spec.ts" -o -name "*.spec.tsx" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/.next/*" \
    -not -path "*/coverage/*" | sort | while read -r file; do
    echo "Adding test file: $file"
    add_file "$file"
done

# Scripts (all JavaScript files in root and scripts directory)
echo "# Scripts" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Root level scripts
find . -maxdepth 1 -name "*.js" -o -name "*.mjs" -o -name "*.sh" | sort | while read -r file; do
    echo "Adding script: $file"
    add_file "$file"
done

# Scripts directory
find scripts -type f 2>/dev/null | sort | while read -r file; do
    echo "Adding script: $file"
    add_file "$file"
done

# Documentation
echo "# Documentation" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# All markdown files
find . -maxdepth 1 -name "*.md" -type f | sort | while read -r file; do
    echo "Adding documentation: $file"
    add_file "$file"
done

# Tasks directory
find tasks -name "*.md" -type f 2>/dev/null | sort | while read -r file; do
    echo "Adding task: $file"
    add_file "$file"
done

# GitHub Workflows
echo "# GitHub Workflows" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

find .github -type f 2>/dev/null | sort | while read -r file; do
    echo "Adding workflow: $file"
    add_file "$file"
done

# Additional Configuration Files
echo "# Additional Configuration" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

for file in jest.config.js jest.setup.js vitest.config.ts netlify.toml vercel.json; do
    [ -f "$file" ] && add_file "$file"
done

# Supabase Configuration
if [ -d "supabase" ]; then
    echo "# Supabase Configuration" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    find supabase -type f -not -name "*.sql" 2>/dev/null | sort | while read -r file; do
        echo "Adding supabase config: $file"
        add_file "$file"
    done
fi

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "## Summary" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "This export contains the complete repository including:" >> "$OUTPUT_FILE"
echo "- All source code files" >> "$OUTPUT_FILE"
echo "- All test files" >> "$OUTPUT_FILE"
echo "- All configuration files" >> "$OUTPUT_FILE"
echo "- All database schemas and migrations" >> "$OUTPUT_FILE"
echo "- All documentation" >> "$OUTPUT_FILE"
echo "- All scripts and workflows" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**End of Complete Repository Export**" >> "$OUTPUT_FILE"

echo ""
echo "✓ Complete export finished: $OUTPUT_FILE"
echo "File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo "Line count: $(wc -l < "$OUTPUT_FILE")"
