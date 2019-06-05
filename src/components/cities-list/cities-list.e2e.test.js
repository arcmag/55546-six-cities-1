import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CitiesList from './cities-list';

configure({adapter: new Adapter()});

const mock = [`Amsterdam`, `Paris`, `Cologne`];

describe(`e2e test CitiesList`, () => {
  it(`test menu item click`, () => {
    const clickFn = jest.fn();
    const tree = mount(<CitiesList
      onSetActiveCity={clickFn}
      selectedCity={mock[0]}
      cities={mock}
    />);
    const menuItemLink = tree.find(`.locations__item-link`).first();
    menuItemLink.simulate(`click`);
    expect(clickFn).toHaveBeenCalledTimes(1);
  });
});
