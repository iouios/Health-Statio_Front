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
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

// Form data type
interface FormData {
  ssd: string;
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  six: number;
  seven: number;
  eight: number;
  nine: number;
  ten: number;
}

// Main component
const Daily_routine_assessment_form_ADL: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    ssd: "",
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    seven: 0,
    eight: 0,
    nine: 0,
    ten: 0,
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Change for Radio Buttons
  const handleChangeRadio = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof FormData
  ) => {
    setFormData({
      ...formData,
      [name]: parseInt(e.target.value),
    });
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Add validation and submission logic here
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
                    <svg data-testid="ArrowBackIosNewIcon"></svg>
                  </button>
                </Link>
                <div className="text-2xl">แบบบันทึกข้อมูลสุขภาพ</div>
              </div>
              <div className="items-start w-full mt-3 mb-4">
                <label htmlFor="ssd" className="relative">
                  เลขประจำตัวประชาชน
                </label>
                <input
                  className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                  id="idssd"
                  name="ssd"
                  placeholder="เลขประจำตัวประชาชน"
                  onChange={handleChange}
                  value={formData.ssd}
                />
              </div>
              <Accordion className="bg-blue-500">
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>ข้อมูลการประเมินกิจวัตรประจำวัน</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="items-start w-full mt-3 p-2">
                      <Box>
                        <FormControl component="fieldset">
                          <label htmlFor="one" className="relative">
                            การรับประทานอาหารเมื่อเตรียมสำรับไว้ให้เรียบร้อยต่อหน้า
                          </label>
                          <RadioGroup
                            aria-label="one"
                            name="one"
                            value={formData.one.toString()}
                            onChange={(e) => handleChangeRadio(e, "one")}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="0 ไม่สามารถตักอาหารเข้าปากได้"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1 ตักอาหารเองได้แต่ต้องมีคนช่วย เช่น ช่วยใช้ช้อนตักเตรียมไว้ให้หรือตัดเป็นเล็กๆไว้ล่วงหน้า"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="3 ตักอาหารและช่วยตัวเองได้เป็นปกติ"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl component="fieldset">
                          <label htmlFor="two" className="relative mt-6 mb-6">
                            ล้างหน้า หวีผม แปรงฟัน โกนหนวด ในระยะเวลา 24 - 28
                            ชั่วโมงที่ผ่านมา
                          </label>
                          <RadioGroup
                            aria-label="two"
                            name="two"
                            value={formData.two.toString()}
                            onChange={(e) => handleChangeRadio(e, "two")}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="0 ต้องการความช่วยเหลือ"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1 ทําเองได้ (รวมทั้งที่ทําได้เองถ้าเตรียมอุปกรณ์ไว้ให้)"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl component="fieldset">
                          <label htmlFor="three" className="relative mt-6 mb-6">
                            ลุกนั่งจากที่นอน หรือจากเตียง ไปยังเก้าอี้
                          </label>
                          <RadioGroup
                            aria-label="three"
                            name="three"
                            value={formData.three.toString()}
                            onChange={(e) => handleChangeRadio(e, "three")}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="0 ไม่สามารถนั่งได้ (นั่งแล้วจะล้มเสมอ) หรือต้องใช้คนสองคนช่วยกันยกขึ้น"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1 ต้องการความช่วยเหลืออย่างมากจึงจะนั่งได้ เช่น ต้องใช้คนที่แข็งแรงหรือมีทักษะ 1 คน หรือใช้คนทั่วไป 2 คนพยุงหรือดันขึ้นมาจึงจะนั่งอยู่ได้"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="2 ต้องการความช่วยเหลือบ้าง เช่น บอกให้ทําตาม หรือช่วยพยุงเล็กน้อย หรือต้องมีคนดูแลเพื่อความปลอดภัย"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="3 ทําได้เอง"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl component="fieldset">
                          <label htmlFor="four" className="relative mt-6 mb-6">
                            ใช้ห้องนํ้า
                          </label>
                          <RadioGroup
                            aria-label="four"
                            name="four"
                            value={formData.four.toString()}
                            onChange={(e) => handleChangeRadio(e, "four")}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1 ต้องการความช่วยเหลือ"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="2 ทําเองได้พอสมควร เช่น ยังต้องใช้ไม้เท้าช่วยบ้าง หรือมีปัญหาลุกขึ้นนั่งหรือยืนบ้าง แต่ถ้าอุปกรณ์ช่วยเดินไปห้องนํ้าเองได้"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="3 ช่วยตัวเองได้ตามปกติ"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl component="fieldset">
                          <label htmlFor="five" className="relative mt-6 mb-6">
                            การเคลื่อนที่ภายในห้องหรือบ้าน
                          </label>
                          <RadioGroup
                            aria-label="five"
                            name="five"
                            value={formData.five.toString()}
                            onChange={(e) => handleChangeRadio(e, "five")}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="0 เคลื่อนที่ไปไหนไม่ได้"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1 ต้องใช้รถเข็นช่วยตัวเองให้เคลื่อนที่ได้เอง (ไม่ต้องมีคนเข็นให้) และจะต้องเข้าออกมุมห้องหรือประตูได้"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="2 เดินหรือเคลื่อนที่โดยมีคน ช่วย เช่น พยุง หรือบอกให้ทําตามหรือต้องให้ความสนใจดูแลเพื่อความปลอดภัย"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="3 เดินหรือเคลื่อนที่ได้เอง"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl component="fieldset">
                          <label htmlFor="six" className="relative mt-6 mb-6">
                          การสวมใส่เสื้อผ้า
                          </label>
                          <RadioGroup
                            aria-label="six"
                            name="six"
                            value={formData.six.toString()}
                            onChange={(e) => handleChangeRadio(e, "six")}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="0 ต้องมีคนสวมใส่ให้ ช่วยตัวเองแทบไม่ได้หรือได้น้อย"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1 ช่วยตัวเองได้ประมาณร้อยละ 50 ที่เหลือต้องมีคนช่วยห้"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="2 ช่วยตัวเองได้ดี (รวมทั้งการติดกระดุม รูดซิบ หรือใช้เสื้อผ้าที่ดัดแปลงให้เหมาะสมก็ได้)"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="3 เดินหรือเคลื่อนที่ได้เอง"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl component="fieldset">
                          <label htmlFor="seven" className="relative mt-6 mb-6">
                          การขึ้นลงบันได 1 ชั้น
                          </label>
                          <RadioGroup
                            aria-label="seven"
                            name="seven"
                            value={formData.seven.toString()}
                            onChange={(e) => handleChangeRadio(e, "seven")}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="0 ไม่สามารถทําได้"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1 ต้องการคนช่วย"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="2 ขึ้นลงได้เอง (ถ้าต้องใช้เครื่องช่วยเดิน เช่น walker จะต้องเอาขึ้นลงได้ด้วย)"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl component="fieldset">
                          <label htmlFor="eight" className="relative mt-6 mb-6">
                            การอาบนํ้า
                          </label>
                          <RadioGroup
                            aria-label="eight"
                            name="eight"
                            value={formData.eight.toString()}
                            onChange={(e) => handleChangeRadio(e, "eight")}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="0 ต้องการคนช่วยหรือบอกให้ทํา"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1 อาบนํ้าเองได้"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl component="fieldset">
                          <label htmlFor="nine" className="relative mt-6 mb-6">
                          การกลั้นการถ่ายอุจจาระในระยะ 1 สัปดาห์
                          </label>
                          <RadioGroup
                            aria-label="nine"
                            name="nine"
                            value={formData.nine.toString()}
                            onChange={(e) => handleChangeRadio(e, "nine")}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="0 กลั้นไม่ได้ หรือต้องการการสวนอุจจาระอยู่เสมอ"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1 กลั้นไม่ได้บางครั้ง (เป็นน้อยกว่า 1 ครั้งต่อสัปดาห์)"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="2 กลั้นได้เป็นปกติ"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl component="fieldset">
                          <label htmlFor="ten" className="relative mt-6 mb-6">
                          การกลั้นปัสสาวะในระยะ 1 สัปดาห์ที่ผ่านมา
                          </label>
                          <RadioGroup
                            aria-label="ten"
                            name="ten"
                            value={formData.ten.toString()}
                            onChange={(e) => handleChangeRadio(e, "ten")}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="0 กลั้นไม่ได้ หรือใส่สายสวนปัสสาวะแต่ไม่สามารถดูแลเองได้"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1 กลั้นไม่ได้บางครั้ง (เป็นน้อยกว่าวันละ 1 ครั้ง)"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="2 กลั้นได้เป็นปกติ"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <div className="flex justify-end mt-4">
                        <Button
                          variant="contained"
                          className="h-12 w-32"
                          onClick={handleSubmit}
                        >
                          บันทึก
                        </Button>
                      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daily_routine_assessment_form_ADL;
