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

# uninstall git
# Usage: ./uninstall.sh git
if [ $1 == "git" ];
  then
	sudo apt-get remove git -y
	echo "Git has been uninstalled" >> /var/log/03w24/install.log
	exit 0
fi

# disable remote access to the database
# Usage: ./uninstall.sh remote-db [remove-user-flag] [user] [hostname] [--run-remote]
if [ $1 == "remote-db" ];
  then
	if [ "$5" == "--run-remote" ];
		then
		# NOT IMPLEMENTED
		#addRemote >> /var/log/03w24/install.log

		# ssh into the remote server
		#ssh -i $SSH_PRIVATE_KEY -t socs@cis4250w24-03.socs.uoguelph.ca 'bash -s' < ./scripts/uninstall.sh remote-db $2 $3 $4
	else 
		# disable remote access to the database
		# Usage: ./uninstall.sh remote-db --remove-user <user> <hostname>
		echo "Attempting to disable remote access to the database" >> /var/log/03w24/install.log
		remove $2 $3 $4
	fi
fi
