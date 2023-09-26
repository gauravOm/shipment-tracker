"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {useSession} from 'next-auth/react';


export default function Page() {
  const [customerName, setcustomerName] = useState("");
  const [destinationAddress, setdestinationAddress] = useState("");
  const [driverId, setdriverId] = useState("");
  const [plannedDeliveryDate, setplannedDeliveryDate] = useState("driver"); // Default role
  const router = useRouter();

  const [userRole, setuserRole] = useState('');
  const [items, setitems] = useState(false);

  const {data} = useSession()
  console.log(data,"dataa from");
  useEffect(() => {
    if(data == undefined){
        console.log("  setuserRole(data.user.role)")
        router.push("/login");
      }else{
          setuserRole(data.user.role)
      }
  }, [items]);

  const AddShipment = async () => {
    debugger;
    const userData = { customerName, destinationAddress, driverId, plannedDeliveryDate };

    try {
      const response = await fetch("/api/addShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        // Registration successful
        const data = await response.json();
        console.log("User registered successfully", data);
        Swal.fire({
          icon: "success",
          title: "Shipment added Successfully",
        });
        // Redirect to a success page or login page
        // router.push("/login");
      } else {
        // Handle registration failure
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Shipment failed",
          text: data.result,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
//   if(!data){
//     // router.push("/login");
//   }
//   else{
    return (
        <>
          <div className="font-sans antialiased bg-grey-lightest">
            <div className="w-full bg-grey-lightest" style={{ paddingtop: "4rem" }}>
              <div className="container mx-auto py-8">
                <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
                  <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                    Add Shipment
                  </div>
                  <div className="py-4 px-8">
                    <div className="mb-4">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="first_name"
                      >
                        {" "}
                        Customer Name
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="first_name"
                        type="text"
                        placeholder="Your first name"
                        value={customerName}
                        onChange={(e) => setcustomerName(e.target.value)}
                        required // Make the field mandatory
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Destination Address
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="text"
                        value={destinationAddress}
                        onChange={(e) => setdestinationAddress(e.target.value)}
                        required // Make the field mandatorytype="email" placeholder="Your email address"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Assigned Driver ID
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        type="text"
                        value={driverId}
                        onChange={(e) => setdriverId(e.target.value)}
                        placeholder="Please Enter Correct Driver Id"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Planned Delivery Date
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        type="date"
                        value={plannedDeliveryDate}
                        onChange={(e) => setplannedDeliveryDate(e.target.value)}
                        placeholder="Your secure password"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-8">
                      <button
                        className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded-full"
                        onClick={AddShipment}
                      >
                        Add Shipment{" "}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-center my-4">
                  <Link
                    href="/dashboard"
                    className="text-grey-dark text-sm no-underline hover:text-grey-darker underline"
                  >
                    {" "}
                    Back to All Shipment
                  </Link>
                </p>
              </div>
            </div>
            <footer className="w-full bg-grey-lighter py-8">
              <div className="container mx-auto text-center px-8">
                <p className="text-grey-dark mb-2 text-sm">
                  This is a product of <span className="font-bold">Binda Corp</span>
                </p>
              </div>
            </footer>
          </div>
        </>
      );
 
 
}
