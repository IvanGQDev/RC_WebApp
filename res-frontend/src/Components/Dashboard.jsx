import React from "react";
import Sidebar from "./Sidebar";
import PeopleList from "./PeopleList";
import Home from "./Home";
import StatisticsPage from "./StatisticsPage";


const Dashboard = ({ setIsLoggedIn }) => {
  const [active, setActive] = React.useState("inicio");


  return (
    <div className="flex h-screen ">
      
      {/* Sidebar */}
      <Sidebar setIsLoggedIn={setIsLoggedIn} active={active} setActive={setActive} />

      {/* Contenido principal */}
      <div className="flex-1 h-screen overflow-y-auto bg-gray-50">
        {active === "inicio" && (
          <Home />
        )}
        {active === "lista" && <PeopleList />}
        {active === "estadisticas" && (
          <StatisticsPage />
        )}
      </div>

    </div>
  );
};

export default Dashboard;
