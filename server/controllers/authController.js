const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        //what does the function need to run properly? 
        const {username, email, password, profilePicture} = req. body;//information from table
        const db = req.app.get('db'); // information from database

        //Does user with this email already exist?
        const foundUser = await db.users.check_user({email});
        if(foundUser[0]) {
            return res.status(400).send('Email already in use')
        }

        //Hashing password
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        //Registering the user, and sending the session client-side
        const newUser = await db.users.register_user({username, email, password: hash, profilePicture});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);

    },

    login: async(req, res) => {
        //What does the function need to run properly? 
        const {email, password} = req.body;
        const db = req.app.get('db');

        //Checks if user is already in the database, based on email
        const foundUser = await db.users.check_user({email});
        if(!foundUser[0]) {
            return res.status(400).send('Email not found');
        } 

        //Compare the passwords to make sure they match
        const authenticated = bcrypt.compareSync(password , foundUser[0].password);
        if(!authenticated) {
            return res.status(401).send('Password is incorrect')
        }

        //Set user on session, and send it client-side
        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);

    },

    logout: (req, res) => {
        //logout clears out the session of user data 
        req.session.destroy();
        res.sendStatus(200);
    }
}