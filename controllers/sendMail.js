const nodemailer = require('nodemailer')
const ejs = require('ejs')
const fs = require('fs')
const { CreateError } = require('.././utils/error');

function FSendMail(title, content, receiver) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kientrucadfuture@gmail.com',
                pass: 'nhyrakzovxnakore'
            }
        });
        const mail_config = {
            from: 'kientrucadfuture@gmail.com',
            to: receiver,
            subject: title,
            html: content
        };
        transporter.sendMail(mail_config, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: "Đã có lỗi xảy ra khi gửi mail" });
            };
            return resolve({ message: "Gửi mail thành công" })
        });
    })
}

const sendMail = async (req, res) => {
    try {
        if (req.body && req.body.name && req.body.email) {
            const template = fs.readFileSync('views/mail.ejs', 'utf8')
            const compiledTemplate = ejs.render(template, { userName: req.body.name })
            await FSendMail('Cảm ơn bạn đã liên hệ với chúng tôi', compiledTemplate, req.body.email)
            res.json({
                data: {
                    result: true
                },
                error: null
            })
        }
        else {
            return res.json(CreateError("Infor is not valid"));
        }
    } catch (e) {
        console.log(e);
        return res.json(CreateError("Đã có lỗi xảy ra"));
    }
}

module.exports = {
    sendMail
}