FROM ruby:3.1.0-slim

ENV PORT 4000

WORKDIR /app

RUN apt-get clean && apt-get update && apt-get -yq dist-upgrade \
    && apt-get install -qqy --no-install-recommends \
    build-essential \
    curl \
    file \
    git \
    libpq-dev \
    libxml2-dev \
    libxslt-dev \
    && apt-get clean \
    && rm -rf /var/cache/apt/archives/* \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && truncate -s 0 /var/log/*log


RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

COPY . /app/
COPY Gemfile* /app/

RUN gem install bundler
RUN bundle install

EXPOSE $PORT

CMD rm -f /app/tmp/pids/server.pid && rails s -b 0.0.0.0 -p $PORT
