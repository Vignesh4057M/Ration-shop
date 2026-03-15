import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {

    const [dateTime, setDateTime] = useState("");

    useEffect(() => {

        const interval = setInterval(() => {

            const now = new Date();

            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();

            setDateTime(`${date} ${time}`);

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location = "/";
    };

    return (

        <div className="navbar">

            <div className="navbar-left">

                <h3 className="navbar-title">
                    Ration Shop Admin
                </h3>

                <span className="navbar-time">
                    {dateTime}
                </span>

            </div>

            <button
                className="logout-btn"
                onClick={logout}
            >
                Logout
            </button>

        </div>

    );

}

export default Navbar;