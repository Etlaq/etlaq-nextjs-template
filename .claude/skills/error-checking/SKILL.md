---
name: error-checking
description: Verify Next.js app has no runtime errors by checking server logs and testing pages/routes with curl. Use after ANY code change to catch compilation, runtime, and API errors.
---

# Error Checking & Validation

## Quick Commands

```bash
# Check server logs for errors
tail -n 50 ./server.log

# Watch logs in real-time
tail -f ./server.log

# Test homepage
curl -I http://localhost:3000/

# Test specific page
curl -I http://localhost:3000/dashboard

# Test API route
curl http://localhost:3000/api/your-route

# Check status code only
curl -w "%{http_code}" -o /dev/null -s http://localhost:3000/
```

## Validation Workflow

**After ANY change** (components, API routes, database, auth):

1. **Check Logs**
```bash
tail -n 50 ./server.log
```
Look for:
- ✗ Compilation errors (TypeScript, syntax)
- ✗ Runtime errors (module not found, undefined)
- ✗ API route errors (500, auth failures)
- ✗ Database connection issues
- ✗ Next.js build warnings

2. **Test Pages**
```bash
# Should return HTTP/1.1 200 OK
curl -I http://localhost:3000/
curl -I http://localhost:3000/dashboard
curl -I http://localhost:3000/[your-page]
```

3. **Test API Routes**
```bash
# GET request
curl http://localhost:3000/api/users

# POST with data
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'

# With authentication
curl http://localhost:3000/api/protected \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Common Error Patterns

| Status | Meaning | Action |
|--------|---------|--------|
| 200 | Success | ✓ Page working |
| 404 | Not Found | Check file location in app/ |
| 500 | Server Error | Check server.log for stack trace |
| 401 | Unauthorized | Verify JWT token/auth middleware |
| 403 | Forbidden | Check ownership validation |

## Error-Specific Checks

### UI Components
```bash
# Check for TypeScript/import errors
tail -n 50 ./server.log | grep "error"

# Test page loads
curl -I http://localhost:3000/[page-with-component]
```

### API Routes
```bash
# Test endpoint returns expected status
curl -w "%{http_code}" -o /dev/null -s http://localhost:3000/api/route

# Test POST/PUT/DELETE
curl -X POST http://localhost:3000/api/route -H "Content-Type: application/json" -d '{}'
```

### Authentication
```bash
# Protected route without token (should return 401)
curl -I http://localhost:3000/api/protected

# Protected route with token (should return 200)
curl http://localhost:3000/api/protected -H "Authorization: Bearer TOKEN"
```

### Database
```bash
# Check MongoDB connection in logs
tail -n 50 ./server.log | grep -i "mongo"

# Test CRUD operations via API
curl http://localhost:3000/api/resource
curl -X POST http://localhost:3000/api/resource -H "Content-Type: application/json" -d '{"test":"data"}'
```

## Pre-Deployment Checklist

- [ ] No errors in server.log
- [ ] All pages return 200
- [ ] API routes respond correctly
- [ ] Auth protection works (401/403 as expected)
- [ ] Database queries succeed
- [ ] Forms validate properly
- [ ] Error boundaries catch errors

## When to Use This Skill

- After creating/modifying components
- After adding/updating API routes
- After database schema changes
- After authentication changes
- Before marking tasks complete
- Before committing code
- Before deployment

**NEVER complete a task without running these checks.**
