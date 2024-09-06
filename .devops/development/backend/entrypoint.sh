#!/bin/bash
# our nginx template has some nginx vars such as $host. In order to be able to use those vars with envsubst we have to render $ character from ${DOLLAR}
export DOLLAR='$'
envsubst < nginx.conf.template > /etc/nginx/nginx.conf
envsubst < site.conf.template > /etc/nginx/sites-enabled/site.conf

./bin/rails server & nginx -g "daemon off;"
