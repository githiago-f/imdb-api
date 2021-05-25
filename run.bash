docker run -it --rm --env-file dev.env -p 5432:5432 postgres

yarn typeorm migration:run
