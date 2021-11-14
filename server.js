let express = require("express"),
    path = require("path"), 
    session = require("express-session"),
    app = express(),
    port = 8000,
    cors = require('cors'),
    bp = require("body-parser");

app.use(cors())
app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(bp.json());
app.use(session({secret: "secret",saveUninitialized: true}));

require('./server/config/mongoose')
require('./server/config/routes')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
