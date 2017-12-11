var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('index', {title: 'index'});
 
}
exports.signin = function(req, res) {
 
    res.render('index', {title: 'index'});
 
}
exports.userView = function(req,res) {
	res.render('userView', {title: 'userView'});
}
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}