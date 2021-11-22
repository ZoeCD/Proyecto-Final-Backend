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
    priceValidator: async (price) => {
        try {
            return parseFloat(price) > 0
        } catch (e) {
            return false
        }
        
    },
    doneValidator: async (done) => {
        return done && typeof done == 'string' && (done == '1' || done == '0')
    },
    destinationValidator: async (destination) => {
        return this.nameValidator(destination.name) &&
               this.typeValidator(destination.type) &&
               this.descriptionValidator(destination.description) && 
               this.priceValidator(destination.price)
    }
}