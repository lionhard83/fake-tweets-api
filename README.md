# fake-posts-api

### A simple use fake-posts-api

```typescript
GET /posts
/* returns all posts [{
  author:'caio',
  message: 'A message',
  image: 'src of image',
  likes: [],
  comments: []
}]*/

GET /posts?author=carloleonardi
/* returns all posts by carloleonardi */

GET /posts?word=Facebook
/* returns all posts that contains word Facebook */

GET /posts/1
/* returns a posts by Id = 1 */

POST /posts
/* create a posts, use body: { author:'carloleonardi', image: '...', message: 'A simple message' } */

POST /posts/1/comments
/* create a comments in post 1, use body: { author:'carloleonardi', imessage: 'A simple comment' } */

POST /posts/1/likes
/* create a comments in post 1, use body: { author:'carloleonardi', } */

DELETE /posts/1
/* delete a posts by id = 1 */

```
