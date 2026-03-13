import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="footer-content">
          <p className="text-muted text-center py-6">
            &copy; {new Date().getFullYear()} AgriRent. Empowering Farmers Everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
