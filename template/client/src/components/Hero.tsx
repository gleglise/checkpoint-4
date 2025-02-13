import "./styles/Hero.css";
import imageAccueil from "../assets/images/c3a3e8bd-7d27-43b8-8783-64567a535920.webp";

const Hero = () => {
    return (
        <section className="hero">
            <img src={imageAccueil} alt="Collections" className="hero-image" />
            <h2>Welcome to Memora</h2>
            <p>Keep track of what matters to you.</p>
        </section>
    );
};
export default Hero;
