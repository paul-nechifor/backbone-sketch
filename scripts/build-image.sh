#/bin/bash -e

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.."; pwd)"

main() {
    cd "$root"
    npm run build-production
    docker build -t backbone-sketch .
}

main "$@"
