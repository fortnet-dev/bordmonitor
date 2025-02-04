FROM oven/bun:slim AS base
WORKDIR /home/bun/app/

FROM base AS install
RUN mkdir -p /temp/dep/
COPY package.json bun.lock /temp/dep/
RUN cd /temp/dep/ && bun install --frozen-lockfile

FROM base AS build
COPY --from=install /temp/dep/node_modules/ node_modules/
COPY . .
ENV NODE_ENV=production
RUN bun run generate

FROM base
COPY --from=build /home/bun/app/.output .output/
RUN bun install --global serve
RUN echo '{"directoryListing":false}' > .output/public/serve.json
CMD ["bun", "x", "serve", "--no-port-switching", "-p", "3000", "--no-request-logging", ".output/public"]