# Folio Project Setup Guide

## Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

## Setup Instructions

### Step 1: Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Or download from:** https://www.postgresql.org/download/

### Step 2: Create Database

Open PostgreSQL terminal:
```bash
psql postgres
```

Then run:
```sql
CREATE DATABASE folio_db;
```

Exit with `\q`

### Step 3: Setup Backend

Navigate to backend folder:
```bash
cd backend
npm install
```

Update `.env` file with your PostgreSQL credentials:
```
DB_USER=postgres
DB_PASSWORD=your_password_here (if you set one during PostgreSQL installation)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=folio_db
```

Initialize the database with sample data:
```bash
node init-db.js
```

Start the backend server:
```bash
npm run dev
```

You should see: `Backend server running on http://localhost:5000`

### Step 4: Setup Frontend

In a new terminal, from the project root:
```bash
npm install
npm run dev
```

### Step 5: Access Your Portfolio

- **Home:** http://localhost:5173
- **Projects:** http://localhost:5173/projects
- **Project Detail:** http://localhost:5173/projects/1 (and so on)

## API Endpoints

The backend provides the following endpoints:

- `GET /api/projects` - Get all projects
- `GET /api/projects?filter=DESIGN` - Get filtered projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Adding/Editing Projects

You can add new projects by:

1. **Via Database (pgAdmin or psql):**
   ```sql
   INSERT INTO projects (title, category, filter_type, description, image_url, size, technologies, live_link, github_link)
   VALUES ('Your Project', 'Category', 'DESIGN', 'Description...', 'image_url', 'large', ARRAY['Tech1', 'Tech2'], 'http://...', 'http://...');
   ```

2. **Via API (future admin panel):**
   ```bash
   curl -X POST http://localhost:5000/api/projects \
     -H "Content-Type: application/json" \
     -d '{
       "title": "New Project",
       "category": "Design",
       "filter_type": "DESIGN",
       "description": "...",
       "image_url": "...",
       "size": "large",
       "technologies": ["React", "Node.js"],
       "live_link": "...",
       "github_link": "..."
     }'
   ```

## Troubleshooting

- **PostgreSQL connection error:** Check if PostgreSQL is running (`brew services list`)
- **Port 5000 already in use:** Change PORT in `.env` file
- **Port 5173 already in use:** Vite will automatically use next available port
- **Images not loading:** Make sure image URLs are valid and accessible

## Database Schema

The `projects` table includes:
- `id` - Primary key
- `title` - Project title
- `category` - Project category
- `filter_type` - For filtering (DESIGN, SECURITY, etc.)
- `description` - Full project description
- `image_url` - Project image URL
- `size` - Grid size (small, medium, large)
- `technologies` - Array of tech used
- `live_link` - Link to live project
- `github_link` - Link to GitHub repo
- `created_at` - Timestamp
- `updated_at` - Timestamp
