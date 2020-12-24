import "./statistic.css"

function Statistic () {
    return (
        <div className="statistic">
                <div className="statistic__card">
                    <span className="statistic__card-digits">2453</span>
                    <span className="statistic__card-text">петиций опубликовано</span>
                </div>
                <div className="statistic__card">
                    <span className="statistic__card-digits">16 182</span>
                    <span className="statistic__card-text">уникальных стихов в архиве</span>
                </div>
                <div className="statistic__card">
                <span className="statistic__card-digits">98%</span>
                <span className="statistic__card-text">точность передачи смысла</span>
            </div>
        </div>
    )
}
export default Statistic;
