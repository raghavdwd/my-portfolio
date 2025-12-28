# Short URL API Documentation

## Base URL

```
http://localhost:3000
```

## Authentication

All API endpoints (except login and `GET /api/short-url/:slug`) require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All responses follow this structure:

```json
{
  "success": boolean,
  "message": string,
  "data": object (optional)
}
```

---

## Authentication Endpoints

### POST /api/auth/login

Authenticate user and receive JWT token.

**Request Body:**

```json
{
  "code": "raghavdwd2005",
  "ip": "127.0.0.1"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**

```json
{
  "success": false,
  "message": "Invalid code"
}
```

---

## Short URL Endpoints

### POST /api/short-url/generate

Create a new short URL. Requires authentication.

**Request Body:**

```json
{
  "contentType": "url",
  "content": "https://www.example.com",
  "slug": "optional-custom-slug"
}
```

**Parameters:**

- `contentType` (required): Type of content ("url" for URLs)
- `content` (required): The original URL or content
- `slug` (optional): Custom slug. If not provided, auto-generated using nanoid

**Success Response (201):**

```json
{
  "success": true,
  "message": "Short URL created",
  "data": {
    "slug": "abc12345",
    "shortUrl": "http://localhost:3000/abc12345"
  }
}
```

**Error Responses:**

- **400 Bad Request:** Missing required fields or slug already exists

```json
{
  "success": false,
  "message": "Content type and content are required"
}
```

- **401 Unauthorized:** Missing or invalid JWT token
- **500 Internal Server Error:** Server/database error

### GET /api/short-url/list

Get all short URLs created by the authenticated user.

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "contentType": "url",
      "content": "https://www.google.com",
      "slug": "abc12345",
      "createdAt": "2025-12-28T10:30:00.000Z"
    },
    {
      "contentType": "url",
      "content": "https://www.github.com",
      "slug": "github",
      "createdAt": "2025-12-28T10:35:00.000Z"
    }
  ]
}
```

**Error Responses:**

- **401 Unauthorized:** Missing or invalid JWT token
- **500 Internal Server Error:** Server/database error

### DELETE /api/short-url/:slug

Delete a specific short URL owned by the authenticated user.

**URL Parameters:**

- `slug`: The slug of the short URL to delete

**Success Response (200):**

```json
{
  "success": true,
  "message": "Short URL deleted"
}
```

**Error Responses:**

- **401 Unauthorized:** Missing or invalid JWT token
- **404 Not Found:** Short URL not found or doesn't belong to user
- **500 Internal Server Error:** Server/database error

### GET /api/short-url/:slug

Retrieve details for a short URL. No authentication required.

**URL Parameters:**

- `slug`: The slug of the short URL to fetch

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "slug": "github",
    "contentType": "url",
    "content": "https://www.github.com",
    "shortUrl": "http://localhost:3000/github",
    "createdAt": "2025-12-28T10:35:00.000Z"
  }
}
```

**Error Responses:**

- **404 Not Found:** Short URL not found
- **500 Internal Server Error:** Server/database error

---

## Analytics Endpoints

### GET /api/analytics/summary

Get aggregate analytics for the authenticated user's links.

**Headers:**

- `Authorization: Bearer <token>`

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "totalLinks": 12,
    "totalVisits": 340,
    "byType": [
      { "contentType": "url", "count": 10, "visits": 320 },
      { "contentType": "text", "count": 2, "visits": 20 }
    ],
    "topLinks": [
      {
        "slug": "github",
        "contentType": "url",
        "content": "https://www.github.com",
        "visits": 120,
        "createdAt": "2025-12-28T10:35:00.000Z",
        "lastAccessedAt": "2025-12-28T11:10:00.000Z"
      }
    ]
  }
}
```

**Error Responses:**

- **401 Unauthorized:** Missing or invalid JWT token
- **500 Internal Server Error:** Server/database error

### GET /api/analytics/:slug

Get analytics for a specific link owned by the authenticated user.

**URL Parameters:**

- `slug`: The slug to fetch analytics for

**Headers:**

- `Authorization: Bearer <token>`

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "slug": "github",
    "contentType": "url",
    "content": "https://www.github.com",
    "visits": 120,
    "createdAt": "2025-12-28T10:35:00.000Z",
    "updatedAt": "2025-12-28T11:15:00.000Z",
    "lastAccessedAt": "2025-12-28T11:15:00.000Z",
    "lastAccessedIp": "127.0.0.1"
  }
}
```

**Error Responses:**

- **401 Unauthorized:** Missing or invalid JWT token
- **404 Not Found:** Short URL not found or not owned by user
- **500 Internal Server Error:** Server/database error

---

## Public Endpoints

### GET /:slug

Redirect to the original content or return content data.

**URL Parameters:**

- `slug`: The short URL slug

**Behavior:**

- If `contentType` is "url": Redirects (302) to the original URL
- If other content types: Returns JSON with content data

**Success Response for URLs (302 Redirect):**

```
HTTP/1.1 302 Found
Location: https://www.example.com
```

**Success Response for other content (200):**

```json
{
  "success": true,
  "data": {
    "contentType": "text",
    "content": "Some text content",
    "slug": "mytext",
    "createdAt": "2025-12-28T10:30:00.000Z"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "Short URL not found"
}
```

### GET /api

Health check endpoint.

**Response (200):**

```json
{
  "message": "Api is running"
}
```

---

## JavaScript Examples

### Authentication

```javascript
// Login and get token
const login = async () => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: "raghavdwd2005",
      ip: "127.0.0.1",
    }),
  });

  const data = await response.json();
  if (data.success) {
    localStorage.setItem("token", data.token);
  }
  return data;
};
```

### Create Short URL

```javascript
const createShortUrl = async (originalUrl, customSlug = null) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/short-url/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      contentType: "url",
      content: originalUrl,
      slug: customSlug,
    }),
  });

  return await response.json();
};
```

### List User's URLs

```javascript
const getUserUrls = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/short-url/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};
```

### Delete URL

```javascript
const deleteUrl = async (slug) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/api/short-url/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};
```

---

## Error Handling

Always check the `success` field in responses:

```javascript
const handleApiResponse = (response) => {
  if (response.success) {
    // Handle success
    console.log("Success:", response.data);
  } else {
    // Handle error
    console.error("Error:", response.message);
  }
};
```

## Rate Limiting

Currently no rate limiting is implemented. Consider implementing client-side throttling for production use.

## Content Types

Currently supports:

- `"url"`: For URL redirection
- Other types may be added in the future

## Security Notes

- JWT tokens are long-lived (no expiration set)
- Store tokens securely (localStorage is used in examples but consider more secure storage)
- Validate all user inputs on the frontend before sending to API
