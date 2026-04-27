const model  = require('./model');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    login: async (req, res) => {
        try {
            const user = await model.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({ msg: 'Invalid email or password' });
            }
            const isMatch = await user.comparePassword(req.body.password);
            if (isMatch) {
                let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
                res.status(200).json({ msg: 'Login successful', token, forename: user.forename, surname: user.surname });
            } else {
                res.status(401).json({ msg: 'Invalid email or password' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'An error has occurred' });
        }
    },
    register: (req, res) => {
        
        let newUser = new model({
            forename: req.body.forename,
            surname: req.body.surname,
            password: req.body.password,
            email: req.body.email
        });
        newUser.save()
            .then(result => {
                console.log(result);
                res.status(200).json({msg: 'Registration successful', user_id: result._id});

            })
            .catch(err => {
                console.error(err);
                res.status(500).json({msg: 'An error has occurred'});
            })
    }
}