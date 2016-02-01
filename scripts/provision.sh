#!/bin/bash -e

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.."; pwd)"

main() {
    if [[ $(id -u) != 0 ]]; then
        echo 'You are not root'.
        exit 1
    fi
    cd "$root"
    install
    configure
}

install() {
    apt-get install nginx
}

configure() {
    cp "$root"/scripts/data/nginx.conf /etc/nginx/nginx.conf
    service nginx start
    service nginx reload
}

main "$@"
