#  Memoization and Caching

> To make sure regularly accessed data is faster, we use both memoization and caching. Memoization means we store the results of expensive operations; if we get the same inputs, we return the stored values instead of running the function again. We use [a lot of caching](https://stackoverflow.blog/2019/08/06/how-stack-overflow-caches-apps-for-a-multi-tenant-architecture/) (in different levels, both in-process and external, with Redis) as some of the SQL operations can be slow, while Redis is fast. Translating from relational data in SQL to object oriented data in any application can be a performance bottleneck, so we built [Dapper](https://github.com/StackExchange/Dapper), a high performance micro-ORM that suits our performance needs.

Footer
---
Source: https://stackoverflow.blog/2021/03/03/best-practices-can-slow-your-application-down/?utm_source=Iterable&utm_medium=email&utm_campaign=the_overflow_newsletter
Keywords: #programming #optimization
Related: