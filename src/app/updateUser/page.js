"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import {useSession} from 'next-auth/react';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [userRole, setuserRole] = useState('');
    const [items, setitems] = useState(false);

    let {data} = useSession()
    console.log(data,"dataa from");
    useEffect(() => {
        if(data == undefined){
            console.log("  setuserRole(data.user.role)")
          }else{
              setuserRole(data.user.role)
          }
    }, [items]);
  const [role, setRole] = useState("ADMIN");
  const [shipmentData, setshipmentData] = useState([
    {
      userid: "userid",
      username: "customername",
      email: "email",
      role: "role",
    },
  ]);
  const logout = () => {
    data = undefined;
    router.push("/login");
  };
  const [vehiclenumber, setvehiclenumber] = useState("");
  const [licensenumber, setlicensenumber] = useState("");
  const [contactnumber, setcontactnumber] = useState("");

  const [driverData, setdriverData] = useState({
    vehiclenumber: "",
    licensenumber: "",
    contactnumber: "",
  });
//   const [items, setitems] = useState(false);
//   const [userRole, setuserRole] = useState("");
//   useEffect(() => {
//     setuserRole(sessionStorage.role);
//   }, [items]);
  const [selectedUser, setSelectedUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const customStyles = {
    overlay: {
      backgroundColor: "#55bf139c",
    },

    // top: "50%",
    //   left: "50%",
    //   right: "50%",
    //   bottom: "5%",
    //   marginRight: "-50%",
    //   transform: "translate(-50%, -50%)",
    //       width: '500px'

    content: {
      overflowX: "scroll",
    },
  };
  const [apiCalled, setApiCalled] = useState(false);

  const setdata = () => {
    setUsername(selectedUser.username);
    setRole(role);
  };

  const getUserList = async () => {
    try {
      const res = await fetch(`/api/allusers`);
      const data = await res.json();
      console.log(data.data);
      setshipmentData(data.data);
      setApiCalled(true);
    } catch (err) {
      console.log("error in catch block");
    }
  };

  const updateUserRole = async () => {
    debugger;
    let userData = { vehiclenumber, licensenumber, contactnumber };

    setdriverData(vehiclenumber, licensenumber, contactnumber);

    if (role == "ADMIN") {
      userData = { userid: selectedUser.userid, role: role };
    } else {
      setRole("DRIVER");
      userData = { ...userData, ...selectedUser, role };
    }
    console.log(userData);
    try {
      const response = await fetch("/api/driverModify", {
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
          title: "Role Updated Successfully",
        });
        // Redirect to a success page or login page
        // router.push("/login");
      } else {
        // Handle registration failure
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: data.result,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  useEffect(() => {
    if (!apiCalled) {
      getUserList();
    }
  }, [apiCalled]);

  return (
    <>
      <div className="flex flex-col  justify-between p-24">
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center">
              <img
                src="icons8-favicon-94.png"
                className="h-8 mr-3"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Shipment Tracker
              </span>
            </a>
            <div className="flex md:order-2">
              {(() => {
                if (userRole == "ADMIN") {
                  return (
                    <>
                      <button
                        type="button"
                        onClick={logout}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Admin Log Out
                      </button>
                    </>
                  );
                } else {
                  return (
                    <button
                      type="button"
                      onClick={logout}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Driver Log Out
                    </button>
                  );
                }
              })()}

              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokelinecapp="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    href="/dashboard"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  >
                    All Shipments
                  </Link>
                </li>
               
                {(() => {
                if (userRole == "ADMIN") {
                  return (
                    <>
                   <li>
                  
                  <Link
                    href="/shipment"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  >
                    Add Shipment
                  </Link>
                </li>
                    </>
                  );
                } 
              })()}
                <li>
                  <Link
                    href="/updateUser"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  >
                    All Users
                  </Link>
                </li>
               
              </ul>
            </div>
          </div>
        </nav>
        <div className="text-center text-green-dark font-bold">All Users</div>
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr
                className="bg-gray-300 text-gray-700"
                style={{ backgroundColor: "#8ae736" }}
              >
                <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                  User ID
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                  User Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                  Role
                </th>
                {(() => {
                  if (userRole == "ADMIN") {
                    return (
                      <>
                        <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                          Modify Role
                        </th>
                      </>
                    );
                  }
                })()}

                
              </tr>
            </thead>
            <tbody>
              {shipmentData.map((shipment) => (
                <tr key={shipment.shipment_id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm sm:text-center">
                    {shipment.userid}
                  </td>
                  <td className="px-6 py-4 text-sm sm:text-center">
                    {shipment.username}
                  </td>
                  <td className="px-6 py-4 text-sm sm:text-center">
                    {shipment.email}
                  </td>
                  <td className="px-6 py-4 text-sm sm:text-center">
                    {shipment.role}
                  </td>

                  {(() => {
                    if (userRole == "ADMIN") {
                      return (
                        <>
                          <td className="px-6 py-4 text-sm sm:text-center">
                            {" "}
                            <button
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-right dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() => {
                                setIsOpen(true);
                                setSelectedUser(shipment);
                              }}
                            >
                              Modify Role
                            </button>
                          </td>
                        </>
                      );
                    }
                  })()}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>

          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Update User Role and Details
              </h3>
              <div className="space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={selectedUser.username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    value={selectedUser.email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>

                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="DRIVER">DRIVER</option>
                  </select>
                </div>

                {/* ================================================================================ */}
                {(() => {
                  if (role == "ADMIN") {
                    return <></>;
                  } else {
                    return (
                      <>
                        <div className="mb-4">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="first_name"
                          >
                            {" "}
                            Vehicle Number
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            id="first_name"
                            type="text"
                            placeholder="Vehicle Number"
                            name="vehiclenumber"
                            value={vehiclenumber}
                            onChange={(e) => setvehiclenumber(e.target.value)}
                            required // Make the field mandatory
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="first_name"
                          >
                            {" "}
                            License Number
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            id="first_name"
                            type="text"
                            placeholder="Your first name"
                            name="licensenumber"
                            value={licensenumber}
                            onChange={(e) => setlicensenumber(e.target.value)}
                            required // Make the field mandatory
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="first_name"
                          >
                            {" "}
                            Contact Number
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            id="first_name"
                            type="number"
                            placeholder="Contact Number"
                            name="contactnumber"
                            value={contactnumber}
                            onChange={(e) => setcontactnumber(e.target.value)}
                            required // Make the field mandatory
                          />
                        </div>
                      </>
                    );
                  }
                })()}

                {/* =================================================================================== */}

                <button
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={updateUserRole}
                >
                  UPDATE
                </button>
              </div>
            </div>

            <button
              className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Close Modal
            </button>
          </Modal>
        </div>
      </div>
    </>
  );
}
