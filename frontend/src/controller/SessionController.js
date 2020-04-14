const User = require('../models/User')
// index, show, store, update, destroy
module.exports = {
    // listagem de 1
    async store(req, res) {
        const { email } = req.body;
        // __v é um contador de versão

        console.log(email);
        
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email })
        }

        return res.json(user)
    }
}