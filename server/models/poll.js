let mongoose = require("mongoose"),
    PollSchema = new mongoose.Schema({
        question: { type: String, required: true, minlength: 5, maxlength: 100 },
        options: [ { type: mongoose.Schema.Types.ObjectId, ref: "Option" }],
    }, {timestamps: true});

    mongoose.model("Poll", PollSchema);