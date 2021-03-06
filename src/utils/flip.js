const findAllCoordinates = obj => {
  var objects = [];
  for (var i in obj) {
    if (i === "coordinates") {
      objects.push(obj[i]);
    } else if (typeof obj[i] === "object") {
      objects = objects.concat(findAllCoordinates(obj[i]));
    }
  }
  return objects;
};

const flipAllCoordinatesArray = coordinates => {
  if (
    coordinates &&
    coordinates.length === 2 &&
    typeof coordinates[0] === "number"
  ) {
    coordinates.reverse();
  } else {
    for (var p = 0; p < coordinates.length; p++) {
      flipAllCoordinatesArray(coordinates[p]);
    }
  }
};

const flip = json => {
  var values = findAllCoordinates(json);

  for (var i = 0; i < values.length; i++) {
    flipAllCoordinatesArray(values[i]);
  }

  return json;
};

export default flip;
