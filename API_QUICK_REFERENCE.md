# API Quick Reference

## Authentication
```javascript
// Login
POST /api/auth/login
Body: { "code": "raghavdwd2005", "ip": "127.0.0.1" }

// Use token in headers
Authorization: Bearer <token>
```

## Endpoints

### Create Short URL
```javascript
POST /api/short-url/generate
Headers: Authorization
Body: {
  "contentType": "url",
  "content": "https://example.com",
  "slug": "optional" // auto-generated if omitted
}
Response: { success: true, data: { slug: "abc123", shortUrl: "..." } }
```

### List URLs
```javascript
GET /api/short-url/list
Headers: Authorization
Response: { success: true, data: [/* array of urls */] }
```

### Delete URL
```javascript
DELETE /api/short-url/{slug}
Headers: Authorization
Response: { success: true, message: "Short URL deleted" }
```

### Access Short URL
```javascript
GET /{slug}
// Redirects to original URL
```

## Common Response Patterns
```javascript
// Success
{ success: true, message: "...", data: {...} }

// Error
{ success: false, message: "..." }
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error