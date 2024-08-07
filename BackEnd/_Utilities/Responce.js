class Response {
    Data;
    statuscode;
    constructor(e) {
        this.statuscode = 200;
    }


    sendResponce(res) {
        res.status(this.statuscode).json({ ResponseData: this.Data });
    }

}


module.exports = Response;
