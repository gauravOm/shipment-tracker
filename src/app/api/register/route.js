// import db from '../../db'; // Import your database connection

// export default async (req, res) => {
//     debugger;
//   if (req.method === 'POST') {
//     const { username, password, email, role } = req.body;

//     try {
//       // Perform user registration and insert data into the database
//       await db.none(
//         'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4)',
//         [username, password, email, role]
//       );

//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       console.error('Error registering user:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   } else {
//     res.status(405).end(); // Method not allowed
//   }
// };

import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";
import bcrypt from 'bcrypt';

export async function POST(request) {
  debugger;
  let payload = await request.json();
  console.log(payload.email, 'email');
  
  if (!payload.email || !payload.password || !payload.username || !payload.role) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const query = `
    WITH DRIVER_INSERT AS (
      INSERT INTO Drivers (vehicleNumber, licenseNumber, contactNumber)
      VALUES (null, null, null)
      RETURNING driverid
    )
    INSERT INTO Users (username, email, password, role, driverid)
    SELECT $1, $2, $3, $4::VARCHAR, DRIVER_INSERT.driverid
    FROM DRIVER_INSERT
    WHERE $4 = 'driver'::VARCHAR`;
  
    const values = [payload.username, payload.email, hashedPassword, payload.role];
    console.log(values[3], 'values')
    const client = await pool.connect();
    // if(values[0])
    if(values[3] === 'driver'){
    const rows = await client.query(query, values);
    
    console.log(rows.rowCount,"arr")

    if (rows.rowCount === 1) {
      console.log(values);
      return NextResponse.json(
        {
          values: values,
          result: "Driver Registered Successfully",
          success: true

        },
        { status: 201 }
      );

    } else {
      return NextResponse.json({ result: "Enter Correct Data", success: false }, { status: 404 });
    }
  }
  // else if(values[3] === 'admin'){
  //   const rows2 = await client.query(query2, values);
    
  //   console.log(rows2.rowCount,"arrrr")

  //   if (rows2.rowCount === 1) {
  //     console.log(values);
  //     return NextResponse.json(
  //       {
  //         values: values,
  //         result: " Admin Registered Successfully",
  //         success: true

  //       },
  //       { status: 201 }
  //     );

  //   } else {
  //     return NextResponse.json({ result: "Enter Correct Data", success: false }, { status: 404 });
  //   }
  // }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}