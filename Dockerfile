FROM mhart/alpine-node:12

LABEL maintainer="BitSky docker maintainers <help.bitskyai@gmail.com>"

# create app directory
WORKDIR /usr/bitsky


COPY package*.json ./

# Only install 
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 9099
CMD ["node", "build/index.js"]

# Metadata
LABEL bitsky.image.vendor="BitSky" \
    bitsky.image.url="https://bitsky.ai" \
    bitsky.image.title="BitSky Browser Extension Agent" \
    bitsky.image.description="Response for collect intelligence data and send back to Analyst Service. It contains Google Chrome, Firefox and Opera extensions." \
    bitsky.image.documentation="https://docs.bitsky.ai"