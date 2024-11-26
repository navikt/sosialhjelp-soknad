#!/bin/bash

set -euo pipefail

START_HILIGHT="\x1b[1;31m"
END_HILIGHT="\x1b[0m"

if [ -z "${NAIS_WORKLOAD_IDENTITY_PROVIDER}" ]; then
  echo -e "${START_HILIGHT}Warning${END_HILIGHT}: NAIS_WORKLOAD_IDENTITY_PROVIDER is not provided as a secret, skipping CDN upload";
  exit 0
fi

TEAM="teamdigisos"
TENANT="nav"
SOURCE=".next/static"
DESTINATION="soknad"
HEADERS="Cache-Control: public, max-age=31536000, immutable"

# Function to compute slug hash prefix
slug_hash_prefix_truncate() {
    local tenantTeam="$1"
    local prefix="$2"
    local maxLength="$3"

    local hash
    hash=$(echo -n "${tenantTeam}" | sha256sum | cut -d ' ' -f 1 | cut -b 1-4)
    local hashLength=${#hash}
    local prefixLength=${#prefix}
    maxLength=$((maxLength - prefixLength - hashLength - 2))
    local truncatedTenantTeam
    truncatedTenantTeam=$(echo -n "${tenantTeam:0:$maxLength}")

    echo "$prefix-$truncatedTenantTeam-$hash"
}

# Compute Service Account Email and Bucket Name
PRINCIPAL=$(slug_hash_prefix_truncate "$TEAM" "cdn" 30)
BUCKET_NAME=$(slug_hash_prefix_truncate "${TENANT}-${TEAM}" "nais-cdn" 63)
SA_EMAIL="${PRINCIPAL}@${NAIS_MANAGEMENT_PROJECT_ID}.iam.gserviceaccount.com"

# Authenticate with Google Cloud
echo "Authenticating with Google Cloud..."
gcloud components install workload-identity-federation

gcloud auth workload-identity-federation login \
    --workload-provider="${NAIS_WORKLOAD_IDENTITY_PROVIDER}" \
    --service-account-email="${SA_EMAIL}"

# Upload files to GCS
UPLOAD_DEST="gs://${BUCKET_NAME}/${TEAM}/${DESTINATION}"
echo "Uploading files from ${SOURCE} to ${UPLOAD_DEST}..."
gsutil -m cp -r "${SOURCE}" "${UPLOAD_DEST}"

# Set metadata (cache headers)
echo "Setting cache headers: ${HEADERS}..."
gsutil setmeta -h "${HEADERS}" "${UPLOAD_DEST}"

echo "Upload complete."
