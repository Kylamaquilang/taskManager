const HttpError = require('./HttpError')


function validateRequest(req_body, requiredFields = []) {
    if(!req_body) {
        throw new HttpError(
            'Request payload is required',
            400
        )
    }

    const missing_fields = requiredFields.filter(field => !req_body[field])

    if(missing_fields.length > 0) {
        throw new HttpError(
            `Missing required field: ${missing_fields.join(', ')}`,
            400
        )
    }
}
module.exports = validateRequest;