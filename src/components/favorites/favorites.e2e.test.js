import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Favorites from './favorites.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`e2e test Favorites`, () => {
  it(`Test Favorites renderer`, () => {
    const titleClickFn = jest.fn();
    const tree = shallow(<Favorites
      name={`void name`}
      onTitleClick={titleClickFn}
    />);
    const elemTitle = tree.find(`.place-card__name a`);
    expect(titleClickFn).toHaveBeenCalledTimes(0);
    elemTitle.simulate(`click`);
    expect(titleClickFn).toHaveBeenCalledTimes(1);
  });
});
