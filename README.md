# fake-tweets-api

### A simple use fake-tweets-api

```typescript
GET /tweets
/* returns all tweets [{
  author:'caio',
  message: 'A message'
}]*/

GET /tweets?author=carloleonardi
/* returns all tweets by carloleonardi */

GET /tweets?word=Facebook
/* returns all tweets that contains word Facebook */

GET /tweets/1
/* returns a tweets by Id = 1 */

POST /tweets
/* create a tweets, use body: { author:'carloleonardi', message: 'A simple message' } */

DELETE /tweets/1
/* delete a tweets by id = 1 */

```
