// Account
function accountResponse(code, value) {
    var response = {
      statusCode: code,
      account: value
    }
    return response;
  }
///////////////////////////////////
// Error
function errorStatusCode(code, message) {
    var error = {
        statusCode: code,
        message: message
    }
    return error
  }
///////////////////////////////////
module.exports = {
    accountResponse,
    errorStatusCode
}