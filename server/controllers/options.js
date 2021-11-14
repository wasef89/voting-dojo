let mongoose = require("mongoose"),
    Option = mongoose.model("Option");

class OptionsController{
    update(req, res){
        Option.findById(req.params.id, (err, option) => {
            if(err){
                return res.json(err);
            }
            option.vote++;
            option.save((err,option) => {
                if(err){
                    return res.json(err);
                }
                return res.json(option);
            })
        })
    }

    getOption(req, res){
        Option.findById(req.params.id, (err, option) => {
            if(err){
                return res.json(err);
            }
            return res.json(option);
        })
    }
}

module.exports = new OptionsController();