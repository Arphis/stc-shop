function getSessionData(req) {
    const sessionData = req.session.flashedData;//flasheddData is arbitrary data
    req.session.flashedData = null;
    return sessionData//sessionData returns flashedData because it was set before flashedData was set to null
}

function flashDataToSession(req,data,action) {
req.session.flashedData = data;
req.session.save(action);//save will execute this action once saving succeeded
}
module.exports = {
    flashDataToSession:flashDataToSession,
    getSessionData:getSessionData
}