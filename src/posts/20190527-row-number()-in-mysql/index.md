---
date: "2019-05-27T08:00:00+00:00"
tags: ["sql"]
title: "row_number() in MySQL"
description: How to implement `row_number()` in MySQL.
published: true
---

In Redshift I frequently use the `row_number()` function. However the version of MySQL our DB uses doesn't support this.

To work around it can use:

```sql
SELECT a.i, a.j, count(*) as row_number FROM test a
JOIN test b ON a.i = b.i AND a.j >= b.j
GROUP BY a.i, a.j
```

## Appendix

[source](https://stackoverflow.com/questions/1895110/row-number-in-mysql)
