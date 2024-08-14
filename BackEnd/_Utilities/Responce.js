class Response {
    Data;
    statuscode;
    constructor(e) {
        this.statuscode = process.env.status_Code_success;
    }


    sendResponce(res) {
        res.status(this.statuscode).json({ ResponseData: this.Data });
    }

    solvePromiseAndResponce(proimes, res) {

        proimes.then((Data) => {
            if (!Data) {
                this.Data = "Item Not Found, Please Check main id";
                this.statuscode = process.env.status_Code_not_found;
            }
            else { this.Data = Data; }
        }).catch((error) => {
            this.Data = error.toString();
            this.statuscode = process.env.status_Code_server_error;
        }).finally(() => {
            this.sendResponce(res);
        });
    }

}


module.exports = Response;
