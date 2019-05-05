import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

describe(`Test App`, () => {
  it(`Test App renderer`, () => {
    const tree = renderer.create(<App rentList={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
