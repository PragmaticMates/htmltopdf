FROM node:12.11.1-alpine

ENV NODE_ENV="production" \
    CHROME_BIN="/usr/bin/chromium-browser"

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    dumb-init \
    udev \
    ttf-freefont \
    chromium \
#    && npm install puppeteer-core@1.10.0 --silent \
    # Cleanup
    && apk del --no-cache make gcc g++ python binutils-gold gnupg libstdc++ \
    && rm -rf /usr/include \
    && rm -rf /var/cache/apk/* /root/.node-gyp /usr/share/man /tmp/* \
    && echo
COPY . /app
RUN cd /app && npm install --quiet
EXPOSE 3000
WORKDIR /app
ENTRYPOINT ["/usr/bin/dumb-init"]
CMD npm run start