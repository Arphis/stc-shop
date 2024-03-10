
function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.save(action)//execute the action after saving the updated session data to the database is done
    //req.session is the property made available by express session
}

 function destroyUserSession (req) {
    req.session.uid = null;
    req.session.save();
 }
module.exports = {
    createUserSession:createUserSession,
    destroyUserSession:destroyUserSession
}