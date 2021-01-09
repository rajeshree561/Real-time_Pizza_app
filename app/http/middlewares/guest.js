//using middleware to avoid  user from going to register and login page if already logged in

function guest(req,res,next)
{
    if(!req.isAuthenticated()){//using passport to check if the user is logged in or not
        return next()// allow processing if not logged in
    }
    return res.redirect('/')// to avoid user from going to login page and register page

}
module.exports = guest