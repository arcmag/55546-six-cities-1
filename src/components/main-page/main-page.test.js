import renderer from 'react-test-renderer';

import MainPage from './main-page';

describe(`Test MainPage`, () => {
  it(`test renderer`, () => {
    const tree = renderer.create(<MainPage
      renderInfoPlaceFound={(jest.fn())}
      renderCitiesList={(jest.fn())}
      renderPlaceList={(jest.fn())}
      renderMainMap={(jest.fn())}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
