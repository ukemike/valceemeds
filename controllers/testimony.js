const Testimony = require("../models/testimony");

module.exports.index = async (req, res) => {
  const testimonys = await Testimony.find({})
  res.render("testimonys", { testimonys });
};

// module.exports.index = async (req, res) => {
//   const page = req.params.page || 1;
//   const limit = 5;
//   const skip = (page * limit) - limit;
//   const testimonysPromise = Testimony.find().skip(skip).limit(limit).sort({ createdAt: 'desc' });
//   const countPromise = Testimony.count();
//   const [testimonys, count] = await Promise.all([testimonysPromise, countPromise]);
//   const pages = Math.ceil(count / limit);
//   if (!testimonys.length && skip) {
//     req.flash('info', `You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`);
//     res.redirect(`/testimonys/${pages}`);
//     return;
//   }
//   res.render('testimonys', { title: 'Testimonials', testimonys, count, pages, page});
// };

module.exports.renderNewForm = (req, res) => {
  res.render("testimonys/new");
};

module.exports.createTestimony = async (req, res, next) => {
  //we need to create a new testimony
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
  // res.redirect(`/testimonys/${testimony._id}`);
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

//write a function that will update the testimony
module.exports.updateTestimony = async (req, res) => {
  const { id } = req.params;
  const testimony = await Testimony.findById(id);
  if (!testimony) {
    req.flash("error", "Cannot find that testimonial!");
    return res.redirect("/testimonys");
  }
  const { name, occupation, testify } = req.body.testimony;
  testimony.name = name;
  testimony.occupation = occupation;
  testimony.testify = testify;
  await testimony.save();
  req.flash("success", "Successfully updated testimony!");
  res.redirect(`/testimonys/${testimony._id}`);
};

module.exports.deleteTestimony = async (req, res) => {
  const { id } = req.params;
  await Testimony.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted testimonial");
  res.redirect("/testimonys");
};
