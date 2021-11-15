const Testimony = require("../models/testimony");

module.exports.index = async (req, res) => {
  const testimonys = await Testimony.find({})
  res.render("testimonys", { testimonys });
};

module.exports.renderNewForm = (req, res) => {
  res.render("testimonys/new");
};

module.exports.createTestimony = async (req, res, next) => {
  const { name, occupation, testify, author } = req.body.testimony;
  const testimony = new Testimony({
    name,
    occupation,
    testify,
    author: req.user._id,
  });
  await testimony.save();
  req.flash("success", "Successfully created testimonial!");
  res.redirect("/testimonys");
};

module.exports.showTestimony = async (req, res) => {
  const testimony = await Testimony.findById(req.params.id);
  if (!testimony) {
    req.flash("error", "Cannot find that testimonial!");
    return res.redirect("/testimonys");
  }
  res.render("testimonys/show", { testimony });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const testimony = await Testimony.findById(id);
  if (!testimony) {
    req.flash("error", "Cannot find that testimonial!");
    return res.redirect("/testimonys");
  }
  res.render("testimonys/edit", { testimony });
};

module.exports.updateTestimony = async (req, res) => {
  const { id } = req.params;
  const testimony = await Testimony.findById(id);
  if (!testimony) {
    req.flash("error", "Cannot find that testimonial!");
    return res.redirect("/testimonys");
  }
  const { name, occupation, testify, author } = req.body.testimony;
  testimony.name = name;
  testimony.occupation = occupation;
  testimony.testify = testify;
  testimony.author = author;
  await testimony.save();
  req.flash("success", "Successfully updated testimonial!");
  res.redirect("/testimonys");
};

module.exports.deleteTestimony = async (req, res) => {
  const { id } = req.params;
  await Testimony.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted testimonial");
  res.redirect("/testimonys");
};
