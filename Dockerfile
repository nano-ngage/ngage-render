FROM node:boron
# Create app directory
RUN mkdir -p /usr/src/render
WORKDIR /usr/src/render
# Install app dependencies
COPY package.json /usr/src/render/
RUN npm install
ARG DBIP
ARG SOCKETIP
ARG AUTH0_CLIENT_ID
ARG AUTH0_DOMAIN
ENV DBIP $DBIP
ENV SOCKETIP $SOCKETIP
ENV AUTH0_CLIENT_ID $AUTH0_CLIENT_ID
ENV AUTH0_DOMAIN $AUTH0_DOMAIN
run echo ${DBIP}
run echo ${SOCKETIP}
run echo ${AUTH0_CLIENT_ID}
run echo ${AUTH0_DOMAIN}
# Bundle app source
COPY . /usr/src/render
RUN npm run build
RUN rm -rf /usr/src/render/src
EXPOSE 3000
CMD [ "npm", "start" ]