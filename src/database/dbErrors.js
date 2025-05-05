const createError = function (name) {
    return class CustomError extends Error {
        constructor(message) {
            super(message)
            this.name = name
        }
    }
};

const DuplicateEmailError = createError("DuplicateEmailError");


module.exports = {
    DuplicateEmailError
};


