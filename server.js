import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:8080",  
  credentials: true
}));
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "24June1987",
  database: process.env.DB_NAME || "Bits",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database.");
  }
});

// === ROUTES ===

// Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("❌ Database query error:", err);
      return res.status(500).json({ message: "Server error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found." });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    return res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, username: user.username },
    });
  });
});

// Signup Route
app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if email already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("❌ Database query error:", err);
      return res.status(500).json({ message: "Server error." });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email already exists." });
    }

    // Insert user
    db.query(
      "INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)",
      [username, email, password, username], // You can set `name` same as `username` or whatever value you want
      (insertErr, insertResults) => {
        if (insertErr) {
          console.error("Database insert error:", insertErr);
          return res.status(500).json({ message: "Server error." });
        }
    
        return res.status(201).json({
          message: "Sign up successful",
          user: { id: insertResults.insertId, username, email },
        });
      }
    );
  }); 
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
