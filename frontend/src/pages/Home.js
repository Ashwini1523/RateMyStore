import { Link, useNavigate  } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">Rate<span>My</span>Store</div>
                <div className="nav-links">
                    <button onClick={() => navigate("/login")} className="nav-btn">Login</button>
                    <button onClick={() => navigate("/register")} className="nav-btn">Register</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-heading">Discover & Rate Your Favorite Stores</h1>
                    <p>RateMyStore helps you explore and share reviews of local businesses, making it easy to find the best places near you.</p>
                </div>
            </section>

            {/* About Section */}
            <section className="about">
                <h2>About Rate<span>My</span>Store</h2>
                <p>RateMyStore is an online platform that allows users to rate, review, and discover stores based on genuine customer feedback. Whether it's a cafe, a clothing store, or a local business, RateMyStore helps users make informed decisions.</p>
            </section>

            {/* Contact Section */}
            <section className="contact">
                <h2>Contact Us</h2>
                <p>Have any questions or feedback? Reach out to us!</p>
                <form className="contact-form">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="4" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 RateMyStore. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
