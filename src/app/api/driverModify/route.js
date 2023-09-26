import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function POST(request) {
  let payload = await request.json();
  console.log(payload, "payloaddddddddddddds");
  let query;
  let values;
  if (payload.role == "ADMIN") {
    values = [payload.role, payload.userid];

    query = `update users set
    role = '${payload.role}' ,
    driverid =  null
    where userid = ${payload.userid}`;
  } else {
    query = `
    WITH UpdatedUser AS (
        UPDATE USERS
        SET
        role = '${payload.role}'
        where userid = ${payload.userid}
        RETURNING driverid
    ),
    UpdatedDriver AS (
      UPDATE drivers SET
      vehicleNumber = '${payload.vehiclenumber}', 
        licenseNumber = '${payload.licensenumber}',
         contactNumber= '${payload.contactnumber}'
         WHERE driverid = ${payload.userid}
    )
    SELECT 1;
    `;
    values = [payload.email, payload.password];
  }

  console.log(JSON.stringify(values), "jsooooooooon");

  try {
    const client = await pool.connect();
    const result = await client.query(query);

    if (result.rowCount >= 1) {
      return NextResponse.json(
        {
          data: result.rows,
          result: "Updated Successfully",
          success: true,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { result: "Invalid Data", success: false },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json(
      { result: "Database error", success: false },
      { status: 500 }
    );
  }
}
