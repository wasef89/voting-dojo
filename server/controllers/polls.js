let mongoose = require("mongoose"),
    Poll = mongoose.model("Poll"),
    Option = mongoose.model("Option");

class PollsController{
    list(req, res){
        Poll.find().sort({ createdAt: -1 }).populate({path:"options",model:"Option"}).exec((err, polls) => {
            if(err){
                return res.json(err);
            }
            return res.json(polls);
        })
    }

    destroy(req, res){
        Poll.findById(req.params.id, (err, poll) =>{
            if(err){
                return res.json(err);
            }
            if(!poll){
                return res.json({status:false, msg: "Poll not found."});
            }
        })
    }

    getPoll(req, res){
        Poll.findById(req.params.id).populate({path:"options",model:"Option"}).exec((err, poll) => {
            if(err){
                return res.json(err);
            }
            return res.json(poll);
        })
    }

    create(req, res){
        Poll.create({question:req.body.question}, (err,poll) => {
            if(err){
                return res.json(err);
            }
            req.body.option1.poll = poll._id;
            Option.create(req.body.option1, (err, option1) => {
                if(err){
                    return res.json(err);
                }
                req.body.option2.poll = poll._id;
                Option.create(req.body.option2, (err, option2) => {
                    if(err){
                        return res.json(err);
                    }
                    if (req.body.option3 && req.body.option3.option) {
                        req.body.option3.poll = poll._id;
                        Option.create(req.body.option3, (err, option3) => {
                            if(err){
                                return res.json(err);
                            }
                            if (req.body.option4 && req.body.option4.option) {
                                req.body.option4.poll = poll._id;
                                Option.create(req.body.option4, (err, option4) => {
                                    if(err){
                                        return res.json(err);
                                    }
                                    poll.options.push(option1._id);
                                    poll.options.push(option2._id);
                                    poll.options.push(option3._id);
                                    poll.options.push(option4._id);
                                    poll.save((err,poll) => {
                                        if(err){
                                            return res.json(err);
                                        }
                                        return res.json(poll);
                                    })
                                })
                            }
                            else {
                                poll.options.push(option1._id);
                                poll.options.push(option2._id);
                                poll.options.push(option3._id);
                                poll.save((err,poll) => {
                                    if(err){
                                        return res.json(err);
                                    }
                                    return res.json(poll);
                                })
                            }
                        })
                    }
                    else {
                        poll.options.push(option1._id);
                        poll.options.push(option2._id);
                        poll.save((err,poll) => {
                            if(err){
                                return res.json(err);
                            }
                            return res.json(poll);
                        })
                    }

                })
            })
        })
    }

}

module.exports = new PollsController();