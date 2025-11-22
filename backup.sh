#!/bin/bash

# === CONFIGURATION ===
TEBI_BUCKET="suryanshverma"
TEBI_BASE_URL="s3.tebi.io"
TEBI_BACKUP_DIR="tebi-backup-$(date +%Y%m%d_%H%M%S)"
PG_DB="your_db_name"
PG_USER="your_db_user"
PG_HOST="localhost"
PG_PORT="5432"
PG_BACKUP_FILE="pg_backup_$(date +%Y%m%d_%H%M%S).sql"

# === BACKUP TEBI STORAGE ===
echo "Backing up Tebi.io bucket..."
mkdir -p "$TEBI_BACKUP_DIR"
s3cmd sync --recursive "s3://$TEBI_BUCKET/" "$TEBI_BACKUP_DIR/"

# === BACKUP POSTGRES DATABASE ===
echo "Backing up PostgreSQL database..."
pg_dump -h "$PG_HOST" -U "$PG_USER" -p "$PG_PORT" "$PG_DB" > "$PG_BACKUP_FILE"

echo "Backup complete!"
echo "Storage backup: $TEBI_BACKUP_DIR"
echo "Postgres backup: $PG_BACKUP_FILE"
