#!/bin/bash

# Export backend integration files for AI review
OUTPUT_FILE="${1:-backend-integration-export.md}"

echo "Creating backend integration export..."

cat > "$OUTPUT_FILE" << 'HEADER'
# Guestlist App - Backend Integration Export

This document contains all files relevant to understanding how the frontend connects to the backend.

**Export Date:** $(date)

---

## Table of Contents

1. [Environment Configuration](#environment-configuration)
2. [Database Schema](#database-schema)
3. [Database Migrations](#database-migrations)
4. [API Routes](#api-routes)
5. [Supabase Client Setup](#supabase-client-setup)
6. [Authentication](#authentication)
7. [Type Definitions](#type-definitions)
8. [Middleware](#middleware)

---

HEADER

add_file() {
    local file="$1"
    if [ ! -f "$file" ]; then
        return
    fi

    local ext="${file##*.}"
    local lang=""
    case "$ext" in
        ts|tsx) lang="typescript" ;;
        js|jsx) lang="javascript" ;;
        json) lang="json" ;;
        sql) lang="sql" ;;
        prisma) lang="prisma" ;;
        env*) lang="bash" ;;
        md) lang="markdown" ;;
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

# Environment Configuration
echo "# Environment Configuration" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
add_file ".env.example"
add_file ".env.local"

# Database Schema
echo "# Database Schema" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
add_file "prisma/schema.prisma"

# Database Migrations
echo "# Database Migrations" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
find supabase/migrations -name "*.sql" -type f | sort | while read -r file; do
    echo "Adding migration: $file"
    add_file "$file"
done

# RLS Policies
echo "# RLS Policies & Security" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
for file in fix-rls-policies.sql safe-rls-fix.sql supabase/fix_guest_policies.sql; do
    [ -f "$file" ] && add_file "$file"
done

# API Routes
echo "# API Routes" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
find src/app/api -type f \( -name "*.ts" -o -name "*.js" \) -not -name "*.test.*" | sort | while read -r file; do
    echo "Adding API route: $file"
    add_file "$file"
done

# Supabase Client & Configuration
echo "# Supabase Client Setup" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
add_file "src/lib/supabase/client.ts"
add_file "src/utils/supabase/client.ts"
add_file "src/lib/db/prisma.ts"

# Authentication
echo "# Authentication Configuration" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
add_file "src/lib/auth/auth.ts"
add_file "src/lib/auth/auth-options.ts"
add_file "src/lib/auth/guest-auth.ts"
add_file "src/lib/auth/role-utils.ts"

# Type Definitions
echo "# Type Definitions" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
add_file "src/types/database.ts"
add_file "src/types/user.ts"
add_file "src/types/enums.ts"
add_file "src/types/next-auth.d.ts"

# Middleware
echo "# Middleware" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
add_file "src/middleware.ts"

# Configuration Files
echo "# Configuration Files" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
add_file "package.json"
add_file "tsconfig.json"
add_file "next.config.js"

# Documentation
echo "# Documentation" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
add_file "deploy-schema.md"
add_file "CLAUDE.md"
add_file "README.md"
add_file "Frontend-Design-Specs.md"

# Deployment Scripts
echo "# Deployment Scripts" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
for file in deploy-schema.js deploy-schema-chunked.js apply-migration.js test-supabase-access.js; do
    [ -f "$file" ] && add_file "$file"
done

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "**End of Backend Integration Export**" >> "$OUTPUT_FILE"

echo "✓ Export complete: $OUTPUT_FILE"
echo "File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
