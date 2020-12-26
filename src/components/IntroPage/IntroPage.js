import './IntroPage.css';
import { Link } from 'react-router-dom';

const IntroPage = () => {
  return (
    <div className="intro-page">
      <div>
        <h1 className="intro-page__title">Перенесись в 2025</h1>
        <p className="intro-page__text">и задай свой вопрос</p>
        <p className="intro-page__text">правительству будущего!</p>
      </div>
      <Link to="/main" className="into-page__button">Вперед</Link>
    </div>
  );
}

export default IntroPage;