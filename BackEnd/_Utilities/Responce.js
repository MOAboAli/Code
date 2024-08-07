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
            if (!Data) {
                this.Data = "Item Not Found, Please Check main id";
                this.statuscode = 400;
            }
            else { this.Data = Data; }
        }).catch((error) => {
            this.Data = error.toString();
            this.statuscode = 500;
        }).finally(() => {
            this.sendResponce(res);
        });
    }

}


module.exports = Response;
