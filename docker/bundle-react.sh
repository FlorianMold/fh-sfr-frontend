#!/bin/bash

FRONTEND_NAME=react-frontend
FRONTEND_VERSION=0.1.0
FRONTEND_CONTAINER_NAME=react-frontend

echo "--------------"
echo "Build fh/react-frontend."
echo "Make sure to call this script from the project root directory."
echo "--------------"
echo ""

WKDIR=`dirname "$0"`
echo "Working directory:" $WKDIR"/bundle-react.sh"

# Build the application
nx run frontend-react:build:production

# Build docker container
docker build -t $FRONTEND_NAME:$FRONTEND_VERSION -f docker/react.Dockerfile .

# Remove existing container
docker rm $FRONTEND_CONTAINER_NAME