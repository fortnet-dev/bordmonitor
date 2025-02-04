FROM oven/bun:debian AS base
WORKDIR /home/bun/app/

FROM base AS runtime
RUN sed -i 's/main/main non-free/' /etc/apt/sources.list
RUN apt-get update && apt-get install -y \
	build-essential \
	git \
	autoconf \
	automake \
	libtool \
	make \
	gcc \
	libc-dev \
	libasound2-dev \
	libbluetooth-dev \
	libdbus-1-dev \
	libsbc-dev \
	libfdk-aac-dev \
	libmp3lame-dev \
	libopus-dev \
	libsamplerate0-dev \
	libspandsp-dev \
	libreadline-dev \
	libconfig-dev \
	libortp-dev \
	libmpg123-dev \
	libopenaptx-dev \
	libldacbt-abr-dev \
	libldacbt-enc-dev \
	libglib2.0-dev \
	dbus \
	screen \
	alsa-utils \
	&& apt-get clean

RUN git clone https://github.com/Arkq/bluez-alsa.git /bluez-alsa && \
	cd /bluez-alsa && \
	autoreconf --install && \
	mkdir build && \
	cd build && \
	../configure --enable-aac --enable-ofono --enable-debug && \
	make && \
	make install

ENV LIBASOUND_THREAD_SAFE=0
ENV LD_LIBRARY_PATH=/usr/local/lib

FROM base AS install
RUN mkdir -p /temp/dep/
COPY package.json bun.lock /temp/dep/
RUN cd /temp/dep/ && bun install --frozen-lockfile

FROM base AS build
COPY --from=install /temp/dep/node_modules/ node_modules/
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM runtime
COPY --from=build /home/bun/app/.output .output/

# screen bluealsad -p a2dp-sink
# screen bluealsa-aplay --pcm=default:CARD=Headphones --volume=software

CMD ["bun", "run", ".output/server/index.mjs"]