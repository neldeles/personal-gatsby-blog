---
aliases:
tags: ['postgresql']
references:
- https://www.youtube.com/watch?v=ldYcgPKEZC8
---

# PostgreSQL Terminal
- `psql -U postgres` to login as admin
- `\l` to show all databases
	- `\c dbname` to connect to a database
		- `\dt` to list the tables in the connected database
- `CREATE DATABASE dbname` to create database
- `q` after executing a query to exit results view
- `d+ [name_of_table]` to view constraints of table
- `\x` before writing `select * from users` for a prettier formatted query results

# Footer
---
Related: 