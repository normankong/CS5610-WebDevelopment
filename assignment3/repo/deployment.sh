################################
# Script to deploy to heroku
################################

# Run npm build
cd client
npm run build

# Sync the Client Heroku Public folder
rsync -avh                             build/  ../deployment/public --delete

cd ../server
# Sync Server to Heroku folder
rsync -avh --exclude='node_modules/'       .   ../deployment/

# Go to the folder
cd ../deployment

# Add to remote
# git init
git add .
git commit -am "Continuous integration"
git push heroku main


# Setup workspace
# git clone https://git.heroku.com/cs5610-ivt-00001.git
# mv cs5610-ivt-00001 heroku
# cd heroku
# heroku git:remote -a cs5610-ivt-00001


# View Log
# heroku logs --tail --source app  --app cs5610-ivt-00001

# Instance
# cs5610-ivt-00001

# SSH Inside
# heroku run bash --app cs5610-ivt-00001

# Restart
# heroku restart --app cs5610-ivt-00001

# Check status
# heroku ps --app cs5610-ivt-00001
