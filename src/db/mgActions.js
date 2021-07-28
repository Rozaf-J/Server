const schemas = require("./mgSchemas/userSchema");

Get_user = () => {
  return schemas.Instance.find({}, (err, data) => {
    return data;
  });
};

Add_user = async (data) => {
  try {
    const newUser = await new schemas.Instance(data);
    await newUser.save();
  } catch (e) {
    console.log(e);
  }
};

Del_user = async (data) => {
  try {
    await schemas.Instance.deleteOne({ name: data[0] });
  } catch (e) {
    console.log(e);
  }
};

Upd_user = async (data) => {
  try {
    await schemas.Instance.updateOne(
      { name: data[2], age: data[3] },
      { name: data[0], age: data[1] }
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  Get_user,
  Add_user,
  Del_user,
  Upd_user,
};
