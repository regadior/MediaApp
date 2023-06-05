import React from "react";
import { Link } from "react-router-dom";
import mediaap from '../../assets/Logo.png'
import "./footer.css";

export default function Footer() {
    return (
        <footer>
            <div className="logo">
                <img src={mediaap} alt="" width="200px" />
            </div>
            <div className="col1">
                <Link to="/contact">Contact</Link>
                <p>Terms and privacity</p>
                <p>SiteMap</p>
            </div>
            <div className="col2">
                <p>Twitter</p>
                <p>Discord</p>
                <p>Github</p>
            </div>
            <div className="col3"></div>
            <div className="copyr">
                <p>&copy; 2023 MediApp</p>
            </div>
        </footer>
    );
}
