import './empty-petition.css';

const EmptyPetition = () => {
  return (
    <div className="empty-petition">
      <div>
        <p className="empty-petition__text">Есть что-то, что Вы хотите изменить?</p>
        <p className="empty-petition__text">Привлеките внимание к волнующей Вас проблеме, создав инициативу.</p>
      </div>
      {/* <button className="empty-petition__button">Создать инициативу</button> */}
      <a className="empty-petition__link" href="#petition-form">Создать инициативу</a>
    </div>
  );
}

export default EmptyPetition;