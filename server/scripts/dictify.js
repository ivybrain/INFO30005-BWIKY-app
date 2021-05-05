function dictify(list) {
  var out = {};
  list.forEach(x => out[x._id] = x);
  return out;
}
