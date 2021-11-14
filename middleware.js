const { testimonySchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Testimony = require('./models/testimony');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateTestimony = (req, res, next) => {
    const { error } = testimonySchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const testimony = await Testimony.findById(id);
    if (!testimony.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/testimonys/${id}`);
    }
    next();
}