"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import {useSession} from 'next-auth/react';

export default function Page() {
     const [userRole, setuserRole] = useState('');
    const [items, setitems] = useState(false);

    const {data} = useSession()
    console.log(data,"dataa from");
    useEffect(() => {
        if(data == undefined){
          console.log("setuserRole(data.user.role)")
        //   router.push("/login");
        }else{
            setuserRole(data.user.role)
            // router.push("/dashboard");
        }
        
    }, [items]);
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState('')




const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        console.log(res)
debugger
        if (!res.error) {
            console.log(res,'INSIDE')
            router.replace('dashboard');
        } else {
            
            Swal.fire({
                icon: "error",
                title: "Invalid Credentials",
                text: data.result,
              });
            console.log(res,'FAILED')
            setError('Invalid Credentials');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

  return (
    <>
      <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <a >Shipment Tracker</a>
            </div>
            <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
              With the power of Shipment Tracker, you can now focus only on
              functionaries htmlFor your shipments, while leaving the Management
              on US!
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Don't have an account?</span>
              <Link className="underline" href="/register">
                {" "}
                Get Started!
              </Link>
            </p>
            <p className="mt-6 text-sm text-center text-gray-300">
              Read our{" "}
              <a  className="underline">
                terms
              </a>{" "}
              and{" "}
              <a  className="underline">
                conditions
              </a>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              Account Login
            </h3>
            <div  className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-500"
                >
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                  <a
                    className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
           
              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


