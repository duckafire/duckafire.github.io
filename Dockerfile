FROM node:18.20.8-alpine3.21

WORKDIR nest
EXPOSE 8080
CMD ["npm", "run", "deploy"]

COPY package.json .
RUN npm install
COPY build.js .

COPY ./src ./public
RUN    npm run build \
	&& npm run clean
