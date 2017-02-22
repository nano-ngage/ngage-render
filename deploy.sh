#!/usr/bin/env bash

echo "stopping running application"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker stop ngage-render'
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker rm ngage-render'

echo "pulling latest version of the code"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker pull nanongage/ngage-render:latest'

echo "starting the new version"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker run -d --restart=always --link ngage-db:ngagedb -e DBIP="ngagedb" --link ngage-socket:ngagesocket -e SOCKETIP="ngagesocket" --name ngage-render -p 3000:3000 nanongage/ngage-render:latest'

echo "success!"

exit 0