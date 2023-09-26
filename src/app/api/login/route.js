import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";
import { Console } from "console";

export async function POST(request) {
  let payload = await request.json();
  console.log(payload,'payloaddddddddddddds');

  if (!payload.password || !payload.username) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    // 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]
    const query = "SELECT * FROM Users WHERE email = $1 AND password = $2";
    // const values = [payload.email, payload.password];
    const values = [payload.username,payload.password];
    console.log(values,'valuesssssssssssssssssssssssssss')
    const client = await pool.connect();
    const result  = await client.query(query, values);
    console.log(result.rows,"result.rows")
    if (result.rows.length >= 1) {
      console.log(result.rows)
      return NextResponse.json(
        {
          data: result.rows,
          result: "Login Successfully",
          success: true
          },
        {status: 201}
      );
    } else {
      return NextResponse.json({ result: "Invalid username or Password", success: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}