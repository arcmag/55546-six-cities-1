import * as React from 'react';
import * as renderer from 'react-test-renderer';

import CitiesList from './cities-list';

const mock = [`Amsterdam`, `Paris`, `Cologne`];

describe(`Test CitiesList`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<CitiesList
      onSetActiveCity={jest.fn()}
      selectedCity={mock[0]}
      cities={mock}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
