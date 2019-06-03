import renderer from 'react-test-renderer';

import FavoritesList from './favorites-list';

const mock = {
  cities: []
};

describe(`Test FavoritesList`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<FavoritesList
      setActionCard={jest.fn()}
      clearActionCard={jest.fn()}
      offersCities={mock.cities}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
