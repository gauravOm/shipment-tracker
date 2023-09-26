"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("driver"); // Default role
  const router = useRouter();

  const handleUserRegistration = async () => {
    debugger;
    const userData = { username, email, password, role };

    try {
      const response = await fetch("/api/register", {
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
          title: "Registered Successfully",
        });
        // Redirect to a success page or login page
        router.push("/login");
      } else {
        // Handle registration failure
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: data.result,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <div className="font-sans antialiased bg-grey-lightest">
        <div className="w-full bg-grey-lightest" style={{ paddingtop: "4rem" }}>
          <div className="container mx-auto py-8">
            <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
              <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                Register for Shipment Tracking
              </div>
              <div className="py-4 px-8">
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="first_name"
                  >
                    {" "}
                    Name
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="first_name"
                    type="text"
                    placeholder="Your first name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required // Make the field mandatory
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required // Make the field mandatorytype="email" placeholder="Your email address"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your secure password"
                  />
                  <p className="text-grey text-xs mt-1">
                    At least 6 characters
                  </p>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded-full"
                    onClick={handleUserRegistration}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
            <p className="text-center my-4">
              <Link
                href="/login"
                className="text-grey-dark text-sm no-underline hover:text-grey-darker "
              >
                {" "}
                I already have an account
              </Link>
            </p>
          </div>
        </div>
        <footer className="w-full bg-grey-lighter py-8">
          <div className="container mx-auto text-center px-8">
            <p className="text-grey-dark mb-2 text-sm">
              This is a product of <span className="font-bold">Gaurav Binda Corp.</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
