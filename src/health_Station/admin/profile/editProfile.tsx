import { Link } from "react-router-dom";
import React, { useState,useEffect } from "react";
import AdminNavbar from "../../../components/navbarAdmin/adminNavbar";
import AdminSidebar from "../../../components/navbarAdmin/adminSidebar";
import VillageHealthWorker from "../../../components/villageHealthWorker";
import FormDataComponent from "../../../components/from/fromData"; // Corrected import
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import * as Yup from "yup";
import FormData2 from "../../../components/from/fromData2";

interface FormData {
  username: string;
  firstname: string;
  lastname: string;
  rolename: string;
  phone: string;
}

interface ProfileData {
  id: number;
  statusmaster: string;
  username: string;
  firstname: string;
  lastname: string;
  rolename: string;
  phone: number;
}


interface Errors {
  username?: string;
  firstname?: string;
  lastname?: string;
  rolename?: string;
  phone?: string;
}

const datas = [{ name: "phone", placeholder: "เบอร์โทรศัพท์", type: "text" }];

const formFields = [
  {
    name: "username",
    placeholder: "ผู้ใช้งานระบบ",
    type: "text",
  },
  { name: "firstname", placeholder: "ชื่อ", type: "text" },
  { name: "lastname", placeholder: "นามสกุล", type: "text" },
];
const validationSchema = Yup.object().shape({
  username: Yup.string().required("กรุณากรอกชื่อผู้ใช้งาน*"),
  firstname: Yup.string().required("กรุณากรอกชื่อ"),
  lastname: Yup.string().required("กรุณากรอกนามสกุล"),
  rolename: Yup.string().required("กรุณากรอกบทบาท"),
  phone: Yup.string()
    .required("กรุณากรอกเบอร์โทรศัพท์")
    .min(10, "เบอร์โทรต้องมี 10 ตัว"),
});

const users = [
  { name: "iouioZ" },
  { name: "iouioZ" },
  { name: "iouioZ" },
  { name: "iouioZ" },
  { name: "iouioZ" },
  { name: "iouioZ" },
  { name: "iouioZ" },
  { name: "iouioZ" },
];

const EditProfiles: React.FC = () => {
  const [state, setState] = useState();
  const [errors, setErrors] = useState<Errors>({});
  const [userId, setUserId] = useState<any | null>(null);
  const [profileData, setProfileData] = useState<ProfileData[] | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    firstname: "",
    lastname: "",
    rolename: "",
    phone: "",
  });
  const handleChange = (name: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      setErrors(errors);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);


  const handleClick = (id: any) => {
    setUserId(id);
  };


  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const response = await axios.post(
        "http://localhost:9999/api/users/editProfile",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Form Submitted", formData);
        setErrors({});
        window.location.href = "/admin/Proflile";
      }
    } catch (error) {
      const newErrors: Errors = {};

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) newErrors[err.path as keyof Errors] = err.message;
        });
      } else if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("API error:", error.response.data);
          const apiErrors = error.response.data.errors;
          if (apiErrors) {
            Object.keys(apiErrors).forEach((key) => {
              newErrors[key as keyof Errors] = apiErrors[key];
            });
          }
        } else if (error.request) {
          console.error("API error: No response received");
        } else {
          console.error("API error:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }

      setErrors(newErrors);
    }
  };

  const getFieldValue = (fieldName: keyof FormData): string => {
    const value = formData[fieldName];
    return value !== undefined && value !== null ? value.toString() : "";
  };

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
                  <div className="overflow-y-auto h-72">
                    {users.map((user, index) => (
                      <VillageHealthWorker key={index} name={user.name} />
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
                      <div className="">
                        <div className="flex justify-between">
                          <Link to="/admin/Profile">
                            <button
                              type="button"
                              className="bg-white text-blue-500 px-4 py-2 rounded-md border-2 border-blue-500"
                            >
                              ยกเลิก
                            </button>
                          </Link>
                          <Link to="">
                            <button
                              onClick={handleSubmit}
                              className="bg-blue-500 p-2 rounded-md text-white"
                            >
                              บันทึก
                            </button>
                          </Link>
                        </div>

                        <div className="h-screen p-4">
                          <div className="text-xl font-semibold mb-4">
                            +เพิ่มผู้ใช้งาน
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {formFields.map((field) => (
                                <div key={field.name} className="relative">
                                  <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700"
                                  ></label>
                                  <FormData2
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    value={
                                      formData[field.name as keyof FormData]
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        field.name as keyof FormData,
                                        e.target.value
                                      )
                                    }
                                  />
                                  {errors[field.name as keyof Errors] && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors[field.name as keyof Errors]}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div>
                              <label htmlFor="idrolename" className="relative">
                                บทบาท
                                <span className="text-red-500 absolute">*</span>
                              </label>
                              <select
                                name="rolename"
                                id="idrolename"
                                onChange={handleChanges}
                                value={formData.rolename}
                                className="border-2 border-b-4 flex-1 text-left pb-3 pt-2 bg-gray-100 w-full"
                              >
                                <option value="">ตำแหน่งงาน</option>
                                <option value="เจ้าหน้าที่">เจ้าหน้าที่</option>
                                <option value="อสม.">อสม.</option>
                              </select>
                              {errors.rolename && (
                                <div className="text-red-500 text-sm mt-1">
                                  {errors.rolename}
                                </div>
                              )}
                            </div>
                            <div className="mt-4">
                              {datas.map((field) => (
                                <div key={field.name} className="relative">
                                  <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700"
                                  ></label>
                                  <span className="text-red-500 absolute ml-24">
                                    *
                                  </span>
                                  <FormDataComponent
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    value={
                                      formData[field.name as keyof FormData]
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        field.name as keyof FormData,
                                        e.target.value
                                      )
                                    }
                                  />

                                  {errors[field.name as keyof Errors] && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors[field.name as keyof Errors]}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            
                          </form>
                        </div>
                      </div>
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

export default EditProfiles;
