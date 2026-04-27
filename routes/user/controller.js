const model  = require('./model');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token provided' });
    try {
        req.userId = jwt.verify(token, config.secret).id;
        next();
    } catch {
        return res.status(401).json({ msg: 'Invalid token' });
    }
};

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
            username: req.body.username,
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
    },
    getProfile: async (req, res) => {
        try {
            const user = await model.findById(req.userId).select('-password');
            if (!user) return res.status(404).json({ msg: 'User not found' });
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'An error has occurred' });
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { username, bio, avatar } = req.body;
            const user = await model.findByIdAndUpdate(
                req.userId,
                { username, bio, avatar },
                { new: true, runValidators: true }
            ).select('-password');
            if (!user) return res.status(404).json({ msg: 'User not found' });
            res.status(200).json({ msg: 'Profile updated', user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'An error has occurred' });
        }
    },
    verifyToken,

}