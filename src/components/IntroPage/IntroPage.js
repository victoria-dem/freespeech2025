import './IntroPage.css';
import { Link } from 'react-router-dom';

const IntroPage = () => {
  return (
    <div className="intro-page">
      <p className="intro-page__text">Это машина времени. Хотите оказаться в 2025 году и отправить 
        вашу просьбу правительству будущего?</p>
      <Link to="/main" className="into-page__button">Поехали!</Link>
    </div>
  );
}

export default IntroPage;