class ExpressError extends Error{
    constructor (statusCOde, message) {
        super();
        this.statusCOde = statusCOde;
        this.message = message;
    }
}
module.exports = ExpressError;