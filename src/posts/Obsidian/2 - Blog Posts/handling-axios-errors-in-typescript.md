---
date: '2021-11-11T20:34:18'
tags: typescript, axios, msw
title: Handling Axios errors in Typescript
published: true
description:
aliases:
references:
zet_id: 20211111T203418
date_modified: 2021-11-11T20:57:08
---

# Handling Axios errors in Typescript

Kent Dodds [wrote an awesome article](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript) on how he handles catch-block error messages in Typescript.

This works great but I encountered some issues with my MSW and Axios setup. Specifically, I was unable to access the `error.response.data.message` property and display the text of that as my error message. Typescript would spit out the error `property response does not exist on type Error`.

Seems this is because of [how Axios handles errors](https://axios-http.com/docs/handling_errors):

```js
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

As you can see `error` has `response` and `request` keys. Axios does actually have Typescript types available so we can use those in our type guards to get around the issue. This is my solution based on [this](https://github.com/axios/axios/issues/3612#issuecomment-933263425):

```tsx
try {
  const response = await loginService(credentials);
  setUser(response);
} catch (error) {
  let message;
  if (axios.isAxiosError(error) && error.response) {
	message = error.response.data.message;
  } else message = String(error);
  setErrorMessage(message);
}
```

# Footer

---

## Related

---

## References

- https://github.com/axios/axios/issues/3612