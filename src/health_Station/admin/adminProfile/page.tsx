import { useState } from "react";
import AdminNavbar from "../../../components/navbarAdmin/adminNavbar";
import AdminSidebar from "../../../components/navbarAdmin/adminSidebar";


interface FormData {
  ssd: number;
  firstname: string;
  lastname: string;
  sex: string;
  age: number;
  birthday_date: Date;
  num_of_house: number;
  group_of_house: number;
  alley_of_house: string;
  street_of_house: string;
  tambon: string;
  amphoe: string;
  province: string;
  postcode: number;
  phone: number;
  line_id: string;
  education_level: string;
  email: string;
  career: string;
  caregiver: string;
  operating_area: string;
}

const AdminProflile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    ssd: 0,
    firstname: "",
    lastname: "",
    sex: "",
    age: 0,
    birthday_date: new Date(),
    num_of_house: 0,
    group_of_house: 0,
    alley_of_house: "",
    street_of_house: "",
    tambon: "",
    amphoe: "",
    province: "",
    postcode: 0,
    phone: 0,
    line_id: "",
    education_level: "",
    email: "",
    career: "",
    caregiver: "",
    operating_area: "",
  });


  return (
    <div className="h-screen">
      <AdminNavbar />
      <div className="flex">
        <div className="flex-1 ">
          <AdminSidebar/>
        </div>

      </div>
    </div>
  );
};

export default AdminProflile;
