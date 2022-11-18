const UserModel = require('../models/user.model');
const authService = require('../services/auth.service');

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const foundUser = await UserModel.findOne({username});

        if (!foundUser || foundUser.length == 0) {
            res.status(404).json({message: "User not found!"});
        } else {
            if (await foundUser.isPasswordMatch(password)) {
                const token = await authService.generateAuthTokens(foundUser);
                res.status(200).json({user: foundUser, token})
            } else {
                res.status(409).json({message: "wrong password"});
            }
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
    
}

exports.getAll = async (req, res) => {
    try {
        let foundUser = await UserModel.find();
        if (req.user.role == 'user') {
            foundUser = foundUser.find((a) => a.id == req.user.id);
        }
        
        if(!foundUser || foundUser.length == 0) {
            res.status(404).json({message: "User not found!"});
        } else {
            res.status(200).json(foundUser);
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
    
}

exports.create = async (req, res) => {
    const {username, password, role} = req.body;
    try {
        const foundUser = await UserModel.find({username});

        if(!foundUser || foundUser.length == 0) {
            const user = new UserModel({username, password, role});
            const response = await user.save();
            res.status(200).json({message: "user created"});
        } else {
            res.status(409).json({message: "User already exists!"});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
    
}

exports.read = async (req, res) => {
    const {id} = req.params;
    try {
        const foundUser = await UserModel.findOne({_id: id});

        if(!foundUser || foundUser.length == 0) {
            res.status(404).json({message: "User not found!"});
        } else {
            res.status(200).json(foundUser);
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
    
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const {username, password, role} = req.body;
    try {
        const foundUser = await UserModel.findOne({ _id: id });
    
        if(foundUser || foundUser.length == 0) {
            Object.assign(foundUser, {username, password, role});
            await foundUser.save();
            res.status(200).json(foundUser);
        } else {
            res.status(404).json({message: `User not found...`});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
    
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const foundUser = await UserModel.findOne({ _id: id });
    
        if(foundUser || foundUser.length == 0) {
            const response = await foundUser.deleteOne({_id: id});
            res.status(202).json(response);
        } else {
            res.status(404).json({message: `User not found...`});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
