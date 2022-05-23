#!/bin/bash

echo Updating Training Center......
echo Pulling from Training-Center master branch....
sleep 3s

git pull origin master

echo Building front with Aurelia......
sleep 3s

cd frontend
au build
cd ..

echo Listo, el container del front ha sido sincronzado con los cambios del proyecto.

#echo actualizando los scripts del container frontend...
#docker exec -d training-center-frontend 


#echo Building and starting docker containers in the background...

#sleep 1s

#docker-compose up --build -d
