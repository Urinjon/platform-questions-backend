






# Stage 1: builder
FROM node:24-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY . .

# Объявляем build-arg
ARG DATABASE_URL
# Prisma видит env на этапе генерации
ENV DATABASE_URL=${DATABASE_URL}



RUN npx prisma generate
RUN npm run build

# Stage 2
FROM node:24-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./


EXPOSE 8000
CMD ["npm", "run", "start:prod"]


