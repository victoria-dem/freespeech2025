import './FuturePage.css';
import Auth from '../Auth/Auth';
import { Link } from 'react-router-dom';

const FuturePage = () => {
  return (
    <div className="future-page">
      <header className="future-page__header">
        <Link to="/" className="future-page__link">Вернуться в реальность!</Link>
        <p>FREE SPEECH 2025 SITE IS HERE -)))))</p>
      </header>
      <Auth />
    </div>
  );
}

export default FuturePage;