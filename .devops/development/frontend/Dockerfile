FROM node:20-slim
RUN apt-get update && apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
EXPOSE 4000
WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn install --check-files
COPY . .
CMD ['yarn', 'dev']