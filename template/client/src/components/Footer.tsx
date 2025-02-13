import "./styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2025 Memora | <a href="#">Revenir en haut</a></p>
            <p>Email: Geoffreyleglise@gmail.com</p>
            <nav className="lien-réseaux">
                <a target="_blank" href="https://www.linkedin.com/in/geoffrey-leglise/">linkedin</a>
                &nbsp;
                <a target="_blank" href="https://github.com/gleglise?tab=repositories">Github</a>
            </nav>

        </footer>
    );
};
export default Footer;
