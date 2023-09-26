import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function GET() {


  try {
    
    const query = "select * from users ";

    const client = await pool.connect();
    const result  = await client.query(query);


    if (result.rows.length >= 1) {
      return NextResponse.json(
        {
          data: result.rows,
          result: "users Searched Successfully",
          success: true
          },
        {status: 201}
      );


    } else {
      return NextResponse.json({ result: "failed to load users", success: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}