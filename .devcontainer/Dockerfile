FROM --platform=amd64 node:lts

RUN apt-get update && \
    apt-get install -y \
        bc dc parallel \
        curl git gnupg2 zsh

RUN curl -sL https://github.com/shenwei356/rush/releases/download/v0.5.3/rush_linux_amd64.tar.gz | tar xvz && \
    mv rush /usr/local/bin/

WORKDIR /workspaces/bats-js

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g npm@10.2.0 && \
    npm install --silent

RUN chown -R node /workspaces/bats-js

RUN usermod --shell /bin/zsh node

USER node

RUN sh -c "$(curl -L https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t robbyrussell \
    -a "zstyle ':omz:update' mode auto"
