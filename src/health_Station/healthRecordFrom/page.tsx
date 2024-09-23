import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.png";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

interface Input {
  id: number;
  label: string;
  value: string;
}

// ประกาศประเภทข้อมูลของฟอร์ม
interface FormData {
  ssd: string;
  physical_body_types: string;
  elderly_group: string;
  type_of_disability: string;
  cause_of_disability: string;
  financial_support: string;
  medical_treatment_rights: string;
  assistive_equipment: string;
  ability_to_carry_out_daily_activities: string;
  need_for_assistance: string;
  education_and_training: string;
  career_and_work: string;
  congenital_disease: string;
  history_of_illness: string;
  year: string;
  hospital: string;
  drug_name: string;
  drug_allergic_reactions: string;
  food_name: string;
  food_allergic_reactions: string;
}

// ประกาศประเภทข้อมูลของข้อผิดพลาด
interface Errors {
  ssd?: string;
  physical_body_types?: string;
  elderly_group?: string;
  type_of_disability?: string;
  cause_of_disability?: string;
  financial_support?: string;
  medical_treatment_rights?: string;
  assistive_equipment?: string;
  ability_to_carry_out_daily_activities?: string;
  need_for_assistance?: string;
  education_and_training?: string;
  career_and_work?: string;
  congenital_disease?: string;
  history_of_illness?: string;
  year?: string;
  hospital?: string;
  drug_name?: string;
  drug_allergic_reactions?: string;
  food_name?: string;
  food_allergic_reactions?: string;
}

interface Input {
  id: number;
  type: "surgery" | "drugAllergy" | "foodAllergy";
  label: string;
  value: string;
}

const validationSchema = Yup.object().shape({
  ssd: Yup.string().required("กรุณากรอกเลขประจำตัวประชาชน"),
  physical_body_types: Yup.string().required("กรุณากรอกเพศ"),
  elderly_group: Yup.string().required("กรุณาเลือกกลุ่มอายุ"),
  type_of_disability: Yup.string().required("กรุณากรอกประเภทความบกพร่อง"),
  cause_of_disability: Yup.string().required("กรุณากรอกสาเหตุของความบกพร่อง"),
  financial_support: Yup.string().required(
    "กรุณากรอกข้อมูลการสนับสนุนทางการเงิน"
  ),
  medical_treatment_rights: Yup.string().required(
    "กรุณากรอกสิทธิการรักษาพยาบาล"
  ),
  assistive_equipment: Yup.string().required("กรุณากรอกข้อมูลอุปกรณ์ช่วยเหลือ"),
  ability_to_carry_out_daily_activities: Yup.string().required(
    "กรุณากรอกความสามารถในการทำกิจกรรมประจำวัน"
  ),
  need_for_assistance: Yup.string().required(
    "กรุณากรอกความต้องการความช่วยเหลือ"
  ),
  education_and_training: Yup.string().required(
    "กรุณากรอกข้อมูลการศึกษาและการฝึกอบรม"
  ),
  career_and_work: Yup.string().required("กรุณากรอกข้อมูลอาชีพและการทำงาน"),
  congenital_disease: Yup.string().required("กรุณากรอกโรคพันธุกรรม"),
  history_of_illness: Yup.string().required("กรุณากรอกประวัติการเจ็บป่วย"),
  surgery_history: Yup.boolean().required(
    "กรุณาเลือกข้อมูลเกี่ยวกับประวัติการผ่าตัด"
  ),
  surgery_details: Yup.array().of(
    Yup.object().shape({
      year: Yup.string().required("กรุณากรอกปีที่ทำการผ่าตัด"),
      hospital: Yup.string().required("กรุณากรอกชื่อโรงพยาบาล"),
    })
  ),
  drug_allergy_history: Yup.boolean().required(
    "กรุณาเลือกข้อมูลเกี่ยวกับประวัติการแพ้ยา"
  ),
  drug_allergy_details: Yup.array().of(
    Yup.object().shape({
      drug_name: Yup.string().required("กรุณากรอกชื่อยา"),
      drug_allergic_reactions: Yup.string().required("กรุณากรอกอาการแพ้ยา"),
    })
  ),
  history_of_food_allergies: Yup.boolean().required(
    "กรุณาเลือกข้อมูลเกี่ยวกับประวัติการแพ้อาหาร"
  ),
  history_of_food_details: Yup.array().of(
    Yup.object().shape({
      food_name: Yup.string().required("กรุณากรอกชื่ออาหาร"),
      food_allergic_reactions: Yup.string().required("กรุณากรอกอาการแพ้อาหาร"),
    })
  ),
});

