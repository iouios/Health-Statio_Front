import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {
  List,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AdminNavbar from "../../components/navbarAdmin/adminNavbar";
import AdminSidebar from "../../components/navbarAdmin/adminSidebar";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import other from "../../assets/other.png"

interface Data {
  id: number;
  ssd: number;
  firstname: string;
  lastname: string;
  sex: string;
  age: number;
  phone: string;
}
interface DashboardPerson {
  overall: number;
  normalHealth: number;
  disability: number;
}


const Admin: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState<Data[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [dashboardPerson, setDashboardPerson] = useState<DashboardPerson | null>(null);
  const [searchQuerys, setSearchQuerys] = useState<string>("");
  const [finalResult, setFinalResult] = useState<Data[]>([]);

  useEffect(() => {
    if (searchQuerys === "") {
      setFinalResult(data);
    } else {
      const filteredQuery = data.filter((datas) => {
        return Object.values(datas).some((value) =>
          value.toString().toLowerCase().includes(searchQuerys.toLowerCase())
        );
      });
      setFinalResult(filteredQuery);
    }
  }, [searchQuerys, data]);
  

  useEffect(() => {
    if (!searchQuery.trim()) {
      axios
        .get(`http://localhost:9999/api/users/getUser`, {
          params: {
            page: page,
            limit: itemsPerPage,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setData(response.data.allUser);
          setTotalCount(response.data.totalAllUser);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [page, itemsPerPage]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      axios
        .get(`http://localhost:9999/api/users/getUser`, {
          params: {
            page: page,
            limit: itemsPerPage,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setData(response.data.allUser);
          setTotalCount(response.data.totalAllUser);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [page, itemsPerPage]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      axios
        .get(`http://localhost:9999/api/users/getusersBySSD/${searchQuery}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setTotalCount(response.data.length);
          setPage(1);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    } else {
      axios
        .get(`http://localhost:9999/api/users/getUser`, {
          params: {
            page: page,
            limit: itemsPerPage,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setData(response.data.allUser);
          setTotalCount(response.data.totalAllUser);
          setPage(1);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  };

  const fetchData = async () => {
    try {
      const [personResponse] = await Promise.all([
        axios.get(`http://localhost:9999/api/dashboard/dashboardPerson`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
      ]);

      setDashboardPerson(personResponse.data.userAll[0]); // Assuming the response contains an array 'userAll'
    } catch (err) {
      setError("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="h-screen">
      <AdminNavbar />
      <div className="flex">
        <div className="flex-1 ">
          <AdminSidebar />
        </div>
        <div className=" bg-neutral-100 w-full">
        <div className="flex-initial md:bg-white"></div>
        <div className="flex-1 md:bg-neutral-100 ">
          <div className=" md:bg-white md:m-4 p-2 bg-white rounded-lg">
            <div className="text-center rounded-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 ">
                <div className="text-left p-2 pr-4 md:p-4 text-2xl font-bold">
                  Search
                </div>
              </div>
              <div className="p-0 md:pl-4 md:pb-4">
                <form className="flex" onSubmit={handleSearch}>
                <div className="flex flex-col items-start w-full ">
                      <label htmlFor="searchInput">ค้นหาประชาชน</label>
                      <input
                        className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full rounded-tr-lg rounded-tl-lg"
                        id="searchInput"
                        name="searchInput"
                        placeholder="Search"
                        value={searchQuerys}
                        onChange={(e) => setSearchQuerys(e.target.value)}
                      />
                    </div>
                  {/* <button className="border-2 flex-none rounded-lg bg-blue-500 text-white p-2 md:w-36 mt-6">
                    ค้นหา
                  </button> */}
                </form>
              </div>
            </div>
          </div>
          <div className=" bg-neutral-100 m-4">
            <div className="bg-white rounded-lg">
              <Paper className="w-full p-4 select-none">
                <h1 className="text-3xl font-bold text-nowrap mb-4">
                  จัดการข้อมูลหลัก
                </h1>
                <div>
                    {dashboardPerson ? (
                      <div className="flex pt-5 pb-5">
                        <div className="p-2 flex text-blue-500">
                          ทั้งหมด
                          <div className="pl-2">{dashboardPerson.overall}</div>
                        </div>
                        <div className="p-2 flex text-blue-300">
                          สุขภาวะปกติ
                          <div className="pl-2">
                            {dashboardPerson.normalHealth}
                          </div>
                        </div>
                        <div className="p-2 flex text-blue-300">
                          มีความพิการ
                          <div className="pl-2">
                            {dashboardPerson.disability}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>ไม่มีข้อมูลของตารางประวัติข้อมูลสุขภาพ</p>
                    )}
                  </div>
                <TableContainer
                  component={Paper}
                  className="w-full overflow-auto"
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead className="w-full ">
                      <TableRow>
                        <TableCell align="left">ลำดับ</TableCell>
                        <TableCell align="right">เลขบัตรประชาชน</TableCell>
                        <TableCell align="right">ชื่อ</TableCell>
                        <TableCell align="right">สกุล</TableCell>
                        <TableCell align="right">เพศ</TableCell>
                        <TableCell align="right">อายุ</TableCell>
                        <TableCell align="right">หมายเลขโทรศัพท์</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {finalResult.map((item, index) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">
                            {index + 1 + (page - 1) * itemsPerPage}
                          </TableCell>
                          <TableCell align="right">{item.ssd}</TableCell>
                          <TableCell align="right">{item.firstname}</TableCell>
                          <TableCell align="right">{item.lastname}</TableCell>
                          <TableCell align="right">{item.sex}</TableCell>
                          <TableCell align="right">{item.age}</TableCell>
                          <TableCell align="right">{item.phone}</TableCell>
                          <TableCell align="right">
                              <div className="">
                                <div>
                                  <Dropdown>
                                    <MenuButton>
                                      <img
                                        src={other}
                                        alt="other"
                                        className=" w-2 h-2 md:w-4 md:h-4"
                                      />
                                    </MenuButton>
                                    <Menu>
                                      <MenuItem>
                                        <Link
                                          to={`/admin/userfrom/caregiver/${item.id}`}
                                          className="your-link-class"
                                        >
                                          <button className="">
                                          ประวัติข้อมูลสุขภาพ
                                          </button>
                                        </Link>
                                      </MenuItem>
                                      <MenuItem>
                                      <Link
                                      to={`/admin/userfrom/citizenInformation/${item.id}`}
                                          
                                          className="your-link-class"
                                        >
                                          <button className="">
                                          ข้อมูลผู้ดูแล
                                          </button>
                                        </Link></MenuItem>
                                      <MenuItem>
                                      <Link
                                      to={`/admin/userfrom/healthHistoryTable/${item.id}`}
                                          
                                          className="your-link-class"
                                        >
                                          <button className="w-full">
                                          ข้อมูลประชาชน
                                          </button>
                                        </Link></MenuItem>
                                        <MenuItem>
                                      <Link
                                      to={`/admin/userfrom/adldatahistorytable/${item.id}`}
                                          
                                          className="your-link-class"
                                        >
                                          <button className="w-full">
                                          ข้อมูล ADL
                                          </button>
                                        </Link></MenuItem>
                                    </Menu>
                                  </Dropdown>
                                </div>
                              </div>
                            </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="flex justify-between m-4">
                  <div>
                    <FormControl variant="outlined" size="small">
                      <Select
                        labelId="items-per-page-label"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="">
                    <Stack spacing={2}>
                      <Pagination
                        className="pl-4"
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                      />
                    </Stack>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Admin;
