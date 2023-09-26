import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function POST(request) {
  let payload = await request.json();
  console.log(payload, "payloaddddddddddddds");
  let query;
  let values;
  if (payload.cse == "DELETE") {
    // values = [payload.role, payload.userid];

    query = `DELETE FROM SHIPMENTS where shipment_id = ${payload.id}`;
    console.log(query)
  } else if (payload.cse == "UPDATE") {
    query = `
        UPDATE SHIPMENTS
        SET
        customername = '${payload.customername}',
        assigneddriverid = '${payload.assigneddriverid}',
        destinationaddress = '${payload.destinationaddress}',
        shipmentstatus = '${payload.shipmentstatus}',
        planneddeliverydate = '${payload.planneddeliverydate}'
        where shipment_id = ${payload.shipment_id}
    `;
    values = [payload.email, payload.password];
  }
  else if(payload.cse == "STATUS_UPDATE"){
     query=`update SHIPMENTS set shipmentstatus='${payload.status}' WHERE shipment_id = ${payload.id};`
     console.log(query)
  }

  console.log(JSON.stringify(values),"jsooooooooon")

 

  try {
  
    const client = await pool.connect();
    const result = await client.query(query);
    console.log(result,'rowuiodhu   result    ==============iofhioudhfuiojhf');
   

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
