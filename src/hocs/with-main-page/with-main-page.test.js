import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withMainPage from './with-main-page';

configure({adapter: new Adapter()});

const MockComponent = <div />;
const WrapperMockComponent = withMainPage(MockComponent);

const mock = {
  city: `Paris`,
  cities: [
    `Paris`,
    `Cologne`,
    `Brussels`,
    `Amsterdam`,
    `Hamburg`,
    `Dusseldorf`
  ],
  offers: [
    {
      title: `Beautiful & luxurious apartment at great location`,
      src: `img/apartment-01.jpg`,
      city: {
        name: `Paris`,
        coordinate: [48.852969, 2.351074]
      },
      price: 120,
      rating: 4.7,
      type: `Apartment`,
      coordinate: [48.852969123654, 2.351074654123],
      isChecked: false,
      isPremium: true
    },
    {
      title: `Beautiful & luxurious apartment at great location`,
      src: `img/apartment-01.jpg`,
      city: {
        name: `Paris`,
        coordinate: [48.852969, 2.351074]
      },
      price: 120,
      rating: 4.7,
      type: `Apartment`,
      coordinate: [48.852969123654, 2.351074654123],
      isChecked: false,
      isPremium: true
    },
  ]
};
/* eslint-disable */
console.log(`--------------------`, WrapperMockComponent);


describe(`e2e test hoc withMainPage`, () => {
  it(`renderInfoPlaceFound`, () => {
    const tree = shallow(<WrapperMockComponent
      setActiveCity={jest.fn()}
      city={mock.city}
      cities={mock.cities}
      offers={mock.offers}
    />);

    expect(tree.props().renderInfoPlaceFound())
      .toEqual(`2 places to stay in Paris`);
  });
});
