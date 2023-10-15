FROM node:lts

RUN apt-get update && \
    apt-get install -y git gnupg2 zsh

WORKDIR /workspaces/bats-js

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g npm@10.2.0 && \
    npm install --silent

COPY . .

RUN chown -R node /workspaces/bats-js

RUN usermod --shell /bin/zsh node

USER node

RUN sh -c "$(curl -L https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t robbyrussell \
    -a "zstyle ':omz:update' mode auto"
