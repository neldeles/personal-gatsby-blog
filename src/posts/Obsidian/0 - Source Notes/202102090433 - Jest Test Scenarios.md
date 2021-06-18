# Jest Test Scenarios
## toEqual
```js
describe('most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(null);
  });

  test('in list of blogs', () => {
    const result = listHelper.favoriteBlog(blogs);
    const expectedResult = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };
    expect(result).toEqual(expectedResult);
  });
});
```
When comparing javascript [[202011221802 - JavaScript Objects| objects]], can use the `toEqual` method.

## toContain and toContainEqual
The material uses the [toContain](https://facebook.github.io/jest/docs/en/expect.html#tocontainitem) matcher in several places to verify that an array contains a specific element. It's worth noting that the method uses the `===` operator for comparing and matching elements, which means that it is often not well-suited for matching objects. In most cases, the appropriate method for verifying objects in arrays is the [toContainEqual](https://facebook.github.io/jest/docs/en/expect.html#tocontainequalitem) matcher.

## toBeDefined
If we want to verify the existence of of a property.
```js
test('unique identifier of blog entry is id', async () => {
  const blog = await helper.blogEntriesInDB();
  const blogEntry = blog[0];
  expect(blogEntry.id).toBeDefined();
});
```

## Setup for JWT-based authentication
If a route needs token-based authentication, you can set it up once in the `beforeEach` function call. Important to note also that you need to define the variable in the global scope:
```js
const api = supertest(app);
let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'lebron', passwordHash });
  await user.save();

  const response = await api
    .post('/api/login')
    .send(helper.loginCredentials);
  token = response.body.token;

  const lebron = await User.findOne({ username: response.body.username });

  const blogObjects = helper.initialBlog.map((blog) => {
    blog.user = lebron._id;
    return new Blog(blog);
  });
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
```
You can then reference the `token` variable in your payload:
```js
test('a blog entry can be added', async () => {
    const newBlogEntry = {
      title: 'This is a new blog entry',
      author: 'Test Author',
      url: 'http://www.someurl.com',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .send(newBlogEntry)
      .set({ Authorization: `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogAtEnd = await helper.blogEntriesInDB();
    expect(blogAtEnd).toHaveLength(helper.initialBlog.length + 1);

    const titles = blogAtEnd.map((n) => n.title);
    expect(titles).toContain('This is a new blog entry');
  });
```
Footer
---
Source:
Keywords: #jest #node #testing 
Related:
- [[Testing Node applications - 0 - Introduction]]