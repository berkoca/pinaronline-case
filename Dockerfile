FROM node:24-alpine

WORKDIR /app

COPY package.json .

COPY . .

COPY prisma ./prisma

RUN npx prisma generate

RUN yarn install

RUN yarn global add typescript

RUN tsc

EXPOSE 3000