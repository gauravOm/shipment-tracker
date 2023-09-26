"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getServerSession } from "next-auth/next";
import Modal from "react-modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
// import {useRouter} from "next/router";
export default function Home() {
  const [userRole, setuserRole] = useState("");
  const [items, setitems] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDriver, setIsOpenDriver] = useState(false);
  const [vehiclenumber, setvehiclenumber] = useState("");
  const [licensenumber, setlicensenumber] = useState("");
  const [contactnumber, setcontactnumber] = useState("");

  const [shipment_id, setShipment_id] = useState("");
  const [customername, setCustomerName] = useState("");
  const [destinationaddress, setDestinationAddress] = useState("");
  const [planneddeliverydate, setPlannedDeliveryDate] = useState("");
  const [shipmentstatus, setShipmentStatus] = useState();
  const [assigneddriverid, setAssignedDriverId] = useState("");
  const [role, setRole] = useState("Admin");
  const [apiCalled, setApiCalled] = useState(false);

  const [shipmentData, setshipmentData] = useState([
    {
      shipment_id: "shipment_id",
      assigneddriverid: "assigneddriverid",
      customername: "customername",
      destinationaddress: "destinationaddress",
      shipmentstatus: "shipmentstatus",
      planneddeliverydate: "planneddeliverydate",
    },
  ]);

  const [driverData, setdriverData] = useState();

  const router = useRouter();
  let { data } = useSession();
  console.log(data, "dataa from");
  const logout = () => {
    data = undefined;
    router.push("/login");
  };
  console.log(userRole, items);

  const getShipments = async () => {
    try {
      const res = await fetch(`/api/trackShipment`);
      const data = await res.json();
      console.log(data.data);
      setshipmentData(data.data);
      setApiCalled(true);
    } catch (err) {
      console.log("error in catch block");
    }
  };

  const clearStoredValues = () => {
    setShipment_id("");
    setCustomerName("");
    setDestinationAddress("");
    setPlannedDeliveryDate("");
    setShipmentStatus();
    setAssignedDriverId("");
  };
  useEffect(() => {
    // Check if the input field is still empty after rendering
    if (!customername) {
      setCustomerName(selectedUser.customername);
    }
    if (!assigneddriverid) {
      setAssignedDriverId(selectedUser.assigneddriverid);
    }
    if (!shipment_id) {
      setShipment_id(selectedUser.shipment_id);
    }
    if (!destinationaddress) {
      setDestinationAddress(selectedUser.destinationaddress);
    }
    if (!shipmentstatus) {
      setShipmentStatus(selectedUser.shipmentstatus);
    }
    if (!planneddeliverydate) {
      setPlannedDeliveryDate(selectedUser.planneddeliverydate);
    }
  }, [
    selectedUser.customername,
    selectedUser.assigneddriverid,
    selectedUser.destinationaddress,
    selectedUser.shipmentstatus,
    selectedUser.planneddeliverydate,
    selectedUser.shipment_id,
    customername,
    assigneddriverid,
    destinationaddress,
    shipmentstatus,
    planneddeliverydate,
    shipment_id,
  ]);

  const updateShipments = async () => {
    debugger;
    let userData = {
      customername,
      assigneddriverid,
      destinationaddress,
      shipmentstatus,
      planneddeliverydate,
      shipment_id,
    };

    setdriverData(
      customername,
      assigneddriverid,
      destinationaddress,
      shipmentstatus,
      planneddeliverydate,
      shipment_id
    );

    userData = { ...selectedUser, ...userData, cse: "UPDATE" };

    console.log(userData);
    try {
      const response = await fetch("/api/updateShipment", {
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
          title: "Updated Successfully Successfully",
        });
        // Redirect to a success page or login page
        router.push("/login");
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

  const deletShipment = async (id) => {
    console.log("Deleting", id);
    let userData = { id: id, cse: "DELETE" };

    try {
      const response = await fetch("/api/updateShipment", {
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
          title: "Updated Successfully",
        });
        getShipments();
        // Redirect to a success page or login page
        // router.push("/login");
      } else {
        // Handle registration failure
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Update failed, Please Try again",
          text: data.result,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const updateShipmentStatus = async (id) => {
    console.log("Deleting", id);
    let userData = { id: id,status:shipmentstatus, cse: "STATUS_UPDATE" };
console.log("usedata",userData);
    try {
      const response = await fetch("/api/updateShipment", {
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
          title: "Updated Successfully",
        });
        getShipments();
        // Redirect to a success page or login page
        // router.push("/login");
      } else {
        // Handle registration failure
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Update failed, Please Try again",
          text: data.result,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  useEffect(() => {
    if (!apiCalled) {
      getShipments();
    }
  }, [apiCalled]);

  useEffect(() => {
    if (data == undefined) {
      console.log("  setuserRole(data.user.role)");
      router.push("/login");
    } else {
      setuserRole(data.user.role);
    }
  }, [items]);

  if (!data) {
    // router.push("/login");
  } else {
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
                  <li></li>
                  {(() => {
                    if (userRole == "ADMIN") {
                      return (
                        <>
                          <li>
                            <Link
                              href="/updateUser"
                              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                            >
                              All Users
                            </Link>
                          </li>
                        </>
                      );
                    }
                  })()}
                </ul>
              </div>
            </div>
          </nav>
          <div className="text-center text-green-dark font-bold">
            All Shipments
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr
                  className="bg-gray-300 text-gray-700"
                  style={{ backgroundColor: "#8ae736" }}
                >
                  <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                    Shipment ID
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                    Destination Address
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                    Planned Dlv Date
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                    Shipment Status
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                    Assigned Driver
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                    Action
                  </th>
                  {/* {(() => {
                  if (userRole == "ADMIN") {
                    return (
                      <>
                        <th className="px-6 py-3 text-left font-semibold text-sm text-center">
                          Action
                        </th>
                      </>
                    );
                  }
                })()} */}
                </tr>
              </thead>
              <tbody>
                {shipmentData.map((shipment) => (
                  <tr key={shipment.shipment_id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm sm:text-center">
                      {shipment.shipment_id}
                    </td>
                    <td className="px-6 py-4 text-sm sm:text-center">
                      {shipment.customername}
                    </td>
                    <td className="px-6 py-4 text-sm sm:text-center">
                      {shipment.destinationaddress}
                    </td>
                    <td className="px-6 py-4 text-sm sm:text-center">
                      {shipment.planneddeliverydate}
                    </td>
                    <td className="px-6 py-4 text-sm sm:text-center">
                      {shipment.shipmentstatus}
                    </td>
                    <td className="px-6 py-4 text-sm sm:text-center">
                      {shipment.assigneddriverid}
                    </td>
                    {(() => {
                      if (userRole == "ADMIN") {
                        return (
                          <>
                            <td className="px-6 py-4 text-sm sm:text-center">
                              {" "}
                              <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 text-right dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => {
                                  setIsOpen(true);
                                  setSelectedUser(shipment);
                                  clearStoredValues();
                                }}
                              >
                                Modify
                              </button>
                              &nbsp;
                              <button
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-red font-medium rounded-lg text-sm px-2 py-1.5 text-right dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={() => {
                                  deletShipment(shipment.shipment_id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        );
                      } else {
                        return (
                          <>
                          <td className="px-6 py-4 text-sm sm:text-center">
                          <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 text-right dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => {
                              setIsOpenDriver(true);
                              setSelectedUser(shipment);
                              clearStoredValues();
                            }}
                          >
                            Modify
                          </button>
                        </td>
                          </>
                        )
                        
                      }
                    })()}
                  </tr>
                ))}
              </tbody>
            </table>

            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Update Shipment Details
                </h3>
                <div className="space-y-6" action="#">
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Shipment Id
                    </label>
                    <input
                      type="text"
                      readOnly={true}
                      placeholder="Shipment Id"
                      value={selectedUser.shipment_id}
                      onChange={(e) => setShipment_id(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Customer Name
                    </label>
                    <input
                      value={selectedUser.customername}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Shipment Status
                    </label>

                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={selectedUser.shipmentstatus}
                      onChange={(e) => {
                        setShipmentStatus(e.target.value);
                      }}
                    >
                      <option value="inTransit">In-transit</option>
                      <option value="dlvrd">Delivered</option>
                      <option value="dlyd">Delayed</option>
                      <option value="cancld">Canceled</option>
                    </select>
                  </div>

                  {/* ================================================================================ */}

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="first_name"
                    >
                      {" "}
                      Destination Address
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      id="first_name"
                      type="text"
                      placeholder="Destination Address"
                      name="destinationaddress"
                      value={selectedUser.destinationaddress}
                      onChange={(e) => setDestinationAddress(e.target.value)}
                      required // Make the field mandatory
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="first_name"
                    >
                      {" "}
                      Planned Delivery Date
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      id="first_name"
                      type="text"
                      placeholder="Planned Delivery Date"
                      name="planneddeliverydate"
                      value={selectedUser.planneddeliverydate}
                      onChange={(e) => setPlannedDeliveryDate(e.target.value)}
                      required // Make the field mandatory
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="first_name"
                    >
                      {" "}
                      Assigned Driver Id
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      id="first_name"
                      type="number"
                      placeholder="Driver Id"
                      name="assigneddriverid"
                      value={selectedUser.assigneddriverid}
                      onChange={(e) => setAssignedDriverId(e.target.value)}
                      required // Make the field mandatory
                    />
                  </div>

                  {/* =================================================================================== */}

                  <button
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => (updateShipments(), setIsOpen(false))}
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
{/* modal for shipment status update by user */}
            <Modal isOpen={isOpenDriver} onRequestClose={() => setIsOpenDriver(false)}>
            <div className="px-6 py-6 lg:px-8">
            <button
              className="bg-blue hover:bg-blue-dark text-red font-bold py-2 px-4 rounded-full"
              onClick={() => setIsOpenDriver(false)}
            >
              Close Modal
            </button>
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Update Shipment Details
              </h3>
              <div className="space-y-6" action="#">
            
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Shipment Id
                  </label>
                  <input
                    type="text"
                    readOnly={true}
                    placeholder="Shipment Id"
                    value={selectedUser.shipment_id}
                    onChange={(e) => setShipment_id(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Customer Name
                  </label>
                  <input
                   readOnly={true}
                    value={selectedUser.customername}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Shipment Status
                  </label>

                  <select
                    className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-600 dark:border-green-500 dark:placeholder-gray-400 dark:text-green"
                    value={shipmentstatus}
                    onChange={(e) => {
                      setShipmentStatus(e.target.value);
                    }}
                  >
                    <option value="inTransit">In-transit</option>
                    <option value="dlvrd">Delivered</option>
                    <option value="dlyd">Delayed</option>
                    <option value="cancld">Canceled</option>
                  </select>
                </div>

                {/* ================================================================================ */}

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="first_name"
                  >
                    {" "}
                    Destination Address
                  </label>
                  <input
                   readOnly={true}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    id="first_name"
                    type="text"
                    placeholder="Destination Address"
                    name="destinationaddress"
                    value={selectedUser.destinationaddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    required // Make the field mandatory
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="first_name"
                  >
                    {" "}
                    Planned Delivery Date
                  </label>
                  <input
                   readOnly={true}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    id="first_name"
                    type="text"
                    placeholder="Planned Delivery Date"
                    name="planneddeliverydate"
                    value={selectedUser.planneddeliverydate}
                    onChange={(e) => setPlannedDeliveryDate(e.target.value)}
                    required // Make the field mandatory
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="first_name"
                  >
                    {" "}
                    Assigned Driver Id
                  </label>
                  <input
                   readOnly={true}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    id="first_name"
                    type="number"
                    placeholder="Driver Id"
                    name="assigneddriverid"
                    value={selectedUser.assigneddriverid}
                    onChange={(e) => setAssignedDriverId(e.target.value)}
                    required // Make the field mandatory
                  />
                </div>
                <button
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  
                  onClick={() => (updateShipmentStatus(selectedUser.shipment_id),setIsOpenDriver(false))}
                >
              
                  UPDATE
                </button>
                {/* =================================================================================== */}
              </div>
            </div>

            <button
              className="bg-green hover:bg-green-dark text-black font-bold py-2 px-4 rounded-full"
              onClick={() => setIsOpenDriver(false)}
            >
              Close Modal
            </button>
          </Modal>
          </div>
        </div>
      </>
    );
  }
}
