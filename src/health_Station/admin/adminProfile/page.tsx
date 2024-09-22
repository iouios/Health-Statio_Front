import React, { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import AdminNavbar from "../../../components/navbarAdmin/adminNavbar";
import AdminSidebar from "../../../components/navbarAdmin/adminSidebar";
import { Link } from "react-router-dom";
import icon from "../../../assets/icon.png";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

// Other imports
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

interface Data {
  id: number;
  firstname: string;
  lastname: string;
  rolename: string;
}

const AdminProfile: React.FC = () => {
  const [state, setState] = useState();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState<Data[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  // const allMaster = async () => {
  //   await axios
  //     .get(`http://localhost:9999/api/users/allMaster`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((response) => {
  //       setData(response.data.caregiven);
  //       setTotalCount(response.data.totalCaregiven);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching data:", err);
  //     });
  //   }

  // useEffect(() => {
  //   allMaster()
  // }, []);

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
                <div className="grid justify-items-end">
                  <div className="">
                    <Link to="/admin/Profile/editprofile">
                    <button className="bg-blue-500 p-1 m-2 rounded-lg text-white ">แก้ไข</button>
                    </Link>
                  </div>
                </div>
                <div className="m-2">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                          {(data || []).map((item, index) => (
                          <TableRow
                            key={item.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">{item.id}</TableCell>
                            <TableCell align="right">{item.firstname}</TableCell>
                            <TableCell align="right">{item.lastname}</TableCell>
                            <TableCell align="right">{item.rolename}</TableCell>
                          </TableRow>
                        ))}
                        iouioZ
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">
                              Protein&nbsp;(g)
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
