import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
const SidebarMenu = ({ menuItems }) => {
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  return (
    <div className="list-group mt-5 pl-4">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenuItem === item.url ? "active" : ""
          }`}
          onClick={() => setActiveMenuItem(item.url)}
        >
          <i className={`menu-item-icon-1 ${item.icon}`}></i> {item.name}
        </Link>
      ))}
    </div>
  );
};

export default SidebarMenu;
