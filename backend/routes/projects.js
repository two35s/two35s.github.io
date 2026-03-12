import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all projects with optional filtering
router.get('/', async (req, res) => {
  try {
    const { filter } = req.query;
    let query = 'SELECT * FROM projects ORDER BY created_at DESC';
    let params = [];

    if (filter && filter !== 'ALL') {
      query = 'SELECT * FROM projects WHERE filter_type = $1 ORDER BY created_at DESC';
      params = [filter];
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create new project (admin only - optional authentication)
router.post('/', async (req, res) => {
  try {
    const { title, category, filter_type, description, image_url, size, technologies, live_link, github_link } = req.body;

    const result = await pool.query(
      'INSERT INTO projects (title, category, filter_type, description, image_url, size, technologies, live_link, github_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, category, filter_type, description, image_url, size, technologies, live_link, github_link]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, filter_type, description, image_url, size, technologies, live_link, github_link } = req.body;

    const result = await pool.query(
      'UPDATE projects SET title = $1, category = $2, filter_type = $3, description = $4, image_url = $5, size = $6, technologies = $7, live_link = $8, github_link = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *',
      [title, category, filter_type, description, image_url, size, technologies, live_link, github_link, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
