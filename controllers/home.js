const Testimony = require("../models/testimony");

module.exports.index = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 5;
  const skip = (page * limit) - limit;
  const testimonysPromise = Testimony.find().skip(skip).limit(limit).sort({ createdAt: 'desc' });
  const countPromise = Testimony.count();
  const [testimonys, count] = await Promise.all([testimonysPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!testimonys.length && skip) {
    req.flash('info', `You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`);
    res.redirect(`/testimonys/${pages}`);
    return;
  }
  res.render('home/index', {  testimonys, });
};