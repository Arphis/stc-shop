function protectRoutes (req, res, next) {
    if (!res.locals.isAuth) {
return res.redirect('/401')
    }

    if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
   return res.redirect('/403');
    } //startsWith is a built in method that tells as if the path to which a request was sent starts with admin
    //which tells us if the user is trying to access the admin URL path
    next()
}


module.exports = protectRoutes;