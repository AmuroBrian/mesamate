import mysql from 'mysql2/promise';

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: "192.168.100.90",
    port: 3307, // Your XAMPP MySQL host
    user: "root",      // Your MySQL username (default in XAMPP is 'root')
    password: "",      // Your MySQL password (default in XAMPP is empty)
    database: "mesamate", // Change this to your actual database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
