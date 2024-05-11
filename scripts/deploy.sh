#!/bin/sh

MODE=$1

if [ $MODE = "production" ]; then
	DEPLOY_DIR="/var/www/production"
	NGINX_SEARCH_TERM="root /var/www/html;"
	SED_SEARCH_TERM="root \/var\/www\/html;"
	SED_REPLACE_TERM="root \/var\/www\/production\/dist;"

elif [ $MODE = "dev" ]; then
	DEVELOPER=$2

	DEPLOY_DIR="/var/www/dev/$DEVELOPER"
	NGINX_SEARCH_TERM="location /dev/$DEVELOPER/"
	SED_SEARCH_TERM="server_name cis4250w24-03.socs.uoguelph.ca; # managed by Certbot"
	SED_REPLACE_TERM="location \/dev\/$DEVELOPER\/ {alias \/var\/www\/dev\/$DEVELOPER\/dist\/;try_files \$uri \$uri\/ \/dev\/$DEVELOPER\/index.html;}"

elif [ $MODE = "sprint" ]; then
	SPRINT=$2
	DEPLOY_DIR="/var/www/$SPRINT"
	NGINX_SEARCH_TERM="location /$SPRINT/"
	SED_SEARCH_TERM="server_name cis4250w24-03.socs.uoguelph.ca; # managed by Certbot"
	SED_REPLACE_TERM="location \/$SPRINT\/ {alias \/var\/www\/$SPRINT\/dist\/;try_files \$uri \$uri\/ \/$SPRINT\/index.html;}"
else
	echo "Usage: deploy.sh <production|dev|sprint> ["developer" if dev mode] ["sprint_x" if sprint mode]"
	exit 1
fi

NGINX_CONFIG_FILE="/etc/nginx/sites-available/3760website"

# if ngninx does not have a location block for the developer's directory
# currently not using for production because it was set manually on the server
# uncommenting it here would cause problems because the sed command would append the config to the server block, it needs to replace the root directory instead
if ! grep -q "$NGINX_SEARCH_TERM" $NGINX_CONFIG_FILE && [ ! $MODE = "production" ]; then 
	# find the server block that has a server name containting cis4250w24-03.socs.uoguelph.ca, append the config to the server block
	echo "Add server config" && sudo sed -i "/$SED_SEARCH_TERM/a $SED_REPLACE_TERM" $NGINX_CONFIG_FILE
	# restart nginx so the changes take effect
	echo "restarting nginx" && sudo systemctl restart nginx
fi

# if node is not installed 
if ! command -v node; then
	# install node
	sudo apt-get update
	sudo apt-get install -y nodejs npm
	echo "node installed"
fi

# check if commit script needs to be run ( if any of the files contain localhost )
if grep -q "localhost" $DEPLOY_DIR/api $DEPLOY_DIR/src $DEPLOY_DIR/db; then
	cd $DEPLOY_DIR
	# run the commit script
	./scripts/commit.sh
fi

# change webpack publicPath variable to the correct path
WEBPACK_FILE_PATH="$DEPLOY_DIR/webpack.config.cjs"
# if production mode, public path is /, else if dev mode, public path is /dev/developer/ or if sprint mode, public path is /sprint_x/
if [ $MODE = "dev" ]; then
	echo "setting public path to /dev/$DEVELOPER/" && sudo sed -i "s/publicPath: '\/'/publicPath: '\/dev\/$DEVELOPER\/'/g" $WEBPACK_FILE_PATH
elif [ $MODE = "sprint" ]; then
	echo "setting public path to /$SPRINT/" && sudo sed -i "s/publicPath: '\/'/publicPath: '\/$SPRINT\/'/g" $WEBPACK_FILE_PATH
fi

# change app router base to the correct path
APP_FILE_PATH="$DEPLOY_DIR/src/App/App.jsx"
SED_SEARCH_TERM="<BrowserRouter"
# if production mode, router base is /, else if dev mode, router base is /dev/developer/ or if sprint mode, router base is /sprint_x/
if [ $MODE = "dev" ]; then
	SED_REPLACE_TERM="<BrowserRouter basename='\/dev\/$DEVELOPER\/'"
	echo "setting router basename to /dev/$DEVELOPER/" && sudo sed -i "s/$SED_SEARCH_TERM/$SED_REPLACE_TERM/g" $APP_FILE_PATH
elif [ $MODE = "sprint" ]; then
	SED_REPLACE_TERM="<BrowserRouter basename='\/$SPRINT\/'"
	echo "setting router basename to /$SPRINT/" && sudo sed -i "s/$SED_SEARCH_TERM/$SED_REPLACE_TERM/g" $APP_FILE_PATH
fi

# deploy the db using the deploy-db.sh script
sudo chmod +x $DEPLOY_DIR/scripts/deploy-db.sh
sudo $DEPLOY_DIR/scripts/deploy-db.sh

# create the build
cd $DEPLOY_DIR
sudo npm --silent install
sudo npm run --silent build

sudo cp -r $DEPLOY_DIR/api $DEPLOY_DIR/dist/
sudo cp -r $DEPLOY_DIR/db $DEPLOY_DIR/dist/
sudo cp -r $DEPLOY_DIR/public $DEPLOY_DIR/dist/
sudo cp $DEPLOY_DIR/globals.css $DEPLOY_DIR/dist/

