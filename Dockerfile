FROM node:18.20.8-alpine3.21

WORKDIR nest
EXPOSE 8080
CMD ["npm", "run", "deploy"]

COPY nodejs/package.json .
RUN npm install
COPY nodejs .

COPY ./src ./public
RUN    npm run build \
	&& npm run clean
