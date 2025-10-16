#!/bin/bash

# Export condensed version for AI review
OUTPUT_FILE="${1:-condensed-export.md}"

echo "Creating condensed export optimized for AI consumption..."

cat > "$OUTPUT_FILE" << 'HEADER'
# Guestlist App - Condensed Export for AI Review

This is a condensed version of the repository focusing on architecture and key integration points.
Repetitive pages are summarized. Full details available in complete-repo-export.md if needed.

**Export Date:** $(date)

---

## Architecture Overview

**Tech Stack:**
- Frontend: Next.js 15.3.3 (App Router), React, TypeScript, Tailwind CSS
- Backend: Supabase (PostgreSQL + Auth)
- ORM: Prisma
- Deployment: Netlify/Vercel

**User Roles:**
- Manager (creates events, manages users)
- DJ (manages guest lists)
- Staff (door operations)
- Promoter (capacity management)
- Guest (receives invitations)

---

HEADER

add_file_full() {
    local file="$1"
    [ ! -f "$file" ] && return

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
        yml|yaml) lang="yaml" ;;
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

add_file_summary() {
    local file="$1"
    local description="$2"
    [ ! -f "$file" ] && return

    echo "" >> "$OUTPUT_FILE"
    echo "## File: \`$file\` (summarized)" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "*${description}*" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "\`\`\`typescript" >> "$OUTPUT_FILE"
    # Show imports and first 50 lines (usually interfaces, types, and key functions)
    head -50 "$file" >> "$OUTPUT_FILE" 2>/dev/null
    echo "" >> "$OUTPUT_FILE"
    echo "// ... (rest of implementation follows same pattern)" >> "$OUTPUT_FILE"
    echo "\`\`\`" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
}

# Core Configuration (FULL)
echo "# Core Configuration" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

add_file_full "package.json"
add_file_full "tsconfig.json"
add_file_full "next.config.js"
add_file_full ".env.example"

# Database Schema & Core Migrations (FULL)
echo "# Database Architecture" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

add_file_full "prisma/schema.prisma"

echo "" >> "$OUTPUT_FILE"
echo "## Database Migrations (Latest)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "*Showing most recent comprehensive schema migration:*" >> "$OUTPUT_FILE"
add_file_full "supabase/migrations/20250616005319_comprehensive_guestlist_schema_fixed.sql"

# Type Definitions (FULL)
echo "# Type Definitions" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

add_file_full "src/types/database.ts"
add_file_full "src/types/user.ts"
add_file_full "src/types/enums.ts"

# Backend Integration (FULL)
echo "# Backend Integration" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

add_file_full "src/lib/supabase/client.ts"
add_file_full "src/utils/supabase/client.ts"
add_file_full "src/lib/auth/auth.ts"
add_file_full "src/lib/auth/auth-options.ts"
add_file_full "src/middleware.ts"

# API Routes (FULL)
echo "# API Routes" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

find src/app/api -name "*.ts" -type f | while read -r file; do
    add_file_full "$file"
done

# Key Pages (SUMMARIZED)
echo "# Frontend Pages Architecture" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Manager Dashboard (FULL - this is the main one user is working on)
echo "## Manager Dashboard (Full Implementation)" >> "$OUTPUT_FILE"
add_file_full "src/app/manager/dashboard/page.tsx"
add_file_full "src/app/manager/events/create/page.tsx"

# Other key pages - summarized
add_file_summary "src/app/dj/dashboard/page.tsx" "DJ Dashboard - manages events, invites guests, views analytics"
add_file_summary "src/app/staff/dashboard/page.tsx" "Staff Dashboard - door operations, guest check-in"
add_file_summary "src/app/promoter/dashboard/page.tsx" "Promoter Dashboard - capacity management, guest tracking"
add_file_summary "src/app/guest/dashboard/page.tsx" "Guest Dashboard - view invitations, RSVP"

