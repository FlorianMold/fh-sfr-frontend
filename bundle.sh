#!/bin/bash

DIST_FOLDER=build

ANGULAR_FRONTEND_NAME=angular-frontend
ANGULAR_FRONTEND_VERSION=0.1.0
ANGULAR_FRONTEND_CONTAINER_NAME=angular-frontend

REACT_FRONTEND_NAME=react-frontend
REACT_FRONTEND_VERSION=0.1.0
REACT_FRONTEND_CONTAINER_NAME=react-frontend

# Change working directory to script directory
BASEDIR=$(dirname "$0")
cd $BASEDIR

# Cleanup & create directory structure
rm -rf $DIST_FOLDER
mkdir $DIST_FOLDER

# Build containers
./docker/bundle-react.sh
./docker/bundle-angular.sh

echo "Saving docker-images to" $DIST_FOLDER
docker save $ANGULAR_FRONTEND_NAME:$ANGULAR_FRONTEND_VERSION > $DIST_FOLDER/$ANGULAR_FRONTEND_NAME.tar
docker save $REACT_FRONTEND_NAME:$REACT_FRONTEND_VERSION > $DIST_FOLDER/$REACT_FRONTEND_NAME.tar

# Copy helpers
echo "Copy run.sh to" $DIST_FOLDER
cp docker/run.sh $DIST_FOLDER/run.sh
echo "Copy HELP.md to" $DIST_FOLDER
cp docker/HELP.md $DIST_FOLDER/README.md
echo "Copy docker-compose.yml to" $DIST_FOLDER
cp docker/docker-compose.yml $DIST_FOLDER/docker-compose.yml
echo "Copy .env to" $DIST_FOLDER
cp .env $DIST_FOLDER/.env
