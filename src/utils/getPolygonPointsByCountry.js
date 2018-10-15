const getPolygonPointsByCountry = countryCode => {
  let points = [];

  if (countryCode === "BG") {
    points = [
      { lat: 42.4321019, lon: 23.318168 },
      { lat: 43.2656884, lon: 24.7776861 },
      { lat: 41.9251227, lon: 25.484723 },
      { lat: 41.79467, lon: 23.8687763 }
    ];
  }

  return points;
};

export default getPolygonPointsByCountry;
