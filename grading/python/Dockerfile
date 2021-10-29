#-------------------------------------------------------------------------------#
# Grading for python code                                                       #
# Based on pyhton 3.8                                                        #
#-------------------------------------------------------------------------------#


# Pull base image
FROM python:3.8

# Container Basic Info 
MAINTAINER GERSON LAZARO

# Update the repository sources list
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y clean
RUN apt-get install -f

# Install utils
RUN apt-get install -y sudo
RUN apt-get install -y bc
