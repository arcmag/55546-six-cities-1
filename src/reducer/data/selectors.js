// import {createSelector} from "reselect";
import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.DATA;

export const getHotels = (state) => {
  return state[NAME_SPACE].hotels;
};

export const getCities = (state) => {
  return state[NAME_SPACE].cities;
};

export const getSelectCity = (state) => {
  return state[NAME_SPACE].selectCity;
};

// export const getGenreQuestions = createSelector(
//     getQuestions,
//     (questions) => questions.filter((it) => it.type === `genre`).map((it) => it)
// );

// const randomFilter = (_state) => {
//   return Math.random() > 0.5;
// };

// export const getArtistQuestions = createSelector(
//     // Функция принимает state и возвращает результат
//     getQuestions,
//     // Функция так же принимает state и возвращает результат
//     randomFilter,
//     // Последняя функция принимает результаты всех предыдущих функций
//     // и возвращает результат на их основе
//     (resultOne, resultTwo) => {
//       return resultOne.filter((it) => resultTwo && it.type === `artist`);
//     }
// );
