# The Mongoose Join
We would like our API to work in such a way, that when an HTTP GET request is made to the _/api/users_ route, the user objects would also contain the contents of the user's notes, and not just their id. In a relational database, this functionality would be implemented with a _join query_.

As previously mentioned, document databases do not properly support join queries between collections, but the Mongoose library can do some of these joins for us. Mongoose accomplishes the join by doing multiple queries, which is different from join queries in relational databases which are _transactional_, meaning that the state of the database does not change during the time that the query is made. With join queries in Mongoose, nothing can guarantee that the state between the collections being joined is consistent, meaning that if we make a query that joins the user and notes collections, the state of the collections may change during the query.

The Mongoose join is done with the [populate](http://mongoosejs.com/docs/populate.html) method.

Footer
---
Source: https://fullstackopen.com/en/part4/user_administration#creating-a-new-note
Keywords: #mongoose 
Related:
- [[Setting up User Administration in Mongoose and Node]]