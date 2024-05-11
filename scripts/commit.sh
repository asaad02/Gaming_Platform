#!/bin/sh

# create a directory to store the log file if it does not exist
if [ ! -d log ];
  then
	mkdir log
fi

# create an install log file if it does not exist
if [ ! -f log/install.log ];
  then
	touch log/install.log
fi

# write the date and time to the log file
echo "" >> log/install.log
echo "Date: $(date)" >> log/install.log

# swap out where php is running
echo "Swapping out where php is running" >> log/install.log
grep -rl "header('Access-Control-Allow-Origin: http:\/\/localhost:9000');" ./api | xargs sed -i "s/header('Access-Control-Allow-Origin: http:\/\/localhost:9000');/header('Access-Control-Allow-Origin: unix:\/run\/php\/php8.2-fpm.sock');/g"
echo "PHP Ready for Remote Deployment." >> log/install.log

# swap out where api calls are made
echo "Swapping where api calls are made" >> log/install.log
grep -rl "http:\/\/localhost\/team_3" ./src | xargs sed -i "s/http:\/\/localhost\/team_3/https:\/\/cis4250w24-03.socs.uoguelph.ca/g"
echo "API Ready for Remote Deployment." >> log/install.log

# fix db connection
echo "Fixing db connection" >> log/install.log
grep -rl "'DOCUMENT_ROOT'] . '\/team_3\/db" ./db ./api | xargs sed -i "s/'DOCUMENT_ROOT'] . '\/team_3\/db/'DOCUMENT_ROOT'] . '\/db/g"
echo "DB Connection Ready for Remote Deployment." >> log/install.log

# start XAMPP if on windows 
#if [ "$(uname)" == "Linux" ];
  #then
	#powershell.exe -Command "Start-Process -NoNewWindow -FilePath 'C:\xampp\xampp_stop.bat'"
	#powershell.exe -Command "Start-Process -NoNewWindow -FilePath 'C:\xampp\apache_stop.bat'"
	#powershell.exe -Command "Start-Process -NoNewWindow -FilePath 'C:\xampp\mysql_stop.bat'"
#fi