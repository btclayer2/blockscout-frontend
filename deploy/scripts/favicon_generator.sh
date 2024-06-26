#!/bin/bash

#master_url="${FAVICON_MASTER_URL:-$NEXT_PUBLIC_NETWORK_ICON}"
master_url=$NEXT_PUBLIC_NETWORK_ICON
echo 'master_url: ' $master_url
export MASTER_URL="$master_url"

dotenv \
  -v MASTER_URL=$master_url \
  -e .env.secrets \
  -- bash -c 'cd ./deploy/tools/favicon-generator && ./script.sh'
#if [ $? -ne 0 ]; then
#    cd ../../../
#    exit 1
#else
#    cd ../../../
favicon_folder="./public/favicon/"

echo "⏳ Replacing default favicons with freshly generated pack..."
if [ -d "$favicon_folder" ]; then
    rm -r "$favicon_folder"
fi
mkdir -p "$favicon_folder"
cp -r ./deploy/tools/favicon-generator/output/* "$favicon_folder"
#fi
