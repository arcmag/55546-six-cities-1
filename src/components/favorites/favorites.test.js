import React from 'react';
import renderer from 'react-test-renderer';

import Favorites from './favorites.jsx';

describe(`Test Favorites`, () => {
  it(`Test Favorites renderer`, () => {
    const tree = renderer.create(<Favorites name={`void name`} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
