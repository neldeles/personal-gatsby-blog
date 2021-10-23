---
date: '2021-10-20T19:48:20'
tags: ['msw', 'axios', 'react']
title:
published: true
description:
aliases:
references:
zet_id: 20211020T194820
---

# Diagram of how MSW works

![](CleanShot-2021-10-20-at-19.48.52@2x.png)

Your app will send out an HTTP request via Axios (or fetch if you don't want to use any additional library). That request will be intercepted by MSW and will send back a mock response. 

By using MSW we don't need to setup a backend server to start working on the frontend of our app.

# Footer

---
## Related

---

## References