import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import menu from "../assets/menu.png";
import exit from "../assets/exit.png";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = () => (
    <div className="flex">
      <Box sx={{ width: "auto" }} role="presentation" className="m-4">
        <div>
          <Accordion className="bg-blue-500 m-4">
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
                  <Link to="/Health_Station/HeaithRecordFrom">
                    <button className="rounded-lg p-2 text-left w-full">
                      บันทึกข้อมูลใหม่
                    </button>
                  </Link>
                  <Link to="">
                    <button className="rounded-lg p-2 text-left w-full">
                      บันทึกข้อมูลผู้ดูแลผู้สูงอายุ
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="rounded-lg p-2 text-left w-full">
                      ออกจากระบบ
                    </button>
                  </Link>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
      <div className="">
        <Button
          onClick={toggleDrawer(false)}
          className="flex items-center justify-center"
        >
          <div className="bg-blue-500 rounded-lg p-2 mt-7">
            <img src={exit} alt="exit" className="w-6 h-6" />
          </div>
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <img
          src={menu}
          alt="menu"
          className="w-6 h-6 object-cover rounded-full"
        />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList()}
      </Drawer>
    </div>
  );
}
