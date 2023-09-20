FROM node:lts-alpine3.18
WORKDIR /opt/var/app
COPY src .
RUN ["npm","install", "--global","http-server"]
ENTRYPOINT ["npx", "http-server", ".", "-p","8080"]