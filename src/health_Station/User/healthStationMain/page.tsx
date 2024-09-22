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
import Navbar from "../../../components/Navbar";
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


interface Data {
  id: number;
  ssd: number;
  firstname: string;
  lastname: string;
  sex: string;
  age: number;
  phone: string;
}

const Health_Station: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState<Data[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      <Navbar />
      <div className="flex">
        <div className="flex-1 ">
          {!isSmallScreen && (
            <List className="md:w-56 ">
              <Accordion className="bg-blue-500 m-2">
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>การบันทึกข้อมูล</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div>
                      <Link to="/health_Station">
                        <button className="rounded-lg p-2 text-left w-full">
                          บันทึกข้อมูลใหม่
                        </button>
                      </Link>
                      <Link to="/health_Station/elderly">
                        <button className="rounded-lg p-2 text-left w-full">
                          บันทึกข้อมูลผู้ดูแลผู้สูงอายุ
                        </button>
                      </Link>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Link to="/">
                <button className="rounded-lg p-2 text-left w-full">
                  อสม ออกจากระบบ
                </button>
              </Link>
            </List>
          )}
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
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:flex-1 text-white md:ml-96">
                      {/* <Button component={Link}
                      to="/health_Station/personalRecordData"
                      className="border-2 rounded-lg p-2 bg-blue-900 w-full your-link-class">
                        + ข้อมูลส่วนบุคคล
                      </Button> */}
                      <Link to="/health_Station/personalRecordData">
                      <button className="border-2 rounded-lg p-2 bg-blue-800 w-full">
                      + ข้อมูลส่วนบุคคล
                      </button>
                    </Link>
                    <Link to="/health_Station/healthRecordForm">
                      <button className="border-2 rounded-lg p-2 bg-blue-500 w-full">
                        + ข้อมูลสุขภาพ
                      </button>
                    </Link>
                    <Link
                      to="/health_Station/healthCheckInformation"
                      className="your-link-class"
                    >
                      <button className="border-2 rounded-lg p-2 bg-green-500 w-full">
                        + ข้อมูลตรวจสุขภาพ
                      </button>
                    </Link>
                    <Link
                      to="/health_Station/dailyRoutineAssessmentFormADL"
                      className="your-link-class"
                    >
                      <button className="border-2 rounded-lg p-2 bg-orange-500 w-full">
                        + ประเมิน ADL
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="p-0 md:pl-4 md:pb-4">
                  <form className="flex" onSubmit={handleSearch}>
                    <div className="flex flex-col items-start w-full mr-4 p-2">
                      <label htmlFor="searchInput">เลขบัตรประชาชน</label>
                      <input
                        className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                        id="searchInput"
                        name="searchInput"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button className="border-2 flex-none rounded-lg bg-blue-500 text-white p-2 md:w-36 mt-6">
                      ค้นหา
                    </button>
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
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item, index) => (
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
                            <TableCell align="right">
                              {item.firstname}
                            </TableCell>
                            <TableCell align="right">{item.lastname}</TableCell>
                            <TableCell align="right">{item.sex}</TableCell>
                            <TableCell align="right">{item.age}</TableCell>
                            <TableCell align="right">{item.phone}</TableCell>
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

export default Health_Station;
