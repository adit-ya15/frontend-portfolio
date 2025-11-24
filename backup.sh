#!/bin/bash

# === CONFIGURATION ===
TEBI_BUCKET="suryanshverma"
TEBI_BASE_URL="s3.tebi.io"
TEBI_BACKUP_DIR="tebi-backup-$(date +%Y%m%d_%H%M%S)"
PG_URL="postgresql://user:password@host:5432/database?sslmode=require"
PG_BACKUP_FILE="pg_backup_$(date +%Y%m%d_%H%M%S).sql"

# === BACKUP TEBI STORAGE ===
echo "Backing up Tebi.io bucket..."
mkdir -p "$TEBI_BACKUP_DIR"
s3cmd sync --recursive "s3://$TEBI_BUCKET/" "$TEBI_BACKUP_DIR/"


# === BACKUP POSTGRES DATABASE ===
echo "Backing up PostgreSQL database..."
pg_dump "$PG_URL" > "$PG_BACKUP_FILE"

echo "Backup complete!"
echo "Storage backup: $TEBI_BACKUP_DIR"
echo "Postgres backup: $PG_BACKUP_FILE"
