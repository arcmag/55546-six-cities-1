const City = {
  Amsterdam: {
    name: `Amsterdam`,
    coordinate: [52.38333, 4.9]
  },
  Paris: {
    name: `Paris`,
    coordinate: [48.852969, 2.351074]
  },
  Cologne: {
    name: `Cologne`,
    coordinate: [50.5611, 6.5710]
  },
  Brussels: {
    name: `Brussels`,
    coordinate: [50.833698, 4.336853]
  },
  Hamburg: {
    name: `Hamburg`,
    coordinate: [53.548467, 10.005112]
  },
  Dusseldorf: {
    name: `Dusseldorf`,
    coordinate: [51.1352, 6.4620]
  },
};

const placeCardsDataList = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    src: `img/apartment-01.jpg`,
    city: City.Paris,
    price: 120,
    rating: 4.7,
    type: `Apartment`,
    coordinate: [48.852969123654, 2.351074654123],
    isChecked: false,
    isPremium: true
  },
  {
    title: `Wood and stone place`,
    src: `img/room.jpg`,
    city: City.Cologne,
    price: 80,
    rating: 4,
    type: `Private room`,
    coordinate: [50.561112348765, 6.571087651234],
    isChecked: true,
    isPremium: false
  },
  {
    title: `Canal View Prinsengracht`,
    src: `img/apartment-02.jpg`,
    city: City.Brussels,
    price: 132,
    rating: 4,
    type: `Apartment`,
    coordinate: [50.833698123098, 4.336853456876],
    isChecked: false,
    isPremium: false
  },
  {
    title: `Nice, cozy, warm big bed apartment`,
    src: `img/apartment-03.jpg`,
    city: City.Amsterdam,
    price: 180,
    rating: 5,
    type: `Apartment`,
    coordinate: [52.3809553943508, 4.939309666406198],
    isChecked: false,
    isPremium: true
  },
  {
    title: `Hamburg apartment`,
    src: `img/apartment-02.jpg`,
    city: City.Hamburg,
    price: 120,
    rating: 5,
    type: `Apartment`,
    coordinate: [53.548467444765, 10.005112321176],
    isChecked: false,
    isPremium: true
  },
  {
    title: `Dusseldorf apartment`,
    src: `img/apartment-01.jpg`,
    city: City.Dusseldorf,
    price: 180,
    rating: 5,
    type: `Apartment`,
    coordinate: [51.135212327659, 6.462312090127],
    isChecked: false,
    isPremium: true
  }
];

export default placeCardsDataList;
