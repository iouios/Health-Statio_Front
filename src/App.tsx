import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./health_Station/login/page";
import Health_Station from "./health_Station/User/healthStationMain/page";
import PersonalRecordData from "./health_Station/User/personalRecordData/page";
import HealthRecordFrom from "./health_Station/User/healthRecordFrom/page";
import Test from "./health_Station/Test";
import HealthCheckInformation from "./health_Station/User/physicalStandardValues/page";
import Daily_routine_assessment_form_ADL from "./health_Station/User/dailyRoutineAssessmentFormADL/page";
import Admin from "./health_Station/admin/page";
import FormAdmin from "./health_Station/admin/fromAdmin/page";
import HealthHistoryTable from "./health_Station/admin/userfrom/healthHistoryTable";
import CitizenInformation from "./health_Station/admin/userfrom/citizenInformation";
import AdminProflile from "../src/health_Station/admin/adminProfile/page";
import Proflile from "./health_Station/admin/profile/profile";
import AddUser from "./health_Station/admin/profile/addUser";
import Adldatahistorytable from "./health_Station/admin/userfrom/adldatahistorytable";
import CareguvebFromId from "./health_Station/admin/caregiverInformation/careguvebFromId/page";
import Profile from "./health_Station/admin/profile/profile";
import EditProfile from "./health_Station/admin/adminProfile/editprofile";
import CaregiverInformation from "./health_Station/admin/caregiverInformation/page";
import SavedHealthInformation from "./health_Station/admin/savedHealthInformation/page";
import Map from "./health_Station/admin/map/page";
import Dashboard from "./health_Station/admin/dashboard/page";
import Caregiver from "./health_Station/admin/userfrom/caregiverInformation";
import EditProfiles from "./health_Station/admin/profile/editProfile";
import Elderly from "./health_Station/User/elderly/page";
import Create from "./health_Station/User/elderly/create";
import ShowInformation from "./health_Station/admin/caregiverInformation/showInformation";
const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/health_Station" element={<Health_Station />} />
          <Route path="/health_Station/personalRecordData" element={<PersonalRecordData />} />
          <Route path="/health_Station/healthRecordForm" element={<HealthRecordFrom />} />
          <Route path="/health_Station/healthCheckInformation" element={<HealthCheckInformation />} />
          <Route path="/health_Station/dailyRoutineAssessmentFormADL" element={<Daily_routine_assessment_form_ADL />} />
          <Route path="/health_Station/elderly" element={<Elderly />} />
          <Route path="/health_Station/elderly/create" element={<Create />} />
          <Route path="/test" element={<Test />} />
          
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/formAdmin" element={<FormAdmin />} />
          <Route path="/admin/userfrom/healthHistoryTable" element={<HealthHistoryTable />} />
          <Route path="/admin/userfrom/caregiverInformation" element={<CaregiverInformation />} />
          <Route path="/admin/userfrom/citizenInformation" element={<CitizenInformation />} />
          <Route path="/admin/userfrom/adldatahistorytable" element={<Adldatahistorytable />} />
          <Route path="/admin/adminProflile" element={<AdminProflile />} />
          <Route path="/admin/Proflile" element={<Proflile />} />
          <Route path="/admin/Proflile/addUser" element={<AddUser />} />
          <Route path="/admin/caregiverInformation" element={<CaregiverInformation />} />
          <Route path="/admin/caregiverInformation/careguvebFromId" element={<CareguvebFromId />} />
          <Route path="/admin/Profile" element={<Profile />} />
          <Route path="/admin/Profile/editprofile" element={<EditProfile />} />
          <Route path="/admin/savedHealthInformation" element={<SavedHealthInformation />} />
          <Route path="/admin/map" element={<Map />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/caregiver" element={<Caregiver />} />
          <Route path="/admin/Profile/editProfiles" element={<EditProfiles />} />
          <Route path="/admin/userfrom/citizenInformation/showInformation/:cid" element={<ShowInformation />} />

          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
