const ObjectId = require('mongoose').Types.ObjectId;
const nameValidator = (name) => {
    return name && typeof name == 'string' && name.length >= 1 && name.length < 50
},
typeValidator = (type) => {
    return type && typeof type == 'string' && (type == 'City' || type == 'Monument' || type == 'Activity')
},
descriptionValidator = (description) => {
    return description && typeof description == 'string' && description.length >= 5 && description.length < 100
},
idValidator = (id) => {
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
    }
    return false;
},
doneValidator = (done) => {
    return done && typeof done == 'boolean' && (done === true || done === false)
},
destinationValidator = (destination) => {
    const name = nameValidator(destination.name),
        type = typeValidator(destination.type),
        desc = descriptionValidator(destination.description);
    return name && type && desc;
}

module.exports = {
    nameValidator,
    typeValidator,
    descriptionValidator,
    idValidator,
    doneValidator,
    destinationValidator
}