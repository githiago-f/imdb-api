# use docker to run postgress
docker run -it --rm --env-file dev.env -p 5432:5432 postgres

# execute all migrations
yarn typeorm migration:run
