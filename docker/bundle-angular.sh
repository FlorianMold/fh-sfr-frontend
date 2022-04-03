#!/bin/bash

FRONTEND_NAME=angular-frontend
FRONTEND_VERSION=0.1.0
FRONTEND_CONTAINER_NAME=angular-frontend

echo "--------------"
echo "Build fh/angular-frontend."
echo "Make sure to call this script from the project root directory."
echo "--------------"
echo ""

WKDIR=`dirname "$0"`
echo "Working directory:" $WKDIR"/bundle-angular.sh"

# Build the application
nx run frontend-angular:build:production

# Build docker container
docker build -t $FRONTEND_NAME:$FRONTEND_VERSION -f docker/angular.Dockerfile .

# Remove existing container
docker rm $FRONTEND_CONTAINER_NAME