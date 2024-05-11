#!/bin/sh

function setup () {
	echo "Attempting to enable remote access to the database" >> /var/log/03w24/install.log
	# ensure the user has provided the required arguments
	if [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ];
		then
		echo "Usage: ./install.sh remote-db <user> <hostname> <password>" >> /var/log/03w24/install.log
		exit 1
	fi

	echo "User: $2 Hostname: $3 Password: $4" >> /var/log/03w24/install.log
	
	# ensure hostname is a valid ip address
	if ! [[ $3 =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]];
		then
		echo "Invalid hostname" >> /var/log/03w24/install.log
		exit 1
	fi

	# create a new user and grant privileges
	sudo mysql -u root -e "CREATE USER IF NOT EXISTS '$2'@'$3' IDENTIFIED BY '$4';"
	echo "User $2 has been created" >> /var/log/03w24/install.log

	# grant privileges and flush
	sudo mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO '$2'@'$3';"
	sudo mysql -u root -e "FLUSH PRIVILEGES;"
	echo "Privileges have been granted" >> /var/log/03w24/install.log

	# update the bind-address to allow remote access
	sudo sed -i 's/bind-address            = 127.0.0.1/bind-address            = 0.0.0.0/g' /etc/mysql/mariadb.conf.d/50-server.cnf
	echo "Bind-address has been updated" >> /var/log/03w24/install.log

	# restart the mysql service
	sudo systemctl restart mysql
	echo "MySQL service has been restarted" >> /var/log/03w24/install.log

	# log the event
	echo "Remote access to the database has been enabled" >> /var/log/03w24/install.log
	exit 0
}

function remove () {
	if [ $2 == "--remove-user" ];
		then
		echo "Attempting to remove user: $3 from host: $4" >> /var/log/03w24/install.log
		
		if [ ! -z "$3" ] && [ ! -z "$4" ];
			then
			# revoke privileges
			sudo mysql -e "REVOKE ALL PRIVILEGES ON *.* FROM '$3'@'$4';"
			
			# remove the user
			sudo mysql -e "DROP USER '$3'@'$4';"

			echo "User has been removed" >> /var/log/03w24/install.log
		fi
	fi

	# disable remote access
	echo "Attempting to disable remote access to the database" >> /var/log/03w24/install.log
	sudo sed -i 's/bind-address            = 0.0.0.0/bind-address            = 127.0.0.1/g' /etc/mysql/mariadb.conf.d/50-server.cnf
	echo "Bind-address has been updated" >> /var/log/03w24/install.log

	# restart the database
	sudo systemctl restart mysql
	echo "Database has been restarted" >> /var/log/03w24/install.log

	# log the result
	echo "Remote access to the database has been disabled" >> /var/log/03w24/install.log
	exit 0
}