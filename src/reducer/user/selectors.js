import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.USER;

export const getSelectCity = (state) => {
  return state[NAME_SPACE].selectCity;
};
