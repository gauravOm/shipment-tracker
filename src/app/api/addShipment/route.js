import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function POST(request) {
  debugger;
  let data = await request.json();
  console.log(data,'email');

  if (!data.customerName || !data.destinationAddress || !data.plannedDeliveryDate) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    // 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]
    const query = "INSERT INTO shipments (customername,destinationaddress,assigneddriverid,planneddeliverydate) VALUES ($1, $2, $3, $4)";
    const values = [data.customerName, data.destinationAddress,data.driverId,data.plannedDeliveryDate];
    const client = await pool.connect();
    const rows  = await client.query(query, values);
 

    if (rows.rowCount === 1) {
      console.log(values);
      return NextResponse.json(
        {
          values: values,
          result: "Shipment Added Successfully",
          success: true
          
        },
        { status: 201}
      );

    } else {
      return NextResponse.json({ result: "Enter Correct Data", success: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}