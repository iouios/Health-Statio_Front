import { useState } from "react";
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
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
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
  useEffect(() => {
    axios
      .get(`${process.env.END_POINT}users/getUser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setData(response.data.allUser))
      .catch((err) => console.log(err));
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

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = data.slice(indexOfFirstItem, indexOfLastItem);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
                      <Link to="">
                        <button className="rounded-lg p-2 text-left w-full">
                          บันทึกข้อมูลใหม่
                        </button>
                      </Link>
                      <Link to="">
                        <button className="rounded-lg p-2 text-left w-full">
                          บันทึกข้อมูลผู้ดูแลผู้สูงอายุ
                        </button>
                      </Link>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Link to="">
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
                    <Link
                      to="/health_Station/personalRecordData"
                      className="your-link-class"
                    >
                      <button className="border-2 rounded-lg p-2 bg-blue-900 w-full">
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
                  <form className="flex">
                    <div className="flex flex-col items-start w-full mr-4 p-2">
                      <label htmlFor="searchInput">เลขบัตรประชาชน</label>
                      <input
                        className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                        id="searchInput"
                        name="searchInput"
                        placeholder="Search"
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
                        {mock.map((item, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left">{index + 1}</TableCell>
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
                    <div className="w-32">
                      <FormControl fullWidth>
                        <InputLabel id="items-per-page-label">
                          Items per page
                        </InputLabel>
                        <Select
                          labelId="items-per-page-label"
                          id="items-per-page"
                          value={itemsPerPage}
                          label="Items per page"
                          onChange={handleItemsPerPageChange}
                        >
                          {[5, 10, 15, 20].map((size) => (
                            <MenuItem key={size} value={size}>
                              {size}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="justify-items-end mt-4">
                      <Stack spacing={2} className="">
                        <Pagination
                          count={Math.ceil(data.length / itemsPerPage)}
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

const mock = [
  {
    id: "ff3c89f6-1744-4265-b6eb-1f9ff2826941",
    ssd: "1122334455667",
    firstname: "วรเมธ",
    lastname: "ยอดแสนคำ",
    sex: "ชาย",
    age: 60,
    phone: "0812345678",
  },
  {
    id: "7e2dc007-7613-4485-abb5-5c156ac1aa87",
    ssd: "1254795623664",
    firstname: "จุฑารัตน์",
    lastname: "ศีติสาร",
    sex: "หญิง",
    age: 40,
    phone: "0865497423",
  },
  {
    id: "cb9db60c-03cb-46e3-bee8-d8a8cb53cdb4",
    ssd: "1222317350283",
    firstname: "เจษฎา",
    lastname: "จันทรสกุล",
    sex: "ชาย",
    age: 25,
    phone: "0862359712",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1328104107069",
    firstname: "เดือนจรัส",
    lastname: "เกสร",
    sex: "หญิง",
    age: 14,
    phone: "0895678423",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1223445267761",
    firstname: "เสาวรัตน",
    lastname: "ชัชวาลสกุ",
    sex: "หญิง",
    age: 32,
    phone: "0869887123",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1662611455881",
    firstname: "กตัญญ",
    lastname: "เจริญสินพร",
    sex: "ชาย",
    age: 10,
    phone: "0897864562",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1218235404661",
    firstname: "ณัชชา",
    lastname: "วุฒิกุลวานิช",
    sex: "ชาย",
    age: 25,
    phone: "0878983319",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1451828375225",
    firstname: "ณัฐพล",
    lastname: "อนันควานิช",
    sex: "ชาย",
    age: 36,
    phone: "0830789415",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1441250533067",
    firstname: "ทัศณีย์",
    lastname: "นาจารย์",
    sex: "หญิง",
    age: 46,
    phone: "0669871359",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1855505645856",
    firstname: "ธนัช",
    lastname: "ธนเชาว์กวิน",
    sex: "ชาย",
    age: 55,
    phone: "0963254812",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1262712312621",
    firstname: "นันทพร",
    lastname: "ฉิมคล้าย",
    sex: "หญิง",
    age: 41,
    phone: "0923578952",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1621564500634",
    firstname: "ปุณยนุช",
    lastname: "แพโรจน",
    sex: "หญิง",
    age: 16,
    phone: "0893265810",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1336682726251",
    firstname: "พรเพ็ญ",
    lastname: "วาทยลักษณ",
    sex: "หญิง",
    age: 33,
    phone: "0811224689",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1606513088448",
    firstname: "พิญญานันท์",
    lastname: " ล้อมสุขา",
    sex: "ชาย",
    age: 44,
    phone: "0899723789",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1614086067663",
    firstname: "ววิภู",
    lastname: "ทิพย์สุมาลัย",
    sex: "ชาย",
    age: 16,
    phone: "0667235149",
  },
  {
    id: "c0ffa3ce-a426-455d-9334-46cd5054f8b4",
    ssd: "1533080000319",
    firstname: "วรติมา",
    lastname: "ชัยสมสุขฤดี",
    sex: "หญิง",
    age: 25,
    phone: "0815897273",
  },
];