# Auth Pages (SUMMARIZED)
echo "## Authentication Pages" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "*Login pages for each role follow similar pattern. Example:*" >> "$OUTPUT_FILE"
add_file_summary "src/app/manager/login/page.tsx" "Manager login - authenticates and redirects to dashboard"

# Components (KEY ONES ONLY)
echo "# Shared Components" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

add_file_full "src/app/layout.tsx"
add_file_summary "src/components/ui/Toast.tsx" "Toast notification component"
add_file_summary "src/components/ui/ErrorBoundary.tsx" "Error boundary for error handling"

# Utilities
echo "# Utility Libraries" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

add_file_full "src/lib/auth/role-utils.ts"
add_file_full "src/lib/utils/safeStorage.ts"

# Documentation (KEY ONES)
echo "# Project Documentation" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

add_file_full "README.md"
add_file_full "CLAUDE.md"

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "## Directory Structure Summary" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "\`\`\`" >> "$OUTPUT_FILE"
echo "src/" >> "$OUTPUT_FILE"
echo "├── app/                    # Next.js app router pages" >> "$OUTPUT_FILE"
echo "│   ├── api/               # API routes" >> "$OUTPUT_FILE"
echo "│   ├── manager/           # Manager role pages" >> "$OUTPUT_FILE"
echo "│   ├── dj/                # DJ role pages" >> "$OUTPUT_FILE"
echo "│   ├── staff/             # Staff role pages" >> "$OUTPUT_FILE"
echo "│   ├── promoter/          # Promoter role pages" >> "$OUTPUT_FILE"
echo "│   ├── guest/             # Guest role pages" >> "$OUTPUT_FILE"
echo "│   └── auth/              # Authentication pages" >> "$OUTPUT_FILE"
echo "├── components/            # Shared React components" >> "$OUTPUT_FILE"
echo "├── lib/                   # Utility libraries" >> "$OUTPUT_FILE"
echo "│   ├── auth/             # Authentication utilities" >> "$OUTPUT_FILE"
echo "│   ├── supabase/         # Supabase client" >> "$OUTPUT_FILE"
echo "│   └── db/               # Database utilities" >> "$OUTPUT_FILE"
echo "├── types/                 # TypeScript type definitions" >> "$OUTPUT_FILE"
echo "└── middleware.ts          # Next.js middleware for auth/routing" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "supabase/" >> "$OUTPUT_FILE"
echo "└── migrations/            # Database migration files" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "prisma/" >> "$OUTPUT_FILE"
echo "└── schema.prisma          # Database schema definition" >> "$OUTPUT_FILE"
echo "\`\`\`" >> "$OUTPUT_FILE"

echo "" >> "$OUTPUT_FILE"
echo "## Key Integration Points" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "1. **Supabase Client** (\`src/lib/supabase/client.ts\`) - Initializes connection to Supabase backend" >> "$OUTPUT_FILE"
echo "2. **Authentication** (\`src/lib/auth/auth.ts\`) - Handles user authentication and sessions" >> "$OUTPUT_FILE"
echo "3. **Middleware** (\`src/middleware.ts\`) - Route protection and role-based access control" >> "$OUTPUT_FILE"
echo "4. **API Routes** (\`src/app/api/\`) - Server-side API endpoints for data operations" >> "$OUTPUT_FILE"
echo "5. **Database Schema** (\`prisma/schema.prisma\`) - Defines all tables and relationships" >> "$OUTPUT_FILE"
echo "6. **Type Definitions** (\`src/types/\`) - TypeScript interfaces matching database schema" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**End of Condensed Export**" >> "$OUTPUT_FILE"

echo ""
echo "✓ Condensed export complete: $OUTPUT_FILE"
echo "File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo "Line count: $(wc -l < "$OUTPUT_FILE")"
echo ""
echo "This version includes:"
echo "  - Full: Config, schema, types, auth, API routes, manager dashboard"
echo "  - Summarized: Other role dashboards, auth pages, components"
echo "  - Omitted: Test files, repetitive pages, build artifacts"
