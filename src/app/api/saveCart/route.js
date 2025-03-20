import pool from './../../../../script/mysqldb';

export async function POST(req) {
    try {
        const body = await req.json(); // Get JSON data from request

        if (!body) {
            return new Response(JSON.stringify({ error: "No data provided" }), { status: 400 });
        }

        // Insert JSON into the Customer table with default status 'Pending'
        const [result] = await pool.query(
            "INSERT INTO Customer (Orders, Status) VALUES (?, 'Pending')",
            [JSON.stringify(body)] // Store JSON as a string
        );

        return new Response(JSON.stringify({ success: true, orderID: result.insertId }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to upload JSON" }), { status: 500 });
    }
}
