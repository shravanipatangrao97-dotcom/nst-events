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

// GET /assignments - List assignments (supports ?submitted=true/false)
app.get('/assignments', async (req, res) => {
    try {
        const { submitted } = req.query;

        if (submitted !== undefined) {
            if (submitted !== 'true' && submitted !== 'false') {
                return res.status(400).json({ message: "Invalid value for submitted parameter. Expected 'true' or 'false'." });
            }

            const isSubmitted = submitted === 'true';
            const query = `
                SELECT *
                FROM assignments
                WHERE submitted = $1
                ORDER BY id DESC;
            `;
            const result = await pool.query(query, [isSubmitted]);
            return res.json(result.rows);
        }

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

// PATCH /assignments/:id - Mark assignment as submitted
app.patch('/assignments/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            UPDATE assignments
            SET submitted = true
            WHERE id = $1
            RETURNING *;
        `;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        return res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating assignment:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /assignments/:id - Delete assignment
app.delete('/assignments/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            DELETE FROM assignments
            WHERE id = $1
            RETURNING *;
        `;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        return res.json({
            message: 'Assignment deleted successfully',
            assignment: result.rows[0]
        });
    } catch (err) {
        console.error('Error deleting assignment:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
