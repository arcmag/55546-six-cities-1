import renderer from 'react-test-renderer';

import MainPage from './main-page';

describe(`Test MainPage`, () => {
  it(`Test MainPage renderer`, () => {
    const tree = renderer.create(<MainPage offers={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
