FROM node:22.11.0-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.*.json ./

RUN npm install --production --no-optional

RUN npm install -g @nestjs/cli

COPY . .
# Here we copy .env files to container which is not secure(for better experience in security use vault or docker secrets), copied because it's test task;

RUN npm run build

FROM node:22.11.0-slim

WORKDIR /usr/src/app

RUN mkdir dist

COPY --from=builder /usr/src/app/dist ./dist


COPY --from=builder /usr/src/app/.env ./.env

RUN mkdir src

COPY --from=builder /usr/src/app/src/orm.config.ts ./src/orm.config.ts

COPY package*.json ./

COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
