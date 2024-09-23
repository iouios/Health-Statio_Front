import { Link } from "react-router-dom";
import AdminNavbar from "../../../components/navbarAdmin/adminNavbar";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AdminSidebar from "../../../components/navbarAdmin/adminSidebar";
import VillageHealthWorker from "../../../components/villageHealthWorker"; // Corrected import

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

const Profile: React.FC = () => {

  return (
    <div className="h-screen">
      <AdminNavbar />
      <div className="flex">
        <div className="flex ">
          <AdminSidebar/>
        </div>
        <div className="flex bg-neutral-100 w-full ">
          <div className="p-4 ">
            <div className="flex items-center">
              จัดการผู้ใช้งาน
              <Link to="/admin/Proflile/addUser">
                <button className="bg-blue-500 ml-4">
                  เพิ่มผู้ใช้งาน
                </button>
              </Link>
            </div>
            <div className="flex flex-col items-start w-full mr-4 p-2">
              <input
                className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                id="searchInput"
                name="searchInput"
                placeholder="Search"
              />
            </div>
            <div>
              {users.map((user, index) => (
                <VillageHealthWorker key={index} name={user.name} />
              ))}
            </div>
          </div>
          <div className="p-4">
            <div className="bg-blue-500">
            <Link to="">
                <button className="bg-blue-500 ml-4">
                  แก้ไข
                </button>
              </Link>
            </div>
            <div>
                iouios
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
