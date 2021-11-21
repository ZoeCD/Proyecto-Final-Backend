const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    nameValidator: async (name) => {
        return name && typeof name == 'string' && name.length >= 1 && name.length < 50
    },
    typeValidator: async (type) => {
        return type && typeof type == 'string' && (type == 'City' || type == 'Monument' || type == 'Activity')
    },
    descriptionValidator: async (description) => {
        return description && typeof description == 'string' && description.length >= 5 && description.length < 100
    },
    idValidator: async (id) => {
        if(ObjectId.isValid(id)){
            if((String)(new ObjectId(id)) === id)
                return true;
        }
        return false;
    },

}