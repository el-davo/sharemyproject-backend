FROM node:8.1.0
RUN npm install -g yarn

# Create app directory
WORKDIR /usr/src/app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
