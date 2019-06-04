import renderer from 'react-test-renderer';

import {Favorites} from './favorites';

const mock = {
  offers: []
};

describe(`Test Favorites`, () => {
  it(`renderer`, () => {
    const tree = renderer.create(<Favorites offers={mock.offers} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
