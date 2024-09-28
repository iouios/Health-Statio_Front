import { Link } from "react-router-dom";
import AdminNavbar from "../../../components/navbarAdmin/adminNavbar";
import AdminSidebar from "../../../components/navbarAdmin/adminSidebar";
import VillageHealthWorker from "../../../components/villageHealthWorker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import axios from "axios";
import lifesaversHand from "../../../assets/lifesaversHand.png";
interface Data {
  id: number;
  firstname: string;
  lastname: string;
  rolename: string;
}

interface ProfileData {
  id: number;
  statusmaster: string;
  username: string;
  firstname: string;
  lastname: string;
  rolename: string;
  phone: string;
}

interface StatusMaster {
  id: number;
  firstname: string;
  lastname: string;
  rolename: string;
  statusmaster: string;
}

const Profile: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [profileData, setProfileData] = useState<ProfileData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<any | null>(null);
  const [status, setStatus] = useState<StatusMaster[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<ProfileData[] | null>(null);
  const [master, setMaster] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState(false); // สถานะเริ่มต้นเป็นไม่พร้อมใช้งาน


  const handleClick = (id: any) => {
    setUserId(id);
  };

  const handleSummit = () => {
    setMaster(!master);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const hadnleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleConfirm = () => {
    setIsAvailable(true); // เปลี่ยนสถานะเป็นพร้อมใช้งานเมื่อกดยืนยัน
    setIsPopupOpen(false); // ปิด popup
  };

  const allMaster = async () => {
    await axios
      .get(`http://localhost:9999/api/users/allMaster`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setData(response.data.allMaster);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9999/api/users/getProfile/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfileData(response.data.Master);
    } catch (err) {
      setError("Failed to load profile");
    }
  };
  const handleSubmits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue && editValue[0]) {
      try {
        const response = await axios.put(
          `http://localhost:9999/api/users/updateStatusMaster/${userId}`,
          {
            ...editValue[0],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        setStatus(response.data);
        setIsPopupOpen(false);
        localStorage.setAvailable('isReady', true);
      } catch (err) {
        setError("Failed to load statusMaster");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue && editValue[0]) {
      try {
        
        const response = await axios.put(
          `http://localhost:9999/api/users/editProfile/${userId}`,
          {
            ...editValue[0],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Form Submitted", editValue);
          window.location.href = "http://localhost:3000/admin/Proflile";
        }
      } catch (err) {
        setError("Failed to save statusMaster");
      }
    } else {
      setError("editvalue not updated");
    }
  };
  useEffect(() => {
    allMaster();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    setEditValue(profileData);
  }, [profileData]);

  useEffect(() => {
    if (profileData && profileData[0]?.statusmaster === "พร้อม") {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  }, [profileData]);


  return (
    <div className="h-screen">
      <AdminNavbar />
      <div className="grid grid-cols-[1fr_4fr] gap-4">
        <div className="">
          <AdminSidebar />
        </div>
        <div className="p-6">
          <div className="bg-white flex">
            <div className="bg-neutral-100 ">
              <div className="bg-white w-64  m-4 p-4">
                <div className="grid grid-cols-2">
                  จัดการผู้ใช้งาน
                  <Link to="/admin/Proflile/addUser">
                    <button className="bg-blue-500 p-2 rounded-md w-full text-white">
                      +เพิ่มผู้ใช้งาน
                    </button>
                  </Link>
                </div>
                <div className="flex flex-col items-start w-full pt-2 pb-2">
                  <input
                    className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                    id="searchInput"
                    name="searchInput"
                    placeholder="Search"
                  />
                </div>
                <div>
                  <div className="overflow-auto h-72 ">
                    {data.map((item, index) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <div
                          onClick={() => handleClick(item.id)}
                          className="m-2 bg-gray-200 w-44"
                        >
                          <div className="p-2">
                            {item.firstname}
                            {item.lastname}
                          </div>
                          <div className="pb-2 pl-2">{item.rolename}</div>
                        </div>
                      </TableRow>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-100 w-full">
              <div className="m-4 bg-white">
                <div className="bg-white ">
                  <div className="p-5">
                    <div className="text-center rounded-md">
                      {isEdit ? (
                        <>
                          <div className="flex flex-col w-full mx-2 justify-start">
                            <div className="">
                              <div className="flex justify-end gap-x-2">
                                <Link to={"http://localhost:3000/admin"}>
                                  <button className="bg-white text-blue-500 border border-blue-500 py-2 px-4 rounded-xl">
                                    ยกเลิก
                                  </button>
                                </Link>
                                <button
                                  onClick={handleSubmit}
                                  className="bg-blue-500 text-white py-2 px-4 rounded-xl"
                                >
                                  บันทึก
                                </button>
                              </div>
                              <div className="p-2 text-start">
                                ชื่อผู้ใช้งาน
                              </div>
                              <div className="p-2">
                                <input
                                  type="text"
                                  name="username"
                                  id=""
                                  className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                                  value={editValue?.[0]?.username || ""} // Optional chaining to avoid errors
                                  onChange={(e) => {
                                    // Ensure you're updating the correct object in the array
                                    setEditValue((prevState) => {
                                      if (!prevState) return prevState; // Handle null case

                                      const updatedProfile = [...prevState]; // Clone the previous state array
                                      updatedProfile[0] = {
                                        // Assume you're updating the first profile object
                                        ...updatedProfile[0],
                                        username: e.target.value, // Update the username field
                                      };

                                      return updatedProfile; // Return the updated array
                                    });
                                  }}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="">
                                <div className="pl-2 text-start">
                                  first name
                                </div>
                                <div className="p-2">
                                  <input
                                    type="text"
                                    name="firstname"
                                    id=""
                                    className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                                    value={editValue?.[0]?.firstname || ""} // Optional chaining to avoid errors
                                    onChange={(e) => {
                                      // Ensure you're updating the correct object in the array
                                      setEditValue((prevState) => {
                                        if (!prevState) return prevState; // Handle null case

                                        const updatedProfile = [...prevState]; // Clone the previous state array
                                        updatedProfile[0] = {
                                          // Assume you're updating the first profile object
                                          ...updatedProfile[0],
                                          firstname: e.target.value, // Update the username field
                                        };

                                        return updatedProfile; // Return the updated array
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <div className="pl-2 text-start">last name</div>
                                <div className="p-2">
                                  <input
                                    type="text"
                                    name="lastname"
                                    id=""
                                    className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                                    value={editValue?.[0]?.lastname || ""} // Optional chaining to avoid errors
                                    onChange={(e) => {
                                      // Ensure you're updating the correct object in the array
                                      setEditValue((prevState) => {
                                        if (!prevState) return prevState; // Handle null case

                                        const updatedProfile = [...prevState]; // Clone the previous state array
                                        updatedProfile[0] = {
                                          // Assume you're updating the first profile object
                                          ...updatedProfile[0],
                                          lastname: e.target.value, // Update the username field
                                        };

                                        return updatedProfile; // Return the updated array
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="p-2 text-start">phone</div>
                              <div className="p-2">
                                <input
                                  type="text"
                                  name="username"
                                  id=""
                                  className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                                  value={editValue?.[0]?.phone || ""} // Optional chaining to avoid errors
                                  onChange={(e) => {
                                    // Ensure you're updating the correct object in the array
                                    setEditValue((prevState) => {
                                      if (!prevState) return prevState; // Handle null case

                                      const updatedProfile = [...prevState]; // Clone the previous state array
                                      updatedProfile[0] = {
                                        // Assume you're updating the first profile object
                                        ...updatedProfile[0],
                                        phone: e.target.value, // Update the username field
                                      };

                                      return updatedProfile; // Return the updated array
                                    });
                                  }}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="p-2 text-start">rolename</div>
                              <div className="p-2">
                                <input
                                  type="text"
                                  name="rolename"
                                  id=""
                                  className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                                  value={editValue?.[0]?.rolename || ""} // Optional chaining to avoid errors
                                  onChange={(e) => {
                                    // Ensure you're updating the correct object in the array
                                    setEditValue((prevState) => {
                                      if (!prevState) return prevState; // Handle null case

                                      const updatedProfile = [...prevState]; // Clone the previous state array
                                      updatedProfile[0] = {
                                        // Assume you're updating the first profile object
                                        ...updatedProfile[0],
                                        rolename: e.target.value, // Update the username field
                                      };

                                      return updatedProfile; // Return the updated array
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="">
                          <div className="grid justify-items-end ">
                            <button
                              className="bg-blue-500 p-2 rounded-md text-white"
                              onClick={() => hadnleEdit()}
                            >
                              แก้ไข
                            </button>
                          </div>
                          <div className="m-2 mt-4">
                            <TableContainer component={Paper}>
                              <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <div>
                                      {status && status.length > 0 ? (
                                        <div className="flex">
                                          <TableCell className="flex-1">
                                            <div>สถานะ</div>
                                          </TableCell>
                                          <TableCell>
                                            <div className="flex flex-col text-end">
                                              <div>
                                                {status[0].statusmaster}
                                              </div>
                                            </div>
                                          </TableCell>
                                        </div>
                                      ) : (
                                        <div></div>
                                      )}
                                      {profileData && profileData.length > 0 ? (
                                        <div className="flex">
                                          <TableCell className="flex-1">
                                            <div>สถานะ</div>
                                            <div>ชื่อผู้ใช้งาน</div>
                                            <div>ชื่อ</div>
                                            <div>นามสกุล</div>
                                            <div>บทบาท</div>
                                            <div>เบอร์โทรศัพท์</div>
                                          </TableCell>
                                          <TableCell>
                                            <div className="flex flex-col text-end">
                                              <div>
                                                {profileData[0].statusmaster}
                                              </div>
                                              <div>
                                                {profileData[0].username}
                                              </div>
                                              <div>
                                                {profileData[0].firstname}
                                              </div>
                                              <div>
                                                {profileData[0].lastname}
                                              </div>
                                              <div>
                                                {profileData[0].rolename}
                                              </div>
                                              <div>{profileData[0].phone}</div>
                                            </div>
                                          </TableCell>
                                        </div>
                                      ) : (
                                        <div>
                                          <p>ยังไม่มีข้อมูล</p>
                                          <p>{userId}</p>
                                        </div>
                                      )}
                                    </div>
                                  </TableRow>
                                </TableHead>
                                <TableBody></TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="bg-white rounded-lg shadow-lg p-6 relative">
                    <div className="flex flex-col items-end justify-end">
                      {!isAvailable ? (
                        <button
                          onClick={openPopup}
                          className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                          ไม่พร้อมใช้งาน
                        </button>
                        
                      ) : (
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded"
                          onClick={openPopup}
                        >
                          พร้อมใช้งาน
                        </button>
                      )}

                      {isPopupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                          <div className="bg-white rounded-lg shadow-lg p-6  relative">
                            <div className="flex items-center justify-center h-full">
                              <img
                                src={lifesaversHand}
                                alt="lifesaversHand"
                                className="max-w-full max-h-full"
                              />
                            </div>
                            <h2 className="text-xl font-bold">
                              ต้องการยืนยันผู้ใช้ไม่พร้อมใช้งาน
                            </h2>
                            <button onClick={closePopup} className="p-2">
                              ยกเลิก
                            </button>
                            <button onClick={handleSubmits} className="p-2">
                              ยืนยัน
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
