FROM netczuk/node-yarn
# Create app directory
RUN mkdir -p /usr/src/render
WORKDIR /usr/src/render
# Install app dependencies
COPY package.json /usr/src/render/
COPY yarn.lock /usr/src/render/
RUN yarn
# Bundle app source
COPY . /usr/src/render
RUN yarn build
RUN rm -rf /usr/src/render/src
EXPOSE 3000
CMD [ "yarn", "start" ]