const CitiesList = (props) => {
  const {selectedCity, cities, onSetActiveCity} = props;

  return <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((it, idx) => <li key={idx} className="locations__item">
          <a onClick={() => {
            onSetActiveCity(it);
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
  cities: propTypes.arrayOf(propTypes.string).isRequired,
  onSetActiveCity: propTypes.func.isRequired,
  selectedCity: propTypes.any
};

export default CitiesList;
