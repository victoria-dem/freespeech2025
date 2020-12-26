import "./statistic.css"

function Statistic({allPetitions}) {

    const petitionsNumber = allPetitions.length
    return (
        <section className="statistic">
            <div className="statistic__list">
                <div className="statistic__card statistic__card_place_one">
                    <div className="statistic__text-content">
                        <p className={petitionsNumber === 0? "statistic__card-digits"
                            : " statistic__card-digits statistic__card-digits_visible"}>{petitionsNumber}</p>
                        <p className="statistic__card-text">важных инициатив опубликовано</p>
                    </div>
                </div>
                <div className="statistic__card statistic__card_place_two">
                    <div className="statistic__text-content">
                        <p className="statistic__card-digits statistic__card-digits_visible">16 693</p>
                        <p className="statistic__card-text">уникальных стихов в архиве</p>
                    </div>
                </div>
                <div className="statistic__card statistic__card_place_three">
                    <div className="statistic__text-content">
                        <p className="statistic__card-digits statistic__card-digits_visible">98%</p>
                        <p className="statistic__card-text">точность передачи смысла</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Statistic;
