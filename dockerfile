FROM node:6

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new dir
WORKDIR /usr/src/app

# Copy dependencies
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Get the code
COPY . /usr/src/app

EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
