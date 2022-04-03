# Running the fh-sfr-frontend

The configuration for the services is stored inside the .env file. 

## Run the fh-sfr-frontend react and angular

Run the shell-script to load the docker-images and spin them up.

```shell
./run.sh
````

This will load the docker-images and runs `docker-compose up` to start the apps.

As specified in `docker-compose.yml` angular runs on port 4200 and react runs on port 4201.