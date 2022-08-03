const utils = require("../../utils");
const Specialist = require("../../model/Admin/specialist");

exports.addSpecialist = async (req, res) => {
  const { name } = req.body;
  const data = await Specialist.findOne({ name: name });
  if (data) {
    return res.send(utils.createError("specialist is already exists.."));
  } else {
    const Users = new Specialist({
      name: name,
    });
    const datas = await Users.save(async (err, data) => {
      if (err) return res.send(utils.createError("Database error"));
      else {
        res.send(
          utils.createResult(err, "Add Specialist Successfully", {
            id: data._id,
            name: data.name,
          })
        );
      }
    });
  }
};

exports.deleteSpecialist = async (req, res) => {
  console.log(req.params.specialist_id);
  const _id = req.params.specialist_id;
  const data = await Specialist.findByIdAndDelete(_id);

  return res.send(utils.createError("specialist deleted successfully...."));
};

exports.updateSpecialist = async (req, res) => {
  // console.log(req.params.specialist_id)
  const _id = req.params.specialist_id;
  const data = await Specialist.findByIdAndUpdate(_id, req.body);

  return res.send(utils.createError("specialist updated successfully...."));
};

exports.getAllSpecialist = async (req, res) => {
  // console.log(req.params.specialist_id)
  // const _id = req.params.specialist_id
  const SpecialistList = await Specialist.find();

  return res.send(SpecialistList);
};

exports.getSpecialistById = async (req, res) => {
  const _id = req.params.specialist_id;
  const SpecialistList = await Specialist.findById(_id);

  return res.send(SpecialistList);
};
