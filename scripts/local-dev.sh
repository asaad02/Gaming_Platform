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
grep -rl "header('Access-Control-Allow-Origin: unix:\/run\/php\/php8.2-fpm.sock');" ./api | xargs sed -i "s/header('Access-Control-Allow-Origin: unix:\/run\/php\/php8.2-fpm.sock');/header('Access-Control-Allow-Origin: http:\/\/localhost:9000');/g"
echo "PHP Ready for Local Development." >> log/install.log

# swap out where api calls are made
echo "Swapping where api calls are made" >> log/install.log
grep -rl "https:\/\/cis4250w24-03.socs.uoguelph.ca" ./src | xargs sed -i "s/https:\/\/cis4250w24-03.socs.uoguelph.ca/http:\/\/localhost\/team_3/g"
echo "API Ready for Local Development." >> log/install.log

# fix db connection
echo "Fixing db connection" >> log/install.log
grep -rl "'DOCUMENT_ROOT'] . '\/db" ./db ./api | xargs sed -i "s/'DOCUMENT_ROOT'] . '\/db/'DOCUMENT_ROOT'] . '\/team_3\/db/g"
echo "DB Connection Ready for Local Development." >> log/install.log

#unamestr="$(uname)"
# start XAMPP if on windows 
#if [[ "$unamestr" eq 'Linux' ]]; then
	#powershell.exe -Command "Start-Process -NoNewWindow -FilePath 'C:\xampp\xampp_start.bat'"
	#powershell.exe -Command "Start-Process -NoNewWindow -FilePath 'C:\xampp\apache_start.bat'"
	#powershell.exe -Command "Start-Process -NoNewWindow -FilePath 'C:\xampp\mysql_start.bat'"
#fi