import React, { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import AdminNavbar from "../../../components/navbarAdmin/adminNavbar";
import AdminSidebar from "../../../components/navbarAdmin/adminSidebar";
import { Link } from "react-router-dom";
import icon from "../../../assets/icon.png";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Groups from "../../../assets/Groups.png";
import Ear from "../../../assets/Ear.png";
import Lifesavers from "../../../assets/Lifesavers.png";
import Waiting from "../../../assets/Waiting.png";
import Patient from "../../../assets/Patient.png";
import Consulting from "../../../assets/Consulting.png";
import Art from "../../../assets/Art.png";
import Window from "../../../assets/Window.png";

interface DashboardPerson {
  overall: number;
  maleAll: number;
  femaleAll: number;
  normalHealth: number;
  maleNormal: number;
  femaleNormal: number;
  disability: number;
  maleDisability: number;
  femaleDisability: number;
}

interface DashboardTypes {
  visuallyImpaired: number;
  PhysicallyDisabled: number;
  hearingAndCommunicationImpaired: number;
  mentalAndBehavioralDisabilities: number;
  intellectuallyDisabled: number;
  learningDisabilities: number;
  autisticDisability: number;
  moreThanOneTypeOfDisability: number;
}

interface DashboardVillage {
  id: number;
  label: string;
  value: number;
}

interface DashboardBarVillage {
  values: number[];
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [dashboardPerson, setDashboardPerson] =
    useState<DashboardPerson | null>(null);
  const [dashboardTypes, setDashboardTypes] = useState<DashboardTypes | null>(
    null
  );
  const [dashboardVillage, setDashboardVillage] = useState<DashboardVillage[]>(
    []
  );
  const [dashboardBarVillage, setDashboardBarVillage] =
    useState<DashboardBarVillage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const villageNames = [
    "หมู่ที่ 1 บ้านหลวง",
    "หมู่ที่ 2 บ้านแพทย์",
    "หมู่ที่ 3 บ้านปงสนุก",
    "หมู่ที่ 4 บ้านปิน",
    "หมู่ที่ 5 บ้านไชยสถาน",
    "หมู่ที่ 6 บ้านท่าม่าน",
    "หมู่ที่ 7 บ้านหล่ายทุ่ง",
    "หมู่ที่ 8 บ้านสบทราย",
    "หมู่ที่ 9 บ้านใหม่",
    "หมู่ที่ 10 บ้านกลาง",
    "หมู่ที่ 11 บ้านป่าซางคำ",
  ];

  const fetchData = async () => {
    try {
      const [
        personResponse,
        typesResponse,
        villageResponse,
        barVillageResponse,
      ] = await Promise.all([
        axios.get(`http://localhost:9999/api/dashboard/dashboardPerson`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        axios.get(`http://localhost:9999/api/dashboard/dashboardTypes`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        axios.get(
          `http://localhost:9999/api/dashboard/dashboardCircleVillage`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        axios.get(`http://localhost:9999/api/dashboard/dashboardBarVillage`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
      ]);

      setDashboardPerson(personResponse.data.userAll[0]); // Assuming the response is an array
      setDashboardTypes(typesResponse.data.typeAll[0]); // Assuming the response is an array
      setDashboardVillage(villageResponse.data.villageAll);
      setDashboardBarVillage(barVillageResponse.data);
    } catch (err) {
      setError("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = villageNames.map((name, index) => ({
    name,
    value: dashboardBarVillage?.values[index] || 0,
  }));

  const gradientStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #1B2F63, #375FC9)',
    height: '70px',
    color: '#fff',
    fontSize: '18px',
    border: '2px solid #fff',  // equivalent of border-2
    borderRadius: '0.5rem',    // equivalent of rounded-lg
    padding: '0.5rem',         // equivalent of p-2
  };

  return (
    <div className="h-screen">
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="bg-neutral-100 w-full">
          <div className="md:bg-white md:m-4 p-2 bg-white rounded-lg">
            <div className="text-center rounded-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-4">
                <div className="text-2xl ml-2">
                  สถานการณ์สุขภาพในเทศบาลตำบลเชียงม่วน
                </div>
              </div>
            </div>
            <div className="text-center">
              {dashboardPerson ? (
                <div className="grid grid-cols-4 p-6 gap-4 text-start">
                  <div className="col-span-2  mt-2">
                    <div style={gradientStyle} >
                      จำนวนประชากรทั้งหมด
                      <div>{dashboardPerson.overall}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="border-2 rounded-lg p-2 bg-blue-100">
                        เพศชาย<div>{dashboardPerson.maleAll}</div>
                      </div>
                      <div className="border-2 rounded-lg p-2 bg-green-100">
                        เพศหญิง<div>{dashboardPerson.femaleAll}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 border-2 p-2 rounded-lg">
                    <div className="border-2 rounded-lg p-2 bg-blue-100">
                      สุขภาวะปกติ<div>{dashboardPerson.normalHealth}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="border-2 rounded-lg p-2 bg-yellow-100">
                        เพศชาย<div>{dashboardPerson.maleNormal}</div>
                      </div>
                      <div className="border-2 rounded-lg p-2 bg-purple-100">
                        เพศหญิง<div>{dashboardPerson.femaleNormal}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 border-2 p-2 rounded-lg">
                    <div className="border-2 rounded-lg p-2 bg-blue-100">
                      มีความพิการ<div>{dashboardPerson.disability}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="border-2 rounded-lg p-2 bg-red-100">
                        เพศชาย<div>{dashboardPerson.maleDisability}</div>
                      </div>
                      <div className="border-2 rounded-lg p-2 bg-blue-100">
                        เพศหญิง<div>{dashboardPerson.femaleDisability}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>ไม่มีข้อมูลของตารางประวัติข้อมูลสุขภาพ</p>
              )}
            </div>
            <div>
              {dashboardTypes && dashboardTypes ? (
                <div className="bg-neutral-50 rounded-lg">
                  <div className="text-start pl-6 text-2xl p-2">ประเภทของคนพิการ</div>
                  <div className="grid grid-cols-4 p-6 gap-4 text-start">
                    <div className=" rounded-lg p-2  w-full flex ">
                      <div className="pr-4">
                        <img
                          src={Groups}
                          alt="Groups"
                          className="object-cover rounded-full w-20 h-20 md:w-12 md:h-12 "
                        />
                      </div>
                      <div className="border-l-2 pl-2 border-neutral-500">
                        <div>{dashboardTypes.visuallyImpaired}</div>
                        <div className="text-neutral-400">พิการทางการมองเห็น</div>
                      </div>
                    </div>
                    <div className=" rounded-lg p-2  w-full flex">
                      <div className="pr-4">
                        <img
                          src={Ear}
                          alt="Ear"
                          className="object-cover rounded-full w-20 h-20 md:w-12 md:h-12"
                        />
                      </div>
                      <div className="border-l-2 pl-2 border-neutral-500">
                        <div>{dashboardTypes.PhysicallyDisabled}</div>
                        <div className="text-neutral-400">ทางการได้ยินและสื่อความหมาย</div>
                      </div>
                    </div>
                    <div className=" rounded-lg p-2  w-full flex">
                      <div className="pr-4">
                        <img
                          src={Lifesavers}
                          alt="Lifesavers"
                          className="object-cover rounded-full w-20 h-20 md:w-12 md:h-12"
                        />
                      </div>
                      <div className="border-l-2 pl-2 border-neutral-500">
                        <div >
                          {dashboardTypes.hearingAndCommunicationImpaired}
                        </div>
                        <div className="text-neutral-400">ทางสติปัญญา</div>
                      </div>
                    </div>
                    <div className=" rounded-lg p-2  w-full flex">
                      <div className="pr-4">
                        <img
                          src={Waiting}
                          alt="Waiting"
                          className="object-cover w-20 h-20 md:w-12 md:h-12"
                        />
                      </div>
                      <div className="border-l-2 pl-2 border-neutral-500">
                        <div >
                          {dashboardTypes.mentalAndBehavioralDisabilities}
                        </div>
                        <div className="text-neutral-400">ทางออทิสติค</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 p-6 gap-4 text-start">
                    <div className=" rounded-lg p-2  w-full flex">
                      <div className="pr-4">
                        <img
                          src={Patient}
                          alt="Patient"
                          className="object-cover w-20 h-20 md:w-12 md:h-12"
                        />
                      </div>
                      <div className="border-l-2 pl-2 border-neutral-500">
                        <div>{dashboardTypes.intellectuallyDisabled}</div>
                        <div className="text-neutral-400">ทางการเคลื่อนไหว</div>
                      </div>
                    </div>
                    <div className=" rounded-lg p-2  w-full flex">
                      <div className="pr-4">
                        <img
                          src={Consulting}
                          alt="Consulting"
                          className="object-cover  w-20 h-20 md:w-12 md:h-12"
                        />
                      </div>
                      <div className="border-l-2 pl-2 border-neutral-500">
                        <div>{dashboardTypes.learningDisabilities}</div>
                        <div className="text-neutral-400">ทางจิตใจและพฤติกรรม</div>
                      </div>
                    </div>
                    <div className=" rounded-lg p-2  w-full flex">
                      <div className="pr-4">
                        <img
                          src={Art}
                          alt="Art"
                          className="object-cover  w-20 h-20 md:w-12 md:h-12"
                        />
                      </div>
                      <div className="border-l-2 pl-2 border-neutral-500">
                        <div>{dashboardTypes.autisticDisability}</div>
                        <div className="text-neutral-400">ทางการเรียนรู้</div>
                      </div>
                    </div>
                    <div className=" rounded-lg p-2  w-full flex">
                      <div className="pr-4">
                        <img
                          src={Window}
                          alt="Window"
                          className="object-cover  w-20 h-20 md:w-12 md:h-12"
                        />
                      </div>
                      <div className="border-l-2 pl-2 border-neutral-500">
                        <div>{dashboardTypes.moreThanOneTypeOfDisability}</div>
                        <div className="text-neutral-400">พิการมากกว่า 1 ประเภท</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p>ไม่มีข้อมูลของตารางประวัติข้อมูลสุขภาพ</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 p-2">
              <div className="rounded-lg p-2  w-full text-start bg-neutral-50">
                จำนวนผู้พิการตามหมู่บ้าน
                <div style={{ width: "100%", height: 300 }}>
                  {dashboardBarVillage ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p>Loading data...</p>
                  )}
                </div>
              </div>
              <div>
                <PieChart
                  className="bg-neutral-50 p-2 rounded-lg "
                  // series={[{data:dashboardVillage}]}
                  series={[
                    {
                      data: dashboardVillage,
                      innerRadius: 150,
                      outerRadius: 80,
                      paddingAngle: 0,
                      cornerRadius: 5,
                      startAngle: -180,
                      endAngle: 225,
                      cx: 200,
                      cy: 180,
                    },
                  ]}
                  width={600}
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
