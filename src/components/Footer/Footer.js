import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      {/* актуальный год */}
      {/* <p className="footer__copyright">&copy; 
        <span id="year">{new Date().getFullYear()}</span> 
        Free Speach
      </p> */}
      <p className="footer__copyright">&copy; <span id="year">2025 </span>Гражданин Поэт @ FreeSpeech</p>
      <p className="footer__copyright ">Горячо одобрено Министерством Свободы Слова</p>
    </div>
  );
}

export default Footer;