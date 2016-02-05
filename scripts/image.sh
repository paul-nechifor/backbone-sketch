#/bin/bash -e

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.."; pwd)"
image_prefix="backbone-sketch-"
images_to_keep=2
exposed_port=3000
start_port=5000
sleep_between_restarts=10

main() {
    if [[ $1 ]]; then
        subcommand_"$@"
        return
    fi
    subcommand_build
}

subcommand_build() {
    cd "$root"
    local name="${image_prefix}$(date +'%Y%m%d-%H%M%S')"
    npm run build-production
    docker build -t "$name" .
}

subcommand_trim() {
    available_images |
    head -n -"$images_to_keep" |
    xargs docker rmi
}

subcommand_start() {
    # The number of running images is fix to 2.

    stop_image 0
    sleep "$sleep_between_restarts"
    start_image "$(latest_image)" 0

    stop_image 1
    sleep "$sleep_between_restarts"
    start_image "$(latest_image)" 1
}

subcommand_stop() {
    stop_image 0
    stop_image 1
}

subcommand_postgres() {
    local args=(
        -d
        -p 5432:5432
        -e POSTGRES_PASSWORD=password
        -v /postgres-data:/var/lib/postgresql/data
    )
    docker run "${args[@]}" postgres:9.5
    sleep 20
    PGPASSWORD=password psql -h localhost -p 5432 -U postgres -c '
        create database db
    '
}

start_image() {
    local image="$1"
    local container_index="$2"
    local real_port=$(( start_port + container_index ))
    echo -n "Starting container $container_index on port $real_port: "
    docker run -d -p "$real_port":"$exposed_port" "$image"
}

stop_image() {
    local index="$1"
    echo "Stopping container $index"
    local rem="$(docker stop "$(get_container "$index")")"
    if [[ $rem ]]; then
        echo -n "Removing container image: "
        docker rm "$rem"
    else
        echo "It wasn't running."
    fi
}

latest_image() {
    available_images | tail -n 1
}

available_images() {
    docker images |
    egrep "^$image_prefix" |
    cut -d' ' -f1 |
    sort
}

get_container() {
    local index="$1"
    docker ps |
    egrep "$image_prefix" |
    egrep ":$(( start_port + index ))" |
    cut -d' ' -f1
}

main "$@"
