#!/bin/sh

# if mysql is not installed
if ! command -v mysql; then
	# install mysql
	sudo apt-get install mysql-server
fi

# if mysql is not running
if ! pgrep mysql; then
	# start mysql
	sudo systemctl start mysql
fi

# if the user does not exist
if ! sudo mysql -u root -e "SELECT User FROM mysql.user WHERE User='03w24';" | grep -q '03w24'; then
	# create the user
	sudo mysql -u root -e "CREATE USER '03w24'@'%' IDENTIFIED BY 'admin03w24';"
	sudo mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO '03w24'@'%' WITH GRANT OPTION;"
	sudo mysql -u root -e "FLUSH PRIVILEGES;"
fi

# if the database does not exist
if ! sudo mysql -u root -e "SHOW DATABASES;" | grep -q '03cis4250w24'; then
	# create the database
	sudo mysql -u root -e "CREATE DATABASE 03cis4250w24;"
fi

# create Users table if the database exists
sudo mysql
USE 03cis4250w24;
CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(255) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
EOF

