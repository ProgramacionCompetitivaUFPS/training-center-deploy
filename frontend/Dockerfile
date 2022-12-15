#-------------------------------------------------------------------------------#
# Frontend for UFPS Training Center                                             #
# Based on Alpine linux                                                         #
#-------------------------------------------------------------------------------#

# Pull base image
FROM nginx:alpine

# Container Basic Info 
MAINTAINER GERSON LAZARO
MAINTAINER MELISSA DELGADO

# Copy files to container
# COPY . /usr/share/nginx/html

# setting up nginx

# agregando config de nginx
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d


# Copy files to container
COPY /dist /usr/share/nginx/html

RUN rm /usr/share/nginx/html/nginx.conf
RUN rm /usr/share/nginx/html/default.conf