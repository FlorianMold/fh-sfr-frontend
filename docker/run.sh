#!/bin/bash

ANGULAR_FRONTEND_NAME=angular-frontend
ANGULAR_FRONTEND_VERSION=0.1.0
ANGULAR_FRONTEND_CONTAINER_NAME=angular-frontend

REACT_FRONTEND_NAME=react-frontend
REACT_FRONTEND_VERSION=0.1.0
REACT_FRONTEND_CONTAINER_NAME=react-frontend


# Change working directory to script directory
BASEDIR=$(dirname "$0")
cd $BASEDIR

# Load containers
echo "Loading docker-image from file-system"
docker load --input $ANGULAR_FRONTEND_CONTAINER_NAME.tar
docker load --input $REACT_FRONTEND_CONTAINER_NAME.tar

# Run containers
echo "Running reactive architecture"
docker-compose down
docker-compose up