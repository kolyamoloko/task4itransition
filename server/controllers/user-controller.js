const { MongoAPIError } = require('mongodb'); 
const UserDto = require('../dtos/user-dto');
const userModel = require('../models/user-model');
const tokenService = require('../service/token-service');
const userService = require('../service/user-service')
class UserController {
    async registration(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email,password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 300 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            console.log(e);
        }

    }

    async login(req, res, next){
        try {
            const {email, password} = req.body();
            const UserData = await userService.login(email, password); 
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 300 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);

        } catch (e) {
            console.log(e);
        }

    }

    async logout(req, res, next){
        try {

        } catch (e) {
            console.log(e);
        }

    }

    async block(req, res, next){
        try {

        } catch (e) {
            console.log(e);
        }


    }
    async refresh(req, res, next){
        try {

        } catch (e) {
            console.log(e);
        }

    }

    async getUsers(req, res, next){
        try {
            res.status(200).json(['hello', '456']);
        } catch (e) {
            console.log(e);
        }

    }

    async login(email, password) {
        const user = await userModel.findOne({email})
        if(!user) {
            console.log('email is not defined')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}

    }
}

module.exports = new UserController();