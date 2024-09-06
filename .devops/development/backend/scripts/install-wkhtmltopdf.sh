#!/bin/bash

mkdir /tmp/wkhtml
cd /tmp/wkhtml

wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.bookworm_amd64.deb

apt install -f -y ./wkhtmltox_0.12.6.1-2.bookworm_amd64.deb

rm -rf /tmp/wkhtml
