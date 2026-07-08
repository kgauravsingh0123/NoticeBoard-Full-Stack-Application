# Notice Board CRUD Application

A full-stack Notice Board application built using **Next.js (Pages Router)**, **Prisma ORM**, **Neon PostgreSQL**, and **Tailwind CSS v4**. This project was developed as part of the Reno Platforms Web Development Assignment.




# Features

- Create a Notice
- View all Notices
- Edit existing Notices
- Delete Notices with confirmation modal
- Responsive design (Desktop & Mobile)
- Server-side validation
- Prisma ORM
- Neon PostgreSQL Database
- RESTful API Routes
- Urgent notices displayed first
- Optional image URL with preview

---

# Tech Stack

### Frontend

- Next.js (Pages Router)
- React
- TypeScript
- Tailwind CSS v4
- Axios

### Backend

- Next.js API Routes
- Prisma ORM

### Database

- Neon PostgreSQL

### Deployment

- Vercel

---

# Project Structure

```
noticeboard
│
├── components
│   ├── ConfirmModal.tsx
│   ├── Navbar.tsx
│   ├── NoticeCard.tsx
│   └── NoticeForm.tsx
│
├── lib
│   └── db.ts
│
├── pages
│   ├── api
│   │   └── notices
│   │       ├── index.ts
│   │       └── [id].ts
│   │
│   ├── notices
│   │   ├── index.tsx
│   │   ├── new.tsx
│   │   └── [id].tsx
│   │
│   ├── _app.tsx
│   │
│   └── index.tsx
│
├── prisma
│   └── schema.prisma
│
├── public
│
├── styles
│   └── globals.css
│
├── .env
├── package.json
└── README.md
```

---

# Database Schema

The application stores notices with the following fields:

| Field | Type |
|-------|------|
| title | String |
| body | String |
| category | Exam / Event / General |
| priority | Normal / Urgent |
| publishDate | Date |
| image | Optional String |

---

# API Routes

## Get all notices

```
GET /api/notices
```

Returns all notices ordered by priority.

---

## Get single notice

```
GET /api/notices/:id
```

Returns one notice.

---

## Create notice

```
POST /api/notices
```

Creates a new notice.

---

## Update notice

```
PUT /api/notices/:id
```

Updates an existing notice.

---

## Delete notice

```
DELETE /api/notices/:id
```

Deletes a notice after confirmation.

---

# Server-side Validation

Validation is implemented inside the API routes.

The API validates:

- Title is required
- Body is required
- Publish Date is valid
- Category value is valid
- Priority value is valid

If validation fails, appropriate HTTP status codes and error messages are returned.

---

# How to Run Locally

## Clone Repository

```bash
git clone https://github.com/yourusername/noticeboard.git
```

```bash
cd noticeboard
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL="your_supabase_pooler_connection"

DIRECT_URL="your_supabase_direct_connection"
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run Database Migration

```bash
npx prisma migrate dev --name init
```

---

## Start Development Server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

# Assignment Requirements Covered

- Full CRUD Operations
- Server-side Validation
- Prisma ORM
- Hosted Database
- Next.js Pages Router
- Responsive UI
- Delete Confirmation Modal
- REST API Design
- Urgent Notices Ordered First Using Prisma
- Public Deployment Ready

---

# One Improvement With More Time

If given more time, I would extend the application with:


- Pagination for large numbers of notices

- Authentication and role-based access control


---

# AI Usage

AI tools were used during development to:

- Took the help of AI for creating some frontend component not whole

- Explain Next.js Pages Router concepts


All generated code was reviewed, modified, integrated, and tested manually before submission.

---

# Author

**Kumar Gaurav**

B.Tech (Information Technology)

Full Stack Developer
