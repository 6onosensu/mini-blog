# 📝 Mini Blog Platform

A fullstack blog platform built with **NestJS** (backend) and **React + TypeScript + Tailwind CSS** (frontend).

---

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Auth**: JWT-based (Admin / Guest roles)
- **Dev Setup**: Monorepo with `concurrently`

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/6onosensu/mini-blog.git
cd mini-blog
```


### 2. Install dependencies
#### Root (for dev scripts)

```bash
npm install
```

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

## 🧪 Development
### From the project root:

```bash
npm run dev
```

#### This will start:
Frontend on http://localhost:3000
Backend on http://localhost:3001 (default)

## 🛠 Features (MVP)
 User registration & login (JWT)
 Roles: Admin (can post), Guest (read-only)
 CRUD for blog posts (title, content, tags)
 Filter posts by tag
 Comments (optional)
 Rich text editor (e.g., React Quill)
 Pagination or infinite scroll

## 📁 Project Structure
mini-blog/
├── backend/     # NestJS API
├── frontend/    # React UI
└── package.json # Dev scripts & concurrently

## 📜 Scripts

npm run dev             # Run frontend and backend together
npm run start:frontend  # Run only React
npm run start:backend   # Run only NestJS


📃 License
MIT © Darja Suhhanova
