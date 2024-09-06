#!/bin/bash
web_config_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
apt-get install -y logrotate
cp "$web_config_dir/configs/logrot-dev.conf" /etc/logrotate.d/myapp-logrot-dev.conf

