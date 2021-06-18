# E2E Tests vs Unit Tests

> If I can suggest some feedback… It’s a little misleading to compare jest vs react-testing-library since they’re different type of tools. Jest is a test framework/runner while enzyme/rtl are testing libraries. I think you meant enzyme vs rtl but it was a little confusing.
> Also, I think Cypress is meant to be for e2es, as you mentioned, and comparing them to enzyme/rtl is a little strange. You should be writing unit tests with jest because it’s faster to run and gives a better feedback loop for developers as they write and iterate on the application code or test code. E2Es really should be lightweight and test the interfaces between different systems, e.g. test your frontend is handling API calls/responses from the server correctly.

Footer
---
Source: Comments section of https://javascript.plainenglish.io/i-tested-a-react-app-with-jest-testing-library-and-cypress-here-are-the-differences-3192eae03850
Keywords: #programming #testing #jest #cypress #react-testing-library 
Related: