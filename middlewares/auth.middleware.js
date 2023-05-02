const jwt = require('jsonwebtoken');

const user = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            jwt.verify(token.split(" ")[1], "someRandomSecretKey", function(err, decoded) {
            //   console.log(decoded)
              if (decoded) {
                req.body.author = decoded.author,
                req.body.authorId = decoded.authorId,

                next();
              }
              else {
                  res.status(200).send({"msg": "Invalid Token, Login Again"});
              }
            });
            // console.log(req.headers.authorization);
            // res.status(200).send("middleware");
        }
        catch(err) {
            res.status(400).send({"err": err.message});
        }
    }
    else {
        res.status(200).send({"msg": "Not Logged In"});
    }
}

module.exports = {
    user
}