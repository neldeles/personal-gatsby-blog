---
date: '2021-10-24T10:15:45'
tags: #axios 
title: 
published: true
description:
aliases:
references:
zet_id: 20211024T101545
---

# How to catch the body an axios error

There are 3 different properties available to us depending on the kind of failure.

### Error in setting up the request

This error can happen if we have made an actual mistake in setting up the AXIOS request. It could be something with the data passed, or a configuration setting.

When this happen we can actually find the information we need by accessing the `message` parameter of the catch.  

```
axios.get('wrongSetup')
    .then((response) => {})
    .catch((error) => {
        console.log(error.message);
    })

//or using destructuring
axios.get('wrongSetup')
    .then((response) => {})
    .catch(({message) => {
        console.log(message);
    })
```

### No response - Network Error

This scenario will take place when our request had no response at all. This can happen when the URL is incorrect, or if the receiving server is down.

When this happen we can access more information about our request bu accessing the `request` parameter. This will return the actual “request” information.  

```
axios.get('network error')
     .then((response) => {})
     .catch((error) => {
         console.log(error. request );
     })
//or using destructuring
 axios.get('network error')
     .then((response) => {})
     .catch(({ request ) => {
         console.log( request );
     })
```

### Request returned with an error status

Use `error.response`.

```
axios.get('errorStatus')
     .then((response) => {})
     .catch((error) => { 
         console.log(error.response.data);  
         console.log(error.response.status);  
         console.log(error.response.headers); 
     })

//or using destructuring
 axios.get('errorStatus')
     .then((response) => {})
     .catch(({ response }) => { 
         console.log(response.data);  
         console.log(response.status);  
         console.log(response.headers);  
     })
```

# Footer

---
## Related

---

## References

- https://dev.to/zelig880/how-to-catch-the-body-of-an-axios-error-4lk0