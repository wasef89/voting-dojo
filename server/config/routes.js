let Polls = require("../controllers/polls"),
    Options = require("../controllers/options"),
    path = require("path")

module.exports = function(app){

    app.post('/polls', Polls.create);
    app.get('/polls', Polls.list);
    app.get('/polls/:id', Polls.getPoll);
    app.delete('/polls/:id', Polls.destroy);

    app.get('/options/:id', Options.getOption);
    app.put('/options/:id', Options.update);

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("../client/dist/index.html"))
    })
}