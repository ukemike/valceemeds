const Faqs = require("../models/faqs");

module.exports.index = async (req, res) => {
  const faqs = await Faqs.find({})
  res.render("faqs/list", { faqs });
};

module.exports.indexs = async (req, res) => {
  const faqs = await Faqs.find({})
  res.render("users/faq", { faqs });
};

module.exports.renderNewForm = (req, res) => {
  res.render("faqs/new");
};

module.exports.renderList = (req, res) => {
  res.render("faqs/list");
};

module.exports.createFaqs = async (req, res, next) => {
  const { question, answer, author } = req.body.faq;
  const faq = new Faqs({
    question,
    answer,
    author: req.user._id,
  });
  await faq.save();
  req.flash("success", "Successfully created faq!");
  res.redirect("/faqs/list");
};

module.exports.showFaq = async (req, res) => {
  const faq = await Faqs.findById(req.params.id);
  if (!faq) {
    req.flash("error", "Cannot find that faq!");
    return res.redirect("/faqs");
  }
  res.render("faqs/show", { faq });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const faq = await Faqs.findById(id);
  if (!faq) {
    req.flash("error", "Cannot find that faq!");
    return res.redirect("faqs/edit");
  }
  res.render("faqs/edit", { faq });
};

module.exports.updateFaq = async (req, res) => {
  const { id } = req.params;
  const faq = await Faqs.findById(id);
  if (!faq) {
    req.flash("error", "Cannot find that faq!");
    return res.redirect("/faqs");
  }
  const { question, answer, author } = req.body.faq;
  faq.question = question;
  faq.answer = answer;
  faq.author = author;
  await faq.save();
  req.flash("success", "Successfully updated faq!");
  res.redirect("/faqs/list");
};

module.exports.deleteFaq = async (req, res) => {
  const { id } = req.params;
  await Faqs.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted faq");
  res.redirect("/faqs");
};
