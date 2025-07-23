# Google Drive file uploader

An API that enables clients to upload files from URLs to Google Drive. This project is developed as a test assignment for OBRIO.

Technology stack: NestJS, PostgreSQL, BullMQ, Redis, Nginx, and Docker.

```
POST /files/upload
{ files: Array<string> }

>> { success: boolean }
```

File list: view uploaded files
```
GET /files/list

>> { Array<{ id: number, name: string, driveUrl: string, createdAt: string }> }
``` 

Auth: initial authentication with Google services
```
GET /google/auth
```

## Requirements

- Docker
- Docker Compose
- Node.js (for local development)
- Postgres
- Redis
- BullMQ
- Nginx (for production)
- Google Cloud Platform account with Drive API enabled

## Starting in local production mode

Create a .env.production file in the root directory with the following variables:

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://{YOUR_HOST}/google/auth
DATABASE_HOST=postgres
REDIS_HOST=redis
```

Start application with Docker Compose:

```
docker-compose up -d
```

Open http://localhost/google/auth in your browser to authenticate with Google services.

After authentication, you can use the API endpoints to upload files and view the list of uploaded files.
