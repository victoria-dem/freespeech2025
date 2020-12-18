import './Footer.css';

const Footer = () => {
  return(
    <div className="footer">
      {/* актуальный год */}
      {/* <p className="footer__copyright">&copy; 
        <span id="year">{new Date().getFullYear()}</span> 
        Free Speach
      </p> */}
      <p className="footer__copyright">&copy; <span id="year">2025 </span>Free Speech</p>
        <p className="footer__copyright">&copy; <span id="year">2025 </span>Горячо одобрено Министерством Свободы от Свободны Слова</p>
    </div>
  );
}

export default Footer;