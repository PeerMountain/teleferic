FROM node:9.7

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ /app/src

ARG PORT
EXPOSE $PORT

CMD ["npm", "run", "production"]
