import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
// Other imports

interface ProfileData {
  id: number;
  ssd: number;
  firstname: string;
  lastname: string;
  sex: string;
  age: number;
  education_level: string;
  career: string;
  birthday_date: string;
  blood_group: string;
  num_of_house: number;
  group_of_house: string;
  tambon: string;
  amphoe: string;
  province: string;
  postcode: number;
  phone: number;
}

interface HelthData {
  id: number;
  type_of_disability: string;
  cause_of_disability: string;
  financial_support: string;
  medical_treatment_rights: string;
  assistive_equipment: string;
  ability_to_carry_out_daily_activities: string;
  education_and_training: string;
  need_for_assistance: string;
  congenital_disease: string;
  history_of_illness: string;
}

interface SurgeryhistoryData {
  year: string;
  hospital: string;
}
interface DrugAllergyData {
  drug_name: string;
  drug_allergic_reactions: string;
}
interface HistoryoffoodallergiesData {
  food_name: string;
  food_allergic_reactions: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString); // แปลง string เป็น Date object
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = (date.getFullYear() + 543).toString(); // แปลงปี ค.ศ. เป็น พ.ศ.
  return `${day}/${month}/${year}`; // คืนค่าตามรูปแบบที่ต้องการ
};

const HealthHistoryTable: React.FC = () => {
  const [state, setState] = useState();
  const [personalData, setPersonalData] = useState<ProfileData[]>([]);

  const [helthData, setHelthData] = useState<HelthData[] | null>(null);
  const [surgeryhistoryData, setSurgeryhistoryData] = useState<
    SurgeryhistoryData[] | null
  >(null);
  const [drugAllergyData, setDrugAllergyData] = useState<
    DrugAllergyData[] | null
  >(null);
  const [historyoffoodallergiesData, setHistoryoffoodallergiesData] = useState<
    HistoryoffoodallergiesData[] | null
  >(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [userId, setUserId] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { hid } = useParams<{ hid: string }>();

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9999/api/users/getuserDataFromID/${hid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPersonalData(response.data.PersonalData);
      setHelthData(response.data.HelthData);
      setSurgeryhistoryData(response.data.SurgeryhistoryData);
      setDrugAllergyData(response.data.DrugAllergyData);
      setHistoryoffoodallergiesData(response.data.HistoryoffoodallergiesData);
    } catch (err) {
      setError("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [hid]);

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
                <div className="">
                  <div className="flex p-4 ">
                    <Link to="/admin">
                      <button className="mr-2 ">
                        <img
                          src={icon}
                          alt="icon"
                          className="object-cover h-3 mt-3 mr-1 md:place-items-start"
                        />
                      </button>
                    </Link>
                    <div className="text-2xl">ข้อมูลประชาชน</div>
                  </div>
                  <div className="m-2 mt-4">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <div className="">
                              <div className="bg-blue-100">
                                <div className="text-start p-4">ข้อมูลส่วนบุคคล</div>
                                {personalData && personalData.length > 0 ? (
                                  <div className="grid grid-cols-2 gap-x-4">
                                    <TableCell className="">
                                      <div className="grid grid-cols-2">
                                        <div>ประเภทความบกพร่องทางร่างกาย</div>
                                        <div>{personalData[0].id}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>เลขบัตรประชาชน</div>
                                        <div>{personalData[0].ssd}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>ชื่อ</div>
                                        <div>{personalData[0].firstname}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>นามสกุล</div>
                                        <div>{personalData[0].lastname}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>เพศ</div>
                                        <div>{personalData[0].sex}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>อายุ</div>
                                        <div>{personalData[0].age}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>ระดับการศึกษา</div>
                                        <div>
                                          {personalData[0].education_level}
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="">
                                      <div className="grid grid-cols-2">
                                        <div>อาชีพ</div>
                                        <div>{personalData[0].career}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>วันเดือนปีเกิด</div>
                                        <div>
                                        {formatDate(personalData[0].birthday_date)}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>หมู่เลือด</div>
                                        <div>{personalData[0].blood_group}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>ที่อยู่</div>
                                        <div>
                                          {personalData[0].num_of_house}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>เบอร์โทรศัพท์</div>
                                        <div>{personalData[0].phone}</div>
                                      </div>
                                    </TableCell>
                                  </div>
                                ) : (
                                  <div>
                                    <p>
                                      ไม่มีข้อมูลของตารางประวัติข้อมูลสุขภาพ
                                    </p>
                                    <p>{userId}</p>
                                  </div>
                                )}
                              </div>

                              <div>ข้อมูลสุขภาพ</div>
                              {helthData && helthData.length > 0 ? (
                                <div className="flex">
                                  <TableCell className="flex-1">
                                    <div>ประเภทความพิการ</div>
                                    <div>สาเหตุความพิการ</div>
                                    <div>การสนับสนุนทาการเงิน</div>
                                    <div>สิทธิการรักษาพยาบาล</div>
                                    <div>อุปกรณ์ช่วยเหลือ</div>
                                    <div>ความสามารถในการทำกิจวัตรประจำวัน</div>
                                    <div>การศึกษาและการฝึกอบรม</div>
                                    <div>อาชีพและการทำงาน</div>
                                    <div>ความต้องการความช่วยเหลือ</div>
                                    <div>ประวัติการเจ็บป่วย</div>
                                    <div>โรคประจำตัว</div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-col text-end ">
                                      <div>{helthData[0].id}</div>
                                      <div>
                                        {helthData[0].type_of_disability}
                                      </div>
                                      <div>
                                        {helthData[0].cause_of_disability}
                                      </div>
                                      <div>
                                        {helthData[0].financial_support}
                                      </div>
                                      <div>
                                        {helthData[0].medical_treatment_rights}
                                      </div>
                                      <div>
                                        {helthData[0].assistive_equipment}
                                      </div>
                                      <div>
                                        {
                                          helthData[0]
                                            .ability_to_carry_out_daily_activities
                                        }
                                      </div>
                                      <div>
                                        {helthData[0].education_and_training}
                                      </div>
                                      <div>
                                        {helthData[0].need_for_assistance}
                                      </div>
                                      <div>
                                        {helthData[0].congenital_disease}
                                      </div>
                                      <div>
                                        {helthData[0].history_of_illness}
                                      </div>
                                    </div>
                                  </TableCell>
                                </div>
                              ) : (
                                <div>
                                  <p>ไม่มีข้อมูลของตารางประวัติข้อมูลสุขภาพ</p>
                                  <p>{userId}</p>
                                </div>
                              )}
                              <div>ประวัติ</div>
                              {surgeryhistoryData &&
                              surgeryhistoryData.length > 0 ? (
                                <div className="flex">
                                  <TableCell className="flex-1">
                                    <div>ประวัติการผ่าตัด</div>
                                    <div>เมื่อ พ.ศ.</div>
                                    <div>โรงพยาบาล</div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-col text-end">
                                      <div>{surgeryhistoryData[0].year}</div>
                                      <div>
                                        {surgeryhistoryData[0].hospital}
                                      </div>
                                    </div>
                                  </TableCell>
                                </div>
                              ) : (
                                <div>
                                  <p>{userId}</p>
                                </div>
                              )}
                              {drugAllergyData && drugAllergyData.length > 0 ? (
                                <div className="flex">
                                  <TableCell className="flex-1">
                                    <div>ประวัติการแพ้ยา</div>
                                    <div>ชื่อยา</div>
                                    <div>อาการที่แพ้</div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-col text-end">
                                      <div>{drugAllergyData[0].drug_name}</div>
                                      <div>
                                        {
                                          drugAllergyData[0]
                                            .drug_allergic_reactions
                                        }
                                      </div>
                                    </div>
                                  </TableCell>
                                </div>
                              ) : (
                                <div>
                                  <p>{userId}</p>
                                </div>
                              )}
                              {historyoffoodallergiesData &&
                              historyoffoodallergiesData.length > 0 ? (
                                <div className="flex">
                                  <TableCell className="flex-1">
                                    <div>ประวัติการแพ้อาหาร</div>
                                    <div>ชื่ออาหาร</div>
                                    <div>อาการที่แพ้</div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-col text-end">
                                      <div>
                                        {
                                          historyoffoodallergiesData[0]
                                            .food_name
                                        }
                                      </div>
                                      <div>
                                        {
                                          historyoffoodallergiesData[0]
                                            .food_allergic_reactions
                                        }
                                      </div>
                                    </div>
                                  </TableCell>
                                </div>
                              ) : (
                                <div>
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

export default HealthHistoryTable;
