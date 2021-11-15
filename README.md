
# Blog APIs

The project has created basic and common APIs that a blog needs them. 

## API Reference

#### Post register attributes

```http
  POST /api/v1/auth/register
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your username. |
| `password` | `string` | **Required**. Your password. |
| `email` | `string` | **Required**. Your email. |
| `name` | `string` | **Optional**. Your name for using on post details. |

#### Post login attributes

```http
  POST /api/v1/auth/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your username. |
| `password` | `string` | **Required**. Your password. |

You will get a JWT token in response that will be used for authorization on following APIs.

#### Post a new content

```http
  POST /api/v1/content/add-post
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of the post. |
| `body`      | `string` | **Required**. Body of the post. |
| `tags`      | `array` | **Required**. Delected tags for the post. |
| `categories`      | `array` | **Required**. Selected categories for the post. |

| Headers | Value     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `JWT ${TOKEN}` | **Required**. The token that has been generated on the login step. |

#### Get all posts

```http
  GET /api/v1/content/posts
```

This endpoint will return all created blog posts

```http
  GET /api/v1/content/post/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. The id of one of the exists posts. |

#### Update a post

```http
  PUT /api/v1/content/post/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. The id of one post. |

| Headers | Value     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `JWT ${TOKEN}` | **Required**. The token that has been generated on the login step. |


#### Delete a post

```http
  DELETE /api/v1/content/post/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. The id of one post. |

| Headers | Value     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `JWT ${TOKEN}` | **Required**. The token that has been generated on the login step. |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_ADDRESS`

`DB_USER`

`DB_PASS`

`PORT`

`JWT_PRIVATE_KEY`
## Run Locally

Clone the project

```bash
  git clone https://github.com/mhadikz/Blog-Node.js-Express-MongoDB
```

Go to the project directory

```bash
  cd Blog-Node.js-Express-MongoDB
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Tech Stack

**Server:** Node, Express, MongoDB, Mongoose, JsonWebToken
