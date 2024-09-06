# syntax=docker/dockerfile:1.4

FROM ruby:3.3.0-slim

WORKDIR /var/www/myapp

COPY --from=devtooling ./bin /dev-tooling/bin
COPY --from=devops ./development/backend/scripts /tmp/scripts

ENV RAILS_ROOT /var/www/myapp

RUN buildDeps='curl apt-transport-https software-properties-common wget' && \
    apt-get update && \
    apt-get install -y --no-install-recommends $buildDeps nodejs npm nginx openssl build-essential postgresql postgresql-contrib libpq-dev gettext-base ca-certificates apache2-utils git wget && \
    wget https://github.com/tsl0922/ttyd/releases/download/1.7.3/ttyd.x86_64 -O /usr/bin/ttyd && chmod a+x /usr/bin/ttyd && echo "67cf926ddf157dcb089106c2aa6623b8613bb7f3b493048eeb6cc34423570b3c  /usr/bin/ttyd" | shasum -a 256 -c - && \
    /tmp/scripts/install-yarn.sh && \
    rm -rf /tmp/* && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get purge -y --auto-remove $buildDeps

    RUN gem install bundler -v 2.5.9

RUN adduser --uid 1000 nonroot

RUN chown nonroot -R /var/www/myapp && \
chown nonroot -R /usr/local/bundle

USER nonroot

COPY Gemfile Gemfile.lock yarn.lock package.json ./

RUN bundle config set --local frozen 'true' && bundle config set --local without 'development test'

RUN bundle install && yarn install --check-files

USER root

COPY . /var/www/myapp

ENV RAILS_ENV="production"

ARG RAILS_MASTER_KEY

# Setting environment variable only during the build process
ENV RAILS_MASTER_KEY="ca15a8e31b96a44122ad45f3e8892a97"

RUN bundle exec bootsnap precompile app/ lib/

# Precompiling assets for production without requiring secret RAILS_MASTER_KEY
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

# we need to compile prod assets but not try to connect to the prod database
RUN --mount=type=cache,target=/var/www/myapp/tmp/cache \
    DATABASE_URL=nulldb://dev:null@localhost/void && \
    rm -rf /var/www/myapp/node_modules && \
    # copy packs out of the cache mount
    cp -r /var/www/myapp/tmp/cache /tmp/cache && \
    rm /etc/nginx/sites-enabled/*

# put packs back in place
RUN cp -r /tmp/cache /var/www/myapp/tmp && \
    rm -rf /tmp/cache

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY --from=devops production/backend//configs/nginx.conf.template .
COPY --from=devops production/backend/configs/site.conf.template .
COPY --from=devops development/backend/entrypoint.sh .

RUN chown nonroot -R /var/www/myapp && \
chown nonroot -R /etc/nginx && \
chown nonroot -R /run && \
chown nonroot -R /usr/share/nginx && \
chown nonroot -R /var/lib/nginx

# USER nonroot

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["./bin/rails", "server"]
