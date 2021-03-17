class Vendor {

  static from(json) {

    Object.assign(new Vendor(), json);
    json.id = 42;
    return json;
  }
};

exports.Vendor = Vendor;
