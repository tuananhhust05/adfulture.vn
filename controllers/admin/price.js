const fs = require('fs')
const { checkToken } = require('../../utils/checkToken');
const { CreateError } = require('../.././utils/error');

async function editPrice(req, res) {
    try {
        if (req.body.tokenJWT) {
            let check = await checkToken(req.body.tokenJWT);
            if (check.status) {
                const tknt = req.body.tknt
                const tkkt = req.body.tkkt
                const tktg = req.body.tktg
                let str = fs.readFileSync('utils/pricing.txt', 'utf8')
                const obj = str.trim() ? JSON.parse(str) : {}
                console.log(obj[tkkt])
                if (tknt) obj.tknt = Number(tknt).toLocaleString('en-US').replaceAll(',', '.')
                if (tkkt) obj.tkkt = Number(tkkt).toLocaleString('en-US').replaceAll(',', '.')
                if (tktg) obj.tktg = Number(tktg).toLocaleString('en-US').replaceAll(',', '.')
                const value = JSON.stringify(obj)
                fs.writeFileSync('utils/pricing.txt', value)
                return res.json({
                    data: 'Cập nhật thành công',
                    error: null
                })
            }
            else {
                return res.json(CreateError("Invalid token"));
            }
        }
        else {
            return res.json(CreateError("Req is not valid"));
        }
    }
    catch (e) {
        console.log(e);
        console.log("error editPrice");
        return res.json(CreateError(e));
    }
}

module.exports = { editPrice }