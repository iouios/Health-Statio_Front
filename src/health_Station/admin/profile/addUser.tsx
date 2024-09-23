import React, { useState } from 'react';
import FormDataComponent from '../../../components/from/fromData';
import { Link } from "react-router-dom";
import { Password } from '@mui/icons-material';

interface FormData {
    Userfirstname: string;
    password: string;
    firstname: string;
    lastname: string;
    role: string;
    phone: number;
  }

const data = [
  {
    id: "1",
    name: "เลขประจำตัวประชาชน",
    placeholder: "เลขประจำตัวประชาชน",
    type: "number",
  },
  {
    id: "2",
    name: "ชื่อ",
    placeholder: "ชื่อ",
    type: "text",
  },
  {
    id: "3",
    name: "นามสกุล",
    placeholder: "นามสกุล",
    type: "text",
  },
  {
    id: "4",
    name: "นามสกุล",
    placeholder: "นามสกุล",
    type: "text",
  },
  {
    id: "5",
    name: "นามสกุล",
    placeholder: "นามสกุล",
    type: "text",
  },
  {
    id: "6",
    name: "นามสกุล",
    placeholder: "นามสกุล",
    type: "text",
  },
  // Add other fields as needed
];

const AddUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Userfirstname: "",
    password: "",
    firstname: "",
    lastname: "",
    role: "",
    phone: 0,
  });
  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getFieldValue = (fieldName: keyof FormData): string => {
    const value = formData[fieldName];
    return value !== undefined && value !== null ? value.toString() : "";
  };

  return (
    <div className="h-screen p-4">
        <div>
            เพิ่มผู้ใช้งาน
        </div>
      <div>
        {data
          .filter((field) => parseInt(field.id) <= 6)
          .map((field) => (
            <FormDataComponent
              key={field.id}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
              value={getFieldValue(field.name as keyof FormData)}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ))}
      </div>
      <div>
        {/* You can add buttons or additional form controls here */}
        <button className="bg-blue-500 text-white px-4 py-2 mt-4">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddUser;
