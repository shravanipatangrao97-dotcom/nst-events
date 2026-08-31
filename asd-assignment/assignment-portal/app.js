const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

// POST /assignments - Create assignment
app.post('/assignments', async (req, res) => {
    try {
        const { title, deadline } = req.body;
        
        if (!title || !deadline) {
            return res.status(400).json({ message: 'Title and deadline are required' });
        }

        const query = `
            INSERT INTO assignments (title, deadline)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [title, deadline];
        const result = await pool.query(query, values);

        return res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating assignment:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /assignments - List assignments ordered by id DESC
app.get('/assignments', async (req, res) => {
    try {
        const query = `
            SELECT *
            FROM assignments
            ORDER BY id DESC;
        `;
        const result = await pool.query(query);
        return res.json(result.rows);
    } catch (err) {
        console.error('Error listing assignments:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
