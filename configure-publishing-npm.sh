#!/usr/bin/env bash

echo "CONFIGURING PUBLISHING NPM TOKEN"

touch .npmrc
echo "//registry.npmjs.org/:_authToken=${PUBLISHING_NPM_TOKEN}" > .npmrc


