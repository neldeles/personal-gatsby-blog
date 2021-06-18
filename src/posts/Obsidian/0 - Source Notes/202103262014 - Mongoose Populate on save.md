---
aliases:
- 'populate on save'
tags: ['mongodb', 'mongoose']
references:
- 'https://github.com/Automattic/mongoose/issues/1928'
---

# `Populate` on save
Problem: After creating a comment/post, the value in the new state was just the `id` i.e. the `populate` that occures with the `GET` endpoint was not happening.

This is our desired output:
```js
{
    "likes": 46,
    "comments": [
        {
            "content": "awesome content hehehe",
            "id": "605db41a2dd7c3758c396ded"
        },
        {
            "content": "highly recommended hehehe",
            "id": "605db48ba2f0be75cec3bcda"
        },
    ],
    "title": "woof",
    "url": "testing.com",
    "author": "testing",
    "user": "6034d4f7bedbbc70f69bd0df",
    "id": "6039bee8dc615a1c278e456e"
}
```

This was the reality:
```js
{
    "likes": 46,
    "comments": [
			"605db41a2dd7c3758c396ded",
			"605db48ba2f0be75cec3bcda",
    ],
    "title": "woof",
    "url": "testing.com",
    "author": "testing",
    "user": "6034d4f7bedbbc70f69bd0df",
    "id": "6039bee8dc615a1c278e456e"
}
```

## Solution
Solution is to populate on save.

Old code:
```js
blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { body } = request
  const blogID = request.params.id

  try {
    const comment = new Comment({
      content: body.content,
    })

    const blog = await Blog.findById(blogID)

    const result = await comment.save()
    blog.comments = blog.comments.concat(result._id)
    await blog.save()

    return response.status(201).json(blog)
  } catch (exception) {
    return next(exception)
  }
})

```

Correct code:
```js
blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { body } = request
  const blogID = request.params.id

  try {
    const comment = new Comment({
      content: body.content,
    })

    const blog = await Blog.findById(blogID)

    const result = await comment.save()
    blog.comments = blog.comments.concat(result._id)
    await blog.save()

    const newBlog = await blog
      .populate('comments', { content: 1 })
      .execPopulate()
    return response.status(201).json(newBlog)
  } catch (exception) {
    return next(exception)
  }
})
```

# Footer
---
Related: 