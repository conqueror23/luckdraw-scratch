const map = function (value, in_min, in_max, out_min, out_max) {
  //console.log(value);
  //console.log(
  //  ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  //);
  if (value === 0) {
    return out_min;
  }
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export default map
