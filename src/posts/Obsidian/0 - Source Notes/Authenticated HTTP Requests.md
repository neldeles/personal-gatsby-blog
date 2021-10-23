---
date: '2021-10-22T13:10:00'
tags: []
title: 
published: true
description:
aliases:
references:
zet_id: 20211022T131000
---

# Authenticated HTTP Requests

The easiest way to manage displaying the right content to the user based on whether they've logged in, is to split your app into two parts: `Authenticated`, and `Unauthenticated`. Then you choose which to render based on whether you have the user's information.

And when the app loads in the first place, you'll call your auth provider's API to retrieve a token if the user is already logged in. If they are, then you can show a loading screen while you request the user's data before rendering anything else. If they aren't, then you know you can render the login screen right away.

# Footer

---
## Related

- [Setting up AuthContext](Setting%20up%20AuthContext.md)

---

## References

- [lesson243.mp4](hook://file/4m92qLAii?p=RXBpY1JlYWN0IC0gRXBpYyBSZWFjdCBQcm8vOS4gQnVpbGQgYW4gRXBpYyBSZWFjdCBBcHAgKw==&n=lesson243%2Emp4)