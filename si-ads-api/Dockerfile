#docker file for user api development
FROM node:18.14.0

WORKDIR /app

COPY . /app

RUN npm install

RUN npx tsc

ARG NODE_ENV

RUN echo ${NODE_ENV}

# Print the value of NODE_ENV
RUN echo "Environment variable NODE_ENV: $NODE_ENV"

RUN if [ "$NODE_ENV" = "production" ]; then npm prune --production; fi


CMD ["npm", "start"]
