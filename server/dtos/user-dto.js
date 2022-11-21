module.exports = class UserDto {
    email;
    id;
    isActive;
    isBlocked;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isBlocked = model.isBlocked;
        this.isActive = model.isActive;
    }
}