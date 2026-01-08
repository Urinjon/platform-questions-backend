# # Use the official Node.js image as the base image
# FROM node:25

# # Set the working directory inside the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install the application dependencies
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # Build the NestJS application
# RUN npm run build

# # Expose the application port
# EXPOSE 8000

# # Command to run the application
# CMD ["node", "dist/main"]



FROM node:24-alpine

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install

# Копируем prisma + env
COPY prisma ./prisma
COPY .env .env



# Копируем остальной код
COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 8000


CMD ["npm", "run", "start:prod"]


