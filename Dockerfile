FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Copy .env files
COPY .env.development .env.development
COPY .env.production .env.production


RUN npm install

# Bundle app source
COPY . .

EXPOSE 9002
CMD [ "npm", "run", "start:prod" ]
