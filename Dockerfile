FROM node:alpine

USER root

# Create Directory for the Container
WORKDIR /app

# Only copy package.json and typescript confige files to app directory
COPY package.json ./
COPY tsconfig.json ./

# Install all Packages
RUN npm install

# Copy all typescript source code to app directory
COPY ./src ./src

# TypeScript
RUN npm run build

# ENV variables
ENV DB_ADDRESS=mongodb://host.docker.internal:27017/blog \
DB_USER= \
DB_PASS= \
PORT=3000 \
JWT_PRIVATE_KEY=PrivateKey

# Start
EXPOSE 3000
CMD ["node", "./dist/app.js"]
