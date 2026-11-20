const express = require("express");
const { Pool } = require("pg");

const app = express();
const cors = require("cors");
app.use(express.json());
const PORT = 3000;

const pool = new Pool({
    host: process.env.DB_HOST || "postgres-db",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "appuser",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "appdb"
});

app.use(cors({
    origin: "http://localhost:8085"
}));



app.get("/api", (req, res) => {
    res.json({
        message: "Hello from Node.js Backend!",
        project: "Docker Three-Tier Application"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW() AS current_time");

        res.json({
            message: "Node.js connected to PostgreSQL successfully!",
            database_time: result.rows[0].current_time
        });
    } catch (error) {
        console.error("Database connection error:", error.message);
        res.status(500).json({
            error: "Database connection failed"
        });
    }
});

// Add a new user
app.post("/api/users", async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                error: "Name and email are required"
            });
        }

        const result = await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Could not create user" });
    }
});

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Could not retrieve users" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