// คอมโพเนนต์หลัก
const HealthRecordForm: React.FC = () => {
  // Initialize state with complete object matching FormData type
  const [formData, setFormData] = useState<FormData>({
    ssd: "",
    physical_body_types: "",
    elderly_group: "",
    type_of_disability: "",
    cause_of_disability: "",
    financial_support: "",
    medical_treatment_rights: "",
    assistive_equipment: "",
    ability_to_carry_out_daily_activities: "",
    need_for_assistance: "",
    education_and_training: "",
    career_and_work: "",
    congenital_disease: "",
    history_of_illness: "",
    year: "",
    hospital: "",
    drug_name: "",
    drug_allergic_reactions: "",
    food_name: "",
    food_allergic_reactions: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showAdditionalDiv, setShowAdditionalDiv] = useState<boolean>(false);
  const [surgeryInputs, setSurgeryInputs] = useState<Input[]>([]);
  const [drugAllergyInputs, setDrugAllergyInputs] = useState<Input[]>([]);
  const [foodAllergyInputs, setFoodAllergyInputs] = useState<Input[]>([]);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const isNormalHealth = value === "สุขภาวะปกติ";

      const newFormData = {
        ...prevFormData,
        [name]: value,
      };

      if (name === "physical_body_types") {
        setShowAdditionalDiv(value === "มีความพิการ");

        // รีเซ็ตข้อมูลผู้พิการเป็นค่าเริ่มต้นถ้าเลือก "สุขภาวะปกติ"
        if (isNormalHealth) {
          return {
            ...newFormData,
            elderly_group: "-",
            type_of_disability: "-",
            cause_of_disability: "-",
            financial_support: "-",
            medical_treatment_rights: "-",
            assistive_equipment: "-",
            ability_to_carry_out_daily_activities: "-",
            need_for_assistance: "-",
            education_and_training: "-",
            career_and_work: "-",
            congenital_disease: prevFormData.congenital_disease,
            history_of_illness: prevFormData.history_of_illness,
            year: prevFormData.year,
            hospital: prevFormData.hospital,
            drug_name: prevFormData.drug_name,
            drug_allergic_reactions: prevFormData.drug_allergic_reactions,
            food_name: prevFormData.food_name,
            food_allergic_reactions: prevFormData.food_allergic_reactions,
          };
        }
      }

      return newFormData;
    });
  };

  // const handleChangeRadio = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   names: string
  // ) => {
  //   const value = event.target.value;

  //   console.log(`${names}:`, value);

  //   if (names === "foodAllergy") {
  //     setFoodAllergyInputs(any);
  //   } else if (names === "drugAllergy") {
  //     setDrugAllergyInputs(value);
  //   } else if (names === "surgery") {
  //     setSurgeryInputs(value);
  //   }
  // };

  const addSurgeryInput = () => {
    const newId = surgeryInputs.length + 1;
    const newInputs: Input[] = [
      { id: newId, type: "surgery", label: "เมื่อ พ.ศ.", value: "" },
      { id: newId + 1, type: "surgery", label: "โรงพยาบาล", value: "" },
    ];
    setSurgeryInputs((prevInputs) => [...prevInputs, ...newInputs]);
  };

  // ฟังก์ชันในการเพิ่มฟิลด์ข้อมูลสำหรับการแพ้ยา
  const addDrugAllergyInput = () => {
    const newId = drugAllergyInputs.length + 1;
    const newInputs: Input[] = [
      { id: newId, type: "drugAllergy", label: "ชื่อยา", value: "" },
      { id: newId + 1, type: "drugAllergy", label: "อาการที่แพ้", value: "" },
    ];
    setDrugAllergyInputs((prevInputs) => [...prevInputs, ...newInputs]);
  };

  // ฟังก์ชันในการเพิ่มฟิลด์ข้อมูลสำหรับการแพ้อาหาร
  const addFoodAllergyInput = () => {
    const newId = foodAllergyInputs.length + 1;
    const newInputs: Input[] = [
      { id: newId, type: "foodAllergy", label: "ชื่ออาหาร", value: "" },
      { id: newId + 1, type: "foodAllergy", label: "อาการที่แพ้", value: "" },
    ];
    setFoodAllergyInputs((prevInputs) => [...prevInputs, ...newInputs]);
  };
  const handleInputChange = (
    type: "surgery" | "drugAllergy" | "foodAllergy",
    id: number,
    value: string
  ) => {
    switch (type) {
      case "surgery":
        setSurgeryInputs((prevInputs) =>
          prevInputs.map((input) =>
            input.id === id ? { ...input, value } : input
          )
        );
        break;
      case "drugAllergy":
        setDrugAllergyInputs((prevInputs) =>
          prevInputs.map((input) =>
            input.id === id ? { ...input, value } : input
          )
        );
        break;
      case "foodAllergy":
        setFoodAllergyInputs((prevInputs) =>
          prevInputs.map((input) =>
            input.id === id ? { ...input, value } : input
          )
        );
        break;
    }
  };
  // const handleSubmitRecord = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // จัดการข้อมูลตามประเภท
  //   const surgeryDetails = [];
  //   const drugAllergyDetails = [];
  //   const foodAllergyDetails = [];

  //   for (let i = 0; i < surgeryInputs.length; i += 2) {
  //     const yearInput = surgeryInputs[i];
  //     const hospitalInput = surgeryInputs[i + 1];
  //     if (yearInput && hospitalInput) {
  //       surgeryDetails.push({
  //         year: yearInput.value,
  //         hospital: hospitalInput.value,
  //       });
  //     }
  //   }

  //   for (let i = 0; i < drugAllergyInputs.length; i += 2) {
  //     const drugNameInput = drugAllergyInputs[i];
  //     const reactionInput = drugAllergyInputs[i + 1];
  //     if (drugNameInput && reactionInput) {
  //       drugAllergyDetails.push({
  //         drug_name: drugNameInput.value,
  //         drug_allergic_reactions: reactionInput.value,
  //       });
  //     }
  //   }

  //   for (let i = 0; i < foodAllergyInputs.length; i += 2) {
  //     const foodNameInput = foodAllergyInputs[i];
  //     const reactionInput = foodAllergyInputs[i + 1];
  //     if (foodNameInput && reactionInput) {
  //       foodAllergyDetails.push({
  //         food_name: foodNameInput.value,
  //         food_allergic_reactions: reactionInput.value,
  //       });
  //     }
  //   }

  //   // สร้างข้อมูลที่จะส่ง
  //   const formDataToValidate = {
  //     ...formData,
  //     surgery_history: surgeryInputs.length > 0,
  //     surgery_details: surgeryDetails,
  //     drug_allergy_history: drugAllergyInputs.length > 0,
  //     drug_allergy_details: drugAllergyDetails,
  //     history_of_food_allergies: foodAllergyInputs.length > 0,
  //     history_of_food_details: foodAllergyDetails,
  //   };

  //   // ตรวจสอบข้อมูลโดยใช้ Yup
  //   validationSchema
  //     .validate(formDataToValidate, { abortEarly: false })
  //     .then(() => {
  //       // ข้อมูลถูกต้อง
  //       // ส่งข้อมูล (ที่นี่เราจะแค่พิมพ์ในคอนโซล)
  //       // คุณสามารถส่งข้อมูลไปยังเซิร์ฟเวอร์ได้ที่นี่
  //       // เช่น
  //       // fetch('/api/save-form', {
  //       //   method: 'POST',
  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //   },
  //       //   body: JSON.stringify(formDataToValidate),
  //       // }).then(response => response.json())
  //       //   .then(data => console.log('Success:', data))
  //       //   .catch(error => console.error('Error:', error));
  //     })
  //     try {
  //       await validationSchema.validate(formData, { abortEarly: false });
  //       console.log("Form Submitted", formData , formDataToValidate);
  //     } catch (error) {
  //       const newErrors: Errors = {};

  //       if (error instanceof Yup.ValidationError) {
  //         error.inner.forEach((err) => {
  //           if (err.path) newErrors[err.path as keyof Errors] = err.message;
  //         });
  //       }

  //       setErrors(newErrors);
  //     }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNormalHealth = formData.physical_body_types === "สุขภาวะปกติ";

    const surgeryDetails = isNormalHealth
      ? []
      : surgeryInputs
          .map((input, i) => {
            if (i % 2 === 0) {
              const yearInput = input;
              const hospitalInput = surgeryInputs[i + 1];
              return yearInput && hospitalInput
                ? {
                    year: yearInput.value,
                    hospital: hospitalInput.value,
                  }
                : null;
            }
            return null;
          })
          .filter(Boolean);

    const drugAllergyDetails = isNormalHealth
      ? []
      : drugAllergyInputs
          .map((input, i) => {
            if (i % 2 === 0) {
              const drugNameInput = input;
              const reactionInput = drugAllergyInputs[i + 1];
              return drugNameInput && reactionInput
                ? {
                    drug_name: drugNameInput.value,
                    drug_allergic_reactions: reactionInput.value,
                  }
                : null;
            }
            return null;
          })
          .filter(Boolean);

    const foodAllergyDetails = isNormalHealth
      ? []
      : foodAllergyInputs
          .map((input, i) => {
            if (i % 2 === 0) {
              const foodNameInput = input;
              const reactionInput = foodAllergyInputs[i + 1];
              return foodNameInput && reactionInput
                ? {
                    food_name: foodNameInput.value,
                    food_allergic_reactions: reactionInput.value,
                  }
                : null;
            }
            return null;
          })
          .filter(Boolean);

    // ใช้ "-" เป็นค่าเริ่มต้นเฉพาะฟิลด์ที่ต้องการ
    const formDataToValidate = {
      ...formData,
      type_of_disability: isNormalHealth ? "-" : formData.type_of_disability,
      cause_of_disability: isNormalHealth ? "-" : formData.cause_of_disability,
      financial_support: isNormalHealth ? "-" : formData.financial_support,
      medical_treatment_rights: isNormalHealth
        ? "-"
        : formData.medical_treatment_rights,
      assistive_equipment: isNormalHealth ? "-" : formData.assistive_equipment,
      ability_to_carry_out_daily_activities: isNormalHealth
        ? "-"
        : formData.ability_to_carry_out_daily_activities,
      need_for_assistance: isNormalHealth ? "-" : formData.need_for_assistance,
      education_and_training: isNormalHealth
        ? "-"
        : formData.education_and_training,
      career_and_work: isNormalHealth ? "-" : formData.career_and_work,
      congenital_disease: formData.congenital_disease,
      history_of_illness: formData.history_of_illness,
      year: formData.year,
      hospital: formData.hospital,
      drug_name: formData.drug_name,
      drug_allergic_reactions: formData.drug_allergic_reactions,
      food_name: formData.food_name,
      food_allergic_reactions: formData.food_allergic_reactions,

      surgery_history: !isNormalHealth && surgeryInputs.length > 0,
      surgery_details: surgeryDetails,
      drug_allergy_history: !isNormalHealth && drugAllergyInputs.length > 0,
      drug_allergy_details: drugAllergyDetails,
      history_of_food_allergies:
        !isNormalHealth && foodAllergyInputs.length > 0,
      history_of_food_details: foodAllergyDetails,
    };

    try {
      await validationSchema.validate(formDataToValidate, {
        abortEarly: false,
      });
      console.log("Form Submitted", formDataToValidate);
    } catch (error) {
      const newErrors: Errors = {};

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) newErrors[err.path as keyof Errors] = err.message;
        });
      }

      setErrors(newErrors);
      console.error("Validation Errors:", newErrors);
    }
  };

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
        <div className="md:bg-neutral-100 w-full p-4">
          <div className="bg-white p-2">
            <div className="flex-initial md:bg-white">
              <div className="flex p-4 ">
                <Link to="/Health_Station">
                  <button className="mr-2 ">
                    <img
                      src={icon}
                      alt="icon"
                      className="object-cover h-3 mt-3 mr-1 md:place-items-start"
                    />
                  </button>
                </Link>
                <div className="text-2xl">แบบบันทึกข้อมูลสุขภาพ</div>
              </div>
              <div className="items-start w-full mt-3 p-2">
                <label htmlFor="ssd" className="relative">
                  เลขประจำตัวประชาชน
                  <span className="text-red-500 absolute">*</span>
                </label>
                <input
                  className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                  id="idssd"
                  name="ssd"
                  placeholder="เลขประจำตัวประชาชน"
                  onChange={handleChange}
                  value={formData.ssd}
                />
                {errors.ssd && (
                  <div className="text-red-500 text-sm mt-1">{errors.ssd}</div>
                )}
              </div>
              <div className="items-start w-full p-2">
                <label htmlFor="physical_body_types" className="relative">
                  ประเภทความบกพร่องทางร่างกาย
                  <span className="text-red-500 absolute">*</span>
                </label>
                <select
                  name="physical_body_types"
                  id="idphysical_body_types"
                  onChange={handleChange}
                  value={formData.physical_body_types}
                  className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                >
                  <option value="">ประเภทความบกพร่องทางร่างกาย</option>
                  <option value="มีความพิการ">มีความพิการ</option>
                  <option value="สุขภาวะปกติ">สุขภาวะปกติ</option>
                </select>
                {errors.physical_body_types && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.physical_body_types}
                  </div>
                )}
                {showAdditionalDiv && (
                  <div className="mt-4 pb-4 ">
                    <Accordion className="bg-blue-500 ">
                      <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography>ข้อมูลความพิการ</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className="md:p-4 md:grid gap-4">
                            <div className="items-start w-full">
                              <label
                                htmlFor="elderly_group"
                                className="relative"
                              >
                                กลุ่มภาวะผู้สูงอายุ
                                <span className="text-red-500 absolute">*</span>
                              </label>
                              <select
                                name="elderly_group"
                                id="idelderly_group"
                                onChange={handleChange}
                                value={formData.elderly_group}
                                className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                              >
                                <option value="">กลุ่มภาวะผู้สูงอายุ</option>
                                <option value="กลุ่มผู้สูงอายุติดเตียง  ADL 0-4 คะแนน">
                                  กลุ่มผู้สูงอายุติดเตียง ADL 0-4 คะแนน
                                </option>
                                <option value="กลุ่มผู้สูงอายุติดบ้าน   ADL 5-11 คะแนน">
                                  กลุ่มผู้สูงอายุติดบ้าน ADL 5-11 คะแนน
                                </option>
                                <option value="กลุ่มผู้สูงอายุติดบ้าน   ADL  12 คะแนน">
                                  กลุ่มผู้สูงอายุติดบ้าน ADL 12 คะแนน
                                </option>
                              </select>
                              {errors.elderly_group && (
                                <div className="text-red-500 text-sm mt-1">
                                  {errors.elderly_group}
                                </div>
                              )}
                            </div>
                            <div className="">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="type_of_disability"
                                    className="relative"
                                  >
                                    ประเภทของความพิการ
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <select
                                    name="type_of_disability"
                                    id="idtype_of_disability"
                                    onChange={handleChange}
                                    value={formData.type_of_disability}
                                    className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                  >
                                    <option value="">ประเภทของความพิการ</option>
                                    <option value="ทางการเคลื่อนไหว">
                                      ทางการเคลื่อนไหว
                                    </option>
                                    <option value="ทางการมองเห็น">
                                      ทางการมองเห็น
                                    </option>
                                    <option value="ทางการได้ยินและสื่อความหมาย">
                                      ทางการได้ยินและสื่อความหมาย
                                    </option>
                                    <option value="ทางจิตใจและพฤติกรรม">
                                      ทางจิตใจและพฤติกรรม
                                    </option>
                                    <option value="ทางสติปัญญา">
                                      ทางสติปัญญา
                                    </option>
                                    <option value="ทางการเรียนรู้">
                                      ทางการเรียนรู้
                                    </option>
                                    <option value="ทางออทิสติค">
                                      ทางออทิสติค
                                    </option>
                                    <option value="พิการมากกว่า 1 ประเภท">
                                      พิการมากกว่า 1 ประเภท
                                    </option>
                                  </select>
                                  {errors.type_of_disability && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.type_of_disability}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-4 ">
                                  <label
                                    htmlFor="cause_of_disability"
                                    className="relative"
                                  >
                                    สาเหตุของความพิการ
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <input
                                    className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                                    id="idcause_of_disability"
                                    name="cause_of_disability"
                                    placeholder="สาเหตุของความพิการ"
                                    onChange={handleChange}
                                    value={formData.cause_of_disability}
                                  />
                                  {errors.cause_of_disability && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.cause_of_disability}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="financial_support"
                                    className="relative"
                                  >
                                    การสนับสนุนทางการเงิน
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <select
                                    name="financial_support"
                                    id="idfinancial_support"
                                    onChange={handleChange}
                                    value={formData.financial_support}
                                    className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                  >
                                    <option value="">
                                      การสนับสนุนทางการเงิน
                                    </option>
                                    <option value="เงินสงเคราะห์">
                                      เงินสงเคราะห์
                                    </option>
                                    <option value="กู้ยืมเงินเพื่อประกอบวิชาชีพ">
                                      กู้ยืมเงินเพื่อประกอบวิชาชีพ
                                    </option>
                                  </select>
                                  {errors.financial_support && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.financial_support}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="medical_treatment_rights"
                                    className="relative"
                                  >
                                    สิทธิการรักษาพยาบาล
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <select
                                    name="medical_treatment_rights"
                                    id="idmedical_treatment_rights"
                                    onChange={handleChange}
                                    value={formData.medical_treatment_rights}
                                    className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                  >
                                    <option value="">
                                      สิทธิการรักษาพยาบาล
                                    </option>
                                    <option value="ต้องการช่วยเหลือ">
                                      ต้องการช่วยเหลือ
                                    </option>
                                    <option value="ช่วยเหลือตัวเองได้">
                                      ช่วยเหลือตัวเองได้
                                    </option>
                                  </select>
                                  {errors.medical_treatment_rights && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.medical_treatment_rights}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-3">
                                  <label
                                    htmlFor="assistive_equipment"
                                    className="relative"
                                  >
                                    อุปกรณ์ช่วยเหลือ
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <input
                                    className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                                    id="idassistive_equipment"
                                    name="assistive_equipment"
                                    placeholder="อุปกรณ์ช่วยเหลือ"
                                    value={formData.assistive_equipment}
                                    onChange={handleChange}
                                  />
                                  {errors.assistive_equipment && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.assistive_equipment}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="ability_to_carry_out_daily_activities"
                                    className="relative"
                                  >
                                    ความสามารถในการทำกิจวัตรประจำวัน
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <select
                                    name="ability_to_carry_out_daily_activities"
                                    id="idability_to_carry_out_daily_activities"
                                    onChange={handleChange}
                                    value={
                                      formData.ability_to_carry_out_daily_activities
                                    }
                                    className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                  >
                                    <option value="">
                                      ความสามารถในการทำกิจวัตรประจำวัน
                                    </option>
                                    <option value="ต้องการช่วยเหลือ">
                                      ต้องการช่วยเหลือ
                                    </option>
                                    <option value="ช่วยเหลือตัวเองได้">
                                      ช่วยเหลือตัวเองได้
                                    </option>
                                  </select>
                                  {errors.ability_to_carry_out_daily_activities && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {
                                        errors.ability_to_carry_out_daily_activities
                                      }
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="education_and_training"
                                    className="relative"
                                  >
                                    การศึกษาและการฝึกอบรม
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <input
                                    className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                                    id="ideducation_and_training"
                                    name="education_and_training"
                                    placeholder="ที่อยู่บ้านเลขที่"
                                    value={formData.education_and_training}
                                    onChange={handleChange}
                                  />
                                  {errors.education_and_training && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.education_and_training}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="career_and_work"
                                    className="relative"
                                  >
                                    อาชีพและการทำงาน
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <input
                                    className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                                    id="idcareer_and_work"
                                    name="career_and_work"
                                    placeholder="ที่อยู่บ้านเลขที่"
                                    value={formData.career_and_work}
                                    onChange={handleChange}
                                  />
                                  {errors.career_and_work && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.career_and_work}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="items-start w-full mt-4">
                              <label
                                htmlFor="need_for_assistance"
                                className="relative"
                              >
                                ความต้องการการช่วยเหลือ
                                <span className="text-red-500 absolute">*</span>
                              </label>
                              <select
                                name="need_for_assistance"
                                id="idneed_for_assistance"
                                onChange={handleChange}
                                // value={formData.}
                                className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                              >
                                <option value="">
                                  ความต้องการการช่วยเหลือ
                                </option>
                                <option value="ต้องการ">ต้องการ</option>
                                <option value="ไม่ต้องการ">ไม่ต้องการ</option>
                              </select>
                              {/* {errors. && (
                                      <div className="text-red-500 text-sm mt-1">
                                        {errors.}
                                      </div>
                                    )} */}
                            </div>
                          </div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )}
              </div>
            </div>
            <Accordion className="bg-blue-500 m-2">
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>ข้อมูลสุขภาพพื้นฐาน</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="md:p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full md:mb-0">
                        <label
                          htmlFor="congenital_disease"
                          className="relative"
                        >
                          โรคประจำตัว
                          <span className="text-red-500 absolute">*</span>
                        </label>
                        <input
                          className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                          id="idcongenital_disease"
                          name="congenital_disease"
                          placeholder="โรคประจำตัว"
                          onChange={handleChange}
                          value={formData.congenital_disease}
                        />
                        {errors.congenital_disease && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.congenital_disease}
                          </div>
                        )}
                      </div>
                      <div className="">
                        <div className="w-full md:mb-0">
                          <label
                            htmlFor="history_of_illness"
                            className="relative"
                          >
                            ประวัติการเจ็บป่วย
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idhistory_of_illness"
                            name="history_of_illness"
                            placeholder="ประวัติการเจ็บป่วย"
                            onChange={handleChange}
                            value={formData.history_of_illness}
                          />
                          {errors.history_of_illness && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.history_of_illness}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                    <div className="flex p-2 pt-2">
                      <div className="mt-2 mr-2">ประวัติการผ่าตัด</div>
                      <Box>
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="surgery-options"
                            name="surgeryOptions"
                            // onChange={(e) => handleChangeRadio(e, "surgery")}
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <FormControlLabel
                                value="มี"
                                control={<Radio />}
                                label="มี"
                              />
                              <FormControlLabel
                                value="ไม่มี"
                                control={<Radio />}
                                label="ไม่มี"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full md:mb-0">
                        <label htmlFor="year" className="relative">
                          เมื่อ พ.ศ.
                          <span className="text-red-500 absolute">*</span>
                        </label>
                        <input
                          className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                          id="idyear"
                          name="year"
                          placeholder="เมื่อ พ.ศ."
                          onChange={handleChange}
                          value={(formData as any).year || ""}
                        />
                        {errors.year && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.year}
                          </div>
                        )}
                      </div>
                      <div className="">
                        <div className="w-full md:mb-0">
                          <label htmlFor="hospital" className="relative">
                            โรงพยาบาล
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idhospital"
                            name="hospital"
                            placeholder="โรงพยาบาล"
                            onChange={handleChange}
                            value={(formData as any).hospital || ""}
                          />
                          {errors.hospital && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.hospital}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                    <div className="mt-4">
                      <button className="" onClick={addSurgeryInput}>
                        +เพิ่มประวัติการผ่าตัด
                      </button>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {surgeryInputs.map((input) => (
                          <div key={input.id} className="w-full">
                            <label
                              className="block mb-1"
                              htmlFor={`surgery_${input.id}`}
                            >
                              {input.label}:
                            </label>
                            <input
                              type="text"
                              id={`surgery_${input.id}`}
                              value={input.value}
                              onChange={(e) =>
                                handleInputChange(
                                  "surgery",
                                  input.id,
                                  e.target.value
                                )
                              }
                              className="border-2 border-gray-300 p-2 w-full bg-gray-100"
                              placeholder={input.label}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex p-2">
                      <div className="mt-2 mr-2">ประวัติการแพ้ยา</div>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="drug-allergy-options"
                          name="drugAllergyOptions"
                          // onChange={(e) => handleChangeRadio(e, "drugAllergy")}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <FormControlLabel
                              value="มี"
                              control={<Radio />}
                              label="มี"
                            />
                            <FormControlLabel
                              value="ไม่มี"
                              control={<Radio />}
                              label="ไม่มี"
                            />
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full md:mb-0">
                        <label htmlFor="drug_name" className="relative">
                          ชื่อยา
                          <span className="text-red-500 absolute">*</span>
                        </label>
                        <input
                          className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                          id="iddrug_name"
                          name="drug_name"
                          placeholder="ชื่อยา"
                          onChange={handleChange}
                          value={(formData as any).drug_name || ""}
                        />
                        {errors.drug_name && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.drug_name}
                          </div>
                        )}
                      </div>
                      <div className="">
                        <div className="w-full md:mb-0">
                          <label
                            htmlFor="drug_allergic_reactions"
                            className="relative"
                          >
                            อาการที่แพ้
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="iddrug_allergic_reactions"
                            name="drug_allergic_reactions"
                            placeholder="อาการที่แพ้"
                            onChange={handleChange}
                          />
                          {errors.drug_allergic_reactions && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.drug_allergic_reactions}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                    <div className="mt-4">
                      <button
                        className=""
                        onClick={addDrugAllergyInput}
                      >
                        + เพิ่มประวัติการแพ้ยา
                      </button>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {drugAllergyInputs.map((input) => (
                          <div key={input.id} className="w-full">
                            <label
                              className="block mb-1"
                              htmlFor={`drug_${input.id}`}
                            >
                              {input.label}:
                            </label>
                            <input
                              type="text"
                              id={`drug_${input.id}`}
                              value={input.value}
                              onChange={(e) =>
                                handleInputChange(
                                  "drugAllergy",
                                  input.id,
                                  e.target.value
                                )
                              }
                              className="border-2 border-gray-300 p-2 w-full bg-gray-100"
                              placeholder={input.label}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex p-2">
                      <div className="mt-2 mr-2">ประวัติการแพ้อาหาร</div>
                      <Box>
                        {/* First RadioGroup */}
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="food-allergy-options"
                            name="foodAllergyOptions"
                            // value={foodAllergyOptions}
                            // onChange={(e) =>
                            //   handleChangeRadio(e, "foodAllergy")
                            // }
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <FormControlLabel
                                value="มี"
                                control={<Radio />}
                                label="มี"
                              />
                              <FormControlLabel
                                value="ไม่มี"
                                control={<Radio />}
                                label="ไม่มี"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full md:mb-0">
                        <label htmlFor="food_name" className="relative">
                          ชื่ออาหาร
                          <span className="text-red-500 absolute">*</span>
                        </label>
                        <input
                          className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                          id="idfood_name"
                          name="food_name"
                          placeholder="ชื่ออาหาร"
                          onChange={handleChange}
                          value={formData.food_name}
                        />
                        {errors.food_name && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.food_name}
                          </div>
                        )}
                      </div>
                      <div className="">
                        <div className="w-full md:mb-0">
                          <label
                            htmlFor="food_allergic_reactions"
                            className="relative"
                          >
                            อาการที่แพ้
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idfood_allergic_reactions"
                            name="food_allergic_reactions"
                            placeholder="อาการที่แพ้"
                            onChange={handleChange}
                            value={formData.food_allergic_reactions}
                          />
                          {errors.food_allergic_reactions && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.food_allergic_reactions}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                    <div className="mt-4">
                      <button
                        className=""
                        onClick={addFoodAllergyInput}
                      >
                        + เพิ่มประวัติการแพ้อาหาร
                      </button>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {foodAllergyInputs.map((input) => (
                          <div key={input.id} className="w-full">
                            <label
                              className="block mb-1"
                              htmlFor={`food_${input.id}`}
                            >
                              {input.label}:
                            </label>
                            <input
                              type="text"
                              id={`food_${input.id}`}
                              value={input.value}
                              onChange={(e) =>
                                handleInputChange(
                                  "foodAllergy",
                                  input.id,
                                  e.target.value
                                )
                              }
                              className="border-2 border-gray-300 p-2 w-full bg-gray-100"
                              placeholder={input.label}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div className="flex items-start justify-end w-full">
              <button
                className="border-2 flex-none rounded-lg bg-blue-500 text-white p-2 md:w-36 mt-6"
                type="submit"
                onClick={handleSubmit}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordForm;
