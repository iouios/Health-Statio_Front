import React, { useState } from "react";

interface FormData {
  birthday_date: string;
  age: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    birthday_date: "",
    age: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // อัปเดตค่าใน formData
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      age: name === "birthday_date" ? calculateAge(value) : prevData.age,
    }));
  };

  // ฟังก์ชันคำนวณอายุ
  const calculateAge = (birthday: string): string => {
    const birthdayDate = new Date(birthday);
    const today = new Date();

    if (!isNaN(birthdayDate.getTime())) {
      let age = today.getFullYear() - birthdayDate.getFullYear();
      const monthDiff = today.getMonth() - birthdayDate.getMonth();

      // ปรับอายุถ้าควันเกิดยังไม่ถึงปีนี้
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdayDate.getDate())) {
        age -= 1;
      }

      return age.toString();
    }
    return "";
  };

  return (
    <div>
      <div>
        <label htmlFor="birthday_date">วัน/เดือน/ปีเกิด</label>
        <input
          type="date"
          id="birthday_date"
          name="birthday_date"
          value={formData.birthday_date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="age">อายุ</label>
        <input
          id="age"
          name="age"
          value={formData.age} // แสดงค่าอายุใน input
          readOnly
        />
      </div>
    </div>
  );
};

export default MyForm;
