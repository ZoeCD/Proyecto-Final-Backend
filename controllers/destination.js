const Destination = require("../models/destination")

module.exports = {
    createController: (Destination)=>{
        return{
            post: async(req, res) =>{
                req.body.owner = req.sessionID;
                new Destination(req.body)
                    .save()
                    .then(
                        async (data, err) =>{
                            if(err){
                                return res.status(422).json({status:422, message: data, error: err});
                            }
                            return res.status(200).json({status: 200, items: data});
                        }
                    )
            },

            get: async(req, res) =>{
                if(req.params.id || req.body.id){
                    Destination.findById(
                    req.params.id || req.body.id,
                    async (data, err) => {
                        if(err){
                            return res.status(422).json({status:422, message: data, error: err});
                        }
                        return res.status(200).json({status: 200, items: data});
                    }
                )
                }else{
                    Destination.find(
                        async (err, data) =>{
                            if(err){
                                return res.status(422).json({status:422, message: data, error: err});
                            }
                            return res.status(200).json({status: 200, items: data});
                        }
                    )
                }
            },

            put: async (req, res) => {
                Destination.findOnceById(
                    req.params.id || req.body.id,
                    async (data, err) => {
                        if(err){
                            return res.status(422).json({status:422, message: data, error: err});
                        }
                        data.update(req.body, async (data, err)=>{
                            if(err){
                                return res.status(422).json({status:422, message: data, error: err});
                            }
                            return res.status(200).json({status: 200, items: data});
                        })
                    }
                )
            },

            del: async (req, res) => {
                Destination.findById(
                    req.params.id || req.body.id,
                    async (data, err) => {
                        if(err){
                            return res.status(422).json({status:422, message: data, error: err});
                        }
                        data.remove(async (data, err)=>{
                            if(err){
                                return res.status(422).json({status:422, message: data, error: err});
                            }
                            return res.status(200).json({status: 200, items: data});
                        })
                    }
                )
            }
        }
    }
}