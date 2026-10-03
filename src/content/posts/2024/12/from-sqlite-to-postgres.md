---
title: "Actix Framework: A Complete Guide to Migrating from SQLite to PostgreSQL"
date: "2024-12-18"
description: "Migrating a service built with the actix framework from SQLite to Postgres"
category: "Rust"
tags: ["actix", "actix-web", "sqlite", "postgres"]
---

## Background
The service is built with the actix framework. Since it's a simple service, it had always used SQLite. But as the data volume grew and a cloud database became a requirement, SQLite could no longer meet the needs. So I migrated to Postgres.


## The Migration
When writing the actix-web service, I used an ORM framework: [sea-orm](https://www.sea-ql.org/).

sea-orm supports SQLite, MySQL, Postgres, MSSQL, and SQL Server.

### Change the Database Driver
Edit the cargo.toml file:
```
sea-orm ={ version = "1.1.0", features = ["sqlx-sqlite", "macros", "runtime-tokio-rustls", "with-chrono"] }
```
Change it to:
```
sea-orm ={ version = "1.1.0", features = ["sqlx-postgres", "macros", "runtime-tokio-rustls"] }
```

### Change the Database URL
```
DATABASE_URL=sqlite://datebase.sqlite?mode=rwc
```
Change it to:
```
DATABASE_URL=postgres://username:password@localhost:5432/database_name
```

### Regenerate the Database and Related Code
```
sea-orm-cli migrate up
sea-orm-cli generate entity -o entity/src
```

Restart the service and you're done. With an ORM, migrating is painless.
