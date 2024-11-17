FROM node:20.18.0-alpine AS build

WORKDIR /build

COPY package.json .

RUN npm install


FROM node:20.18.0-alpine AS production

WORKDIR /production

COPY . .

COPY --from=build /build .

EXPOSE 3000

CMD ["npm", "run", "start"]