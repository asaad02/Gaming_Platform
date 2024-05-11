#!/bin/sh
source ./scripts/ssh-setup.sh
source ./scripts/remote-db.sh

# create a directory to store the log file if it does not exist
if [ ! -d /var/log/03w24 ];
  then
	mkdir /var/log/03w24
fi

# create an install log file if it does not exist
if [ ! -f /var/log/03w24/install.log ];
  then
	touch /var/log/03w24/install.log
fi

# write the date and time to the log file
echo "Date: $(date)" >> /var/log/03w24/install.log

# install git
# Usage: ./install.sh git
if [ $1 == "git" ];
  then
	sudo apt-get update
	sudo apt-get install git
	echo "Git has been installed" >> /var/log/03w24/install.log
	exit 0
fi

# install nodejs
# Usage: ./install.sh nodejs
if [ $1 == "nodejs" ];
  then
	npm install --save-dev jest
	npm install --save-dev jsdom
	npm install --save-dev text-encoding
	echo "Nodejs has been installed" >> /var/log/03w24/install.log
	exit 0
fi

# if need to make the db accessible from remote server run the following command
# usage: ./install.sh remote-db [user] [hostname] [password] [--run-remote]
if [ $1 == "remote-db" ];
  then
	if [ "$5" == "--run-remote" ];
		then
			# NOT IMPLEMENTED
			#addRemote >> /var/log/03w24/install.log

			# ssh into the remote server
			#ssh -i $SSH_PKEY socs@cis4250w24-03.socs.uoguelph.ca 'bash -s' < ./scripts/install.sh remote-db $2 $3 $4
	else 
		# enable remote access to the database
		# Usage: ./install.sh remote-db <user> <hostname> <password>
		echo "Attempting to enable install" >> /var/log/03w24/install.log
		setup $2 $3 $4
	fi
fi
