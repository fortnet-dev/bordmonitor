#!/bin/bash

sudo docker run --rm --privileged --net=host \
	--device=/dev/snd --device=/dev/bus/usb \
	-v /var/run/dbus/system_bus_socket:/var/run/dbus/system_bus_socket \
	--name bordmonitor fortnet-dev/bordmonitor
