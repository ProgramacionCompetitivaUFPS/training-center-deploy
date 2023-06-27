#-------------------------------------------------------------------------------#
# Backend for UFPS Training Center                                              #
# Based on Node v8 (LTS)                                                        #
#-------------------------------------------------------------------------------#

# Pull base image
FROM node:latest
#FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install docker CE
RUN apt-get update && \
    apt-get -y install apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      software-properties-common && \
      curl -fsSL https://get.docker.com -o /tmp/get-docker.sh && \
      sh /tmp/get-docker.sh


# Install app dependencies
COPY package*.json ./
#RUN npm install -g npm@latest
RUN npm install
#RUN npm install -g nodemon

#Define environment variables
ENV PORT 8081
ENV DEBUG *

# Bundle app source
COPY . .

#Expose container port
EXPOSE 8081

#Volumes
VOLUME /files 

#Initial command
CMD [ "npm", "start" ]
