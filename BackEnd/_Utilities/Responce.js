class Response {
    Data;
    statuscode;
    constructor(e) {
        this.statuscode = 200;
    }


    sendResponce(res) {
        res.status(this.statuscode).json({ ResponseData: this.Data });
    }

    solvePromiseAndResponce(proimes, res) {
        proimes.then((Data) => {
            this.Data = Data;
        }).catch((error) => {
            this.Data = error.toString();
            this.statuscode = 500;
        }).finally(() => {
            this.sendResponce(res);
        });
    }

}


module.exports = Response;
