const getBoundingBox = map => {
  let bb = map.getBounds();

  return [
    {
      lat: bb.getNorth(),
      lon: bb.getWest()
    },
    {
      lat: bb.getSouth(),
      lon: bb.getEast()
    }
  ];
};

export default getBoundingBox;
