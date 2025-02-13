import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="logo">Memora</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Contact</Link></li>
            </ul>
        </nav>
    );
};
export default Navbar;
