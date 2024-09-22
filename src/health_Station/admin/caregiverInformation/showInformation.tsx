import React, { useState,useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import AdminNavbar from "../../../components/navbarAdmin/adminNavbar";
import AdminSidebar from "../../../components/navbarAdmin/adminSidebar";
import { Link } from "react-router-dom";
import icon from "../../../assets/icon.png";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// Other imports

interface ProfileData {
  id: number;
  firstname: string;
  lastname: string;
  phone: number;
}

const ShowInformation: React.FC = ({}) => {
  const [state, setState] = useState();
  const [profileData, setProfileData] = useState<ProfileData[] | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [userId, setUserId] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // const fetchProfile = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9999/api/users/getCaregivenFromId/${match.params.cid}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     setProfileData(response.data);
  //   } catch (err) {
  //     setError("Failed to load profile");
  //   }
  // };

  // useEffect(() => {
  //   fetchProfile();
  // }, [userId]);

  return (
    <div className="h-screen">
      <AdminNavbar />
      <div className="flex">
        <div className="grid-rows-1">
          <AdminSidebar />
        </div>
        <div className=" bg-neutral-100 w-full">
          <div className="flex-initial md:bg-white"></div>
          <div className="flex-1 md:bg-neutral-100 ">
            <div className=" md:bg-white md:m-4 p-2 bg-white rounded-lg">
              <div className="text-center rounded-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 ">
                <div className="flex p-4 ">
                <Link to="/admin/caregiverInformation">
                  <button className="mr-2 ">
                    <img
                      src={icon}
                      alt="icon"
                      className="object-cover h-3 mt-3 mr-1 md:place-items-start"
                    />
                  </button>
                </Link>
                <div className="text-2xl">ข้อมูลผู้ดูแล</div>
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
                                              {profileData[0].firstname}
                                            </div>
                                            <div>{profileData[0].lastname}</div>
                                            <div>{profileData[0].phone}</div>
                                          </div>
                                        </TableCell>
                                      </div>
                                    ) : (
                                      <div>
                                        <p>No profile information available.</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInformation;
