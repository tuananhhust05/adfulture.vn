const { CreateError } = require('.././utils/error');
const Customer = require('.././models/Customer.js');

let limitRequest = 100;
let historyReq = [];
const checkTokenLimitReq = (token) => {
    try {
        let date = new Date().getMinutes();
        let index = historyReq.findIndex((e) => String(e.token) === String(token));
        if (index < 0) {
            historyReq.push({
                token: token,
                date: date,
                count: 1
            });
            return true
        }
        else {
            if (Number(historyReq[index].date) !== Number(date)) {
                historyReq = historyReq.filter((e) => Number(e.date) == Number(date));
                historyReq.push({
                    token: token,
                    date: date,
                    count: 1
                });
                return true;
            }
            else {
                historyReq[index].count = historyReq[index].count + 1;
                if (Number(historyReq[index].count) > Number(limitRequest)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        };

    }
    catch (e) {
        console.log("Error checkTokenLimitReq", e);
        return false;
    }
}

async function CreateCustomer(req, res) {
    try {
        if (req.body.name && req.body.email && req.body.phone && req.body.message) {
            if (checkTokenLimitReq(req.ip)) {
                const name = req.body.name
                const email = req.body.email
                const phone = req.body.phone
                const message = req.body.message

                const data = await Customer.create({
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                })
                return res.json({
                    data: data,
                    error: null
                });
            }
            else {
                return res.json(CreateError("Limited req"));
            }
        }
        else {
            return res.json(CreateError("Lack of type"));
        }
    }
    catch (e) {
        console.log("Lỗi TakeDataVilla", e);
        return res.json(CreateError(e));
    }
}

module.exports = {
    CreateCustomer
}