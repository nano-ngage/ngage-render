FROM node:boron
# Create app directory
RUN mkdir -p /usr/src/render
WORKDIR /usr/src/render
# Install app dependencies
COPY package.json /usr/src/render/
RUN npm install
ARG DBIP
ARG SOCKETIP
ENV DBIP $DBIP
ENV SOCKETIP $SOCKETIP
run echo ${DBIP}
run echo ${SOCKETIP}
# Bundle app source
COPY . /usr/src/render
RUN npm run build
RUN rm -rf /usr/src/render/src
EXPOSE 3000
CMD [ "npm", "start" ]