const bcrypt = require("bcryptjs");

bcrypt.genSalt().then(salt => {
    bcrypt.hash("password", salt).then(hash => {
        console.log(hash);
    });
})