---
aliases:
tags: ['postgresql']
references:
- https://www.youtube.com/watch?v=ldYcgPKEZC8
---

# PostgreSQL Terminal

| Command                  | Description                                                               | Notes |
| ------------------------ | ------------------------------------------------------------------------- | ----- |
| `psql -U postgres`       | login as admin                                                            |       |
| `\l`                      | show all databases                                                        |       |
| `\c dbname`               | connect to a database                                                     |       |
| `\dt`                    | list tables in the connected database                                     |       |
| `CREATE DATABASE dbname` | create database                                                           |       |
| `q`                      | after executing a query to exit results view                              |       |
| `d+ [name_of_table]`     | view constraints of table                                                 |       |
| `\x`                     | before writing `select * from users` for prettier formatted query results |       |
| `\d+ table_name`         | view column names and data types                                          |       |
# Footer
---
Related: 