# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS node-toolchain
FROM ubuntu:24.04 AS build
COPY --from=node-toolchain /usr/local/ /usr/local/
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates libstdc++6 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG DEBUG_ENABLED=false
RUN node --input-type=module -e 'import fs from "node:fs"; const value=process.argv[1]; if(!["true","false"].includes(value))throw Error("DEBUG_ENABLED must be true or false"); const path="public/debug-start.json"; const config=JSON.parse(fs.readFileSync(path)); config.enabled=value==="true"; fs.writeFileSync(path,JSON.stringify(config));' "$DEBUG_ENABLED" \
    && npm run build -- --base=/

FROM ubuntu:24.04 AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends nginx curl ca-certificates \
    && rm -rf /var/lib/apt/lists/* /var/www/html/* \
    && groupadd --gid 10001 game \
    && useradd --uid 10001 --gid game --no-create-home --shell /usr/sbin/nologin game
COPY --from=build /build/dist/ /srv/game/
COPY --from=build /build/LICENSE /build/ASSETS.md /usr/share/doc/monkey-business/
COPY docker/nginx.conf /etc/nginx/nginx.conf
USER 10001:10001
EXPOSE 8080
STOPSIGNAL SIGQUIT
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl --fail --silent http://127.0.0.1:8080/ > /dev/null || exit 1
CMD ["nginx", "-e", "stderr", "-g", "daemon off;"]