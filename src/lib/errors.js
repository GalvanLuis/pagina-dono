const createError = function (name) {
    return class CustomError extends Error {
        constructor(message) {
            super(message)
            this.name = name
        }
    }
}


/* Sidebar Errors */
const DuplicateItemError = createError("DuplicateKeyError");
const DuplicateItemParameterError = createError("DuplicateItemParameterError");
const ItemNotFoundError = createError("KeyNotFoundError");
const ItemParameterNotFound = createError("ItemParameterNotFound");

/* DataTypes Errors*/
const InvalidTypeError = createError("InvalidTypeError");


module.exports = {
    DuplicateItemError,
    DuplicateItemParameterError,
    ItemNotFoundError,
    ItemParameterNotFound,
    InvalidTypeError,
}