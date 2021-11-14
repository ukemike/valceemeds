const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.renderAboutUs = (req, res) => {
    res.render('users/about');
}

module.exports.renderTable = (req, res) => {
    res.render('users/table');
}

// module.exports.renderHome = (req, res) => {
//     res.render('users/home');
// }

module.exports.renderMain = (req, res) => {
    res.render('users/main');
}

module.exports.renderFaqs = (req, res) => {
    res.render('users/faqs');
}

module.exports.renderContact = (req, res) => {
    res.render('users/contact');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Valcee Medicals!');
            res.redirect('/testimonys');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/testimonys';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    // req.session.destroy();
    req.flash('success', "Goodbye!");
    res.redirect('/about');
}