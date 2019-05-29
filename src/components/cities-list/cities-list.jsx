const CitiesList = (props) => {
  const {selectedCity, cities, onLinkClick} = props;

  return <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((it, idx) => <li key={idx} className="locations__item">
          <a onClick={() => {
            onLinkClick(it);
          }} className={
            `locations__item-link tabs__item ${it === selectedCity ? `tabs__item--active` : ``}`
          } href="#">
            <span>{it}</span>
          </a>
        </li>)}
      </ul>
    </section>
  </div>;
};

CitiesList.propTypes = {
  cities: propTypes.array.isRequired,
  onLinkClick: propTypes.func.isRequired,
  selectedCity: propTypes.any
};

export default CitiesList;
