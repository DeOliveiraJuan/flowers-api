const createError = require('http-errors')
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

    const LoginError = createError(401, 'Invalid email or password');

    if(!email || !password) { // Campos requeridos
        next(LoginError);
    } else {
        User.findOne({ email }) //Buscamos por email
        .then(user => {
            if(!user) {
                next(LoginError) //Entra si no hay usuario
            } else {
                user.checkPassword(password) //Revisamos que la contraseña sea válida
                .then(result => {
                    if(!result) {
                        next(LoginError); //Entra si la contraseña es incorrecta
                    } else {
                        const token = jwt.sign(
                            {
                                id: user.id,
                            },
                            'super secret',
                            {
                                expiresIn: '2h'
                            }
                        ) //Firma y envia el token jwt

                        res.json({ accessToken: token })
                    }
                })
            }
        })
    }
}