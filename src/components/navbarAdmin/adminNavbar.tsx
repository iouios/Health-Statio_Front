import React, { useState } from "react";
import health from "../../assets/health.png" // ปรับเส้นทางให้ถูกต้องตามตำแหน่งจริงของไฟล์

const AdminNavbar: React.FC = () => {

  return (
    <nav className="text-white">
      <div className="container flex justify-between items-center h-20 ">
      <div className="items-center flex">
          <div className="text-blue-600 text-right text-3xl font-bold md:block hidden flex-1 ml-20 w-96">
            <div className="gradient-text">
            Health Station
            </div>
          </div>
          <div className="flex-1">
            <img
              src={health}
              alt="health"
              className="object-cover rounded-full w-20 h-20 mt-5 ml-2 md:ml-0 md:mt-0 md:lg:w-16 md:lg:h-16 md:place-items-start"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
