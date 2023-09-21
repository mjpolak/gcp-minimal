FROM node:lts-alpine3.18 as build
WORKDIR /opt/var/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN ["npm","install"]

COPY . .
RUN ["npm","run","build"]

FROM node:lts-alpine3.18 

WORKDIR /opt/var/app
COPY --from=build /opt/var/app/package.json package.json
COPY --from=build /opt/var/app/package-lock.json package-lock.json
RUN ["npm", "ci", "--only=production"]

COPY --from=build /opt/var/app/dist/ dist/
ENTRYPOINT [ "node", "dist/main.js" ]

