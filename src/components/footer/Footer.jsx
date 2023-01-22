import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img
          src={`${process.env.REACT_APP_BACKEND}/img/logo-green.png`}
          alt="Natours logo"
        />
      </div>
      <ul className="footer__nav">
        <li>
          <a href="/">About us</a>
        </li>
        <li>
          <a href="/">Download apps</a>
        </li>
        <li>
          <a href="/">Become a guide</a>
        </li>
        <li>
          <a href="/">Careers</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
      </ul>
      <div className="footer__copyright">
        &copy; Designed by Jonas Schemedtmann. Created with React by Hassan
        Makhloufi
      </div>
    </footer>
  );
};

export default Footer;
