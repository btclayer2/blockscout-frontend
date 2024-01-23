#!/bin/bash

set -e

# 清理文件
echo 'remove files----'
rm -rf ./public/envs.js
rm -f ./entrypoint.sh
rm -f ./validate_envs.sh
rm -f ./make_envs_script.sh
rm -f ./download_assets.sh
rm -f ./favicon_generator.sh
rm -f ./feature-reporter.js
rm -f ./envs-validator.js
rm -r -f ./standalone
rm -r -f ./.next

#chmod +x ./deploy/scripts/collect_envs.sh
#cp ./deploy/scripts/collect_envs.sh .
#./collect_envs.sh ./docs/ENVS.md

# FEATURE REPORTER
echo 'build feature-reporter----'
cd ./deploy/tools/feature-reporter
yarn install
yarn compile_config
yarn build
cd -

#echo 'build envs-validator----'
#cd ./deploy/tools/envs-validator
#yarn install
#yarn build
#cd -

echo 'copy envs-validator and feature-reporter----'
#cp ./deploy/tools/envs-validator/index.js ./envs-validator.js
cp ./deploy/tools/feature-reporter/index.js ./feature-reporter.js


# Ensure the script is executable
echo 'chmod and copy----'
chmod +x ./deploy/scripts/entrypoint.sh
chmod +x ./deploy/scripts/validate_envs.sh
chmod +x ./deploy/scripts/make_envs_script.sh
chmod +x ./deploy/scripts/download_assets.sh
chmod +x ./deploy/scripts/favicon_generator.sh

# Copy the scripts
cp ./deploy/scripts/entrypoint.sh .
cp ./deploy/scripts/validate_envs.sh .
cp ./deploy/scripts/make_envs_script.sh .
cp ./deploy/scripts/download_assets.sh .
cp ./deploy/scripts/favicon_generator.sh .

chmod -R 777 ./deploy/tools/favicon-generator
chmod -R 777 ./public

# Run the entrypoint script

echo 'start entrypoint------'
./entrypoint.sh

# 打包
echo 'start build app----'
yarn build:local
yarn svg:build-sprite

echo 'remove files----'
rm ./entrypoint.sh
rm ./validate_envs.sh
rm ./make_envs_script.sh
rm ./download_assets.sh
rm ./favicon_generator.sh
#rm ./envs-validator.js
rm ./feature-reporter.js

exit 0
