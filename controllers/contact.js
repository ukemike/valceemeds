const Contact = require("../models/contact")

module.exports.index = async (req, res) => {
  const contacts = await Contact.find({})
  res.render("contacts/list", { contacts });
};

// module.exports.indexs = async (req, res) => {
//   const contacts = await Contact.find({})
//   res.render("users/contact", { contacts });
// };

module.exports.indexexe = async (req, res) => {
  const contacts = await Contact.find({})
  res.render("partials/navbar", { contacts });
};

module.exports.renderNewForm = (req, res) => {
  res.render("contacts/new");
};

module.exports.renderList = (req, res) => {
  res.render("contacts/list");
};

module.exports.createContacts = async (req, res, next) => {
  const { phone, address, email, author } = req.body.contact;
  const contact = new Contact({
    phone,
    address,
    email,
    author: req.user._id,
  });
  await contact.save();
  req.flash("success", "Successfully created contact!");
  res.redirect("/contacts/list");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    req.flash("error", "Cannot find that faq!");
    return res.redirect("contacts/edit");
  }
  res.render("contacts/edit", { contact });
};

module.exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    req.flash("error", "Cannot find that contact!");
    return res.redirect("/contacts/list");
  }
  const { phone, address, email, author } = req.body.contact;
  contact.phone = phone;
  contact.address = address;
  contact.email = email;
  contact.author = author;
  await contact.save();
  req.flash("success", "Successfully updated contact!");
  res.redirect("/contacts/list");
};

module.exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted contact");
  res.redirect("/contacts/list");
};