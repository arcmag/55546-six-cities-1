import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
  cities: string[],
  onSetActiveCity: (cityName: string) => void,
  selectedCity: string,
}

const CitiesList: React.FunctionComponent<Props> = (props) => {
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

export default CitiesList;
