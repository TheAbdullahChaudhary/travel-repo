#!/bin/bash

apt-get install -y --no-install-recommends dirmngr gnupg
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
apt-get install -y apt-transport-https ca-certificates

sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger bookworm main > /etc/apt/sources.list.d/passenger.list'
apt-get update

apt-get install -y --no-install-recommends libnginx-mod-http-passenger

passenger-config build-native-support

