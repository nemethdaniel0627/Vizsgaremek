const { from } = require('nodemailer/lib/mime-node/last-newline');

class emailSend {
    account = {
        user: "foodwebusiness@gmail.com",
        pass: "dowqcumjoxgirnlz"
    }

    async EmailSendingForRegister(email) {
        var nodemailer = require('nodemailer');

        let html = '<div style="background-color: #5089c690; color: black; border-radius: 1rem; border: 1px solid black; font-size: 1.3rem; width: 90%; margin: auto; margin-top: 100px;"><div style="background-color: #001e6c; border-radius: 1rem 1rem 0 0; padding: 1rem;"><img style="width: 15rem;" src="https://i.postimg.cc/x1wf0rpB/Food-Web-logo.png" /></div><div style="text-align: left; padding: 2rem;"><h1><span style="font-size: 5vh; font-family: arial, helvetica, sans-serif;">'+
        'Kedves '+ email.name +'!'+
        '</span></h1><p><span style="font-size: 3vh!important; font-family: arial, helvetica, sans-serif;">'+
        email.text +
        '</span></p><p><span style="font-size: 2vh; font-family: arial, helvetica, sans-serif;">'+
        'Ha bármilyen kérdése van, forduljon hozzánk bizalommal:'+
        '</span><br /><span style="font-size: 2vh; font-family: arial, helvetica, sans-serif;">'+
        'foodwebusiness@gmail.com'+
        '</span></p><h4><span style="font-family: arial, helvetica, sans-serif;">&Uuml;dv&ouml;zlettel, <em>Food-E</em></span></h4></div><div style="background-color: #001e6c; border-radius: 0 0 1rem 1rem; padding: 1rem; height: 3rem;">&nbsp;</div></div>';

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: this.account.user,
                pass: this.account.pass,
            },
        });

        let info = await transporter.sendMail({
            from: email.fromEmail,
            to: email.toEmail, 
            subject: email.subject,
            text: "",
            html: html
        });
        return "Message sent: " + info.messageId;
    }

    async ReplyEmailSendingForRegister(email) {
        var nodemailer = require('nodemailer');

        let html = '<p style="text-align: center; background-color: #001e6c; color: white; height: 5rem; width: 100%; padding-top: 2rem; padding-bottom: 2rem;"><span style="font-size: 3em;"><img style="width: 45px; margin-right: 1rem; margin-top: 1rem;" src="https://i.postimg.cc/zvCWkSbG/icon.png" />'+
        'Új regisztáció</span></p><table style="background-color: #00000020; margin-top: 1rem; border: none; padding: 2rem; font-size: 18pt; border-radius: 1rem; margin: auto; width: 80%;"><tbody style="margin: 1rem;"><tr><td>'+
        'Név:</td><td>'+email.name+
        '</td><td style="width: 10%;">&nbsp;</td><td>'+
        'Osztály:</td><td>'+email.class+'</td></tr><tr style="height: 0.6rem;"><td colspan="5"><hr /></td></tr><tr style="margin-top: 1rem;"><td>'+
        'OM azonosító;t&oacute;:</td><td>'+ email.om+'</td><td style="width: 10%;">&nbsp;</td><td>'+
        'E-mail:</td><td>'+email.toEmail+'</td></tr></tbody></table><p>&nbsp;</p>';

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: this.account.user,
                pass: this.account.pass,
            },
        });

        let info = await transporter.sendMail({
            from: `${email.name} <${email.fromEmail}>`,
            to: email.fromEmail, 
            subject: 'Regisztráció -- '+email.name+'/'+ email.class,
            text: "",
            html: html
        });
        return "Message sent: " + info.messageId;
    }


    async EmailSendingForReport(email) {
        var nodemailer = require('nodemailer');

        let html = '<p style="text-align: center; background-color: #001e6c; color: white; height: 5rem; width: 100%; padding-top: 2rem; padding-bottom: 2rem;"><span style="font-size: 3em;"><img style="width: 45px; margin-right: 1rem; margin-top: 1rem;" src="https://i.postimg.cc/zvCWkSbG/icon.png" /><strong><span style="font-family: georgia, palatino, serif;">Hiba jelent&eacute;s</span></strong></span></p>'+
        '<p style="text-align: center;"><strong><span style="font-family: georgia, palatino, serif; font-size: 14pt;">Hol tal&aacute;lhat&oacute; a hiba:</span></strong></p>'+
        '<p style="text-align: center;"><em><span style="font-family: georgia, palatino, serif; font-size: 14pt;"><span style="font-size: 18.6667px;">'+ email.where +'</span></span></em></p>'+
        '<p style="text-align: center;"><strong><span style="font-family: georgia, palatino, serif; font-size: 14pt;">Mi a hiba:</span></strong></p>'+
        '<p style="text-align: center;"><em><span style="font-family: georgia, palatino, serif; font-size: 14pt;"><span style="font-size: 18.6667px;">'+ email.what +'</span></span></em></p>'+
        '<p style="text-align: center; width: 100%; height: 1rem; background-color: #001e6c; margin-top: 2rem; margin-bottom: 2rem;">&nbsp;</p>'+
        '<p style="text-align: center;"><span style="font-family: georgia, palatino, serif; font-size: 14pt;">Küldő: </span></p>'+
        '<p style="text-align: center;"><span style="font-family: georgia, palatino, serif; font-size: 10pt;">'+ email.name +' - '+ email.class +'</span><br /><span style="font-family: georgia, palatino, serif; font-size: 10pt;">'+ email.fromEmail +'</span></p>'
        '<p style="text-align: center;">&nbsp;</p>';

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: this.account.user,
                pass: this.account.pass,
            },
        });

        let info = await transporter.sendMail({
            from: `${email.name} <${email.fromEmail}>`,
            to: 'foodwebusiness@gmail.com', 
            subject: 'Hiba jelentés',
            text: "",
            html: html
        });
        return "Message sent: " + info.messageId;
    }

    async ReplyEmailSendingForReport(email) {
        var nodemailer = require('nodemailer');

        let html = '<div style="border-radius: 1rem; border: 1px solid black; font-size: larger; margin: auto; margin-top: 5rem; width: 80vw;">'+
        '<div style="background-color: #001e6c; border-radius: 1rem 1rem 0 0; padding: 1rem;"><img style="width: 15rem;" src="https://i.postimg.cc/x1wf0rpB/Food-Web-logo.png" /></div>'+
        '<div style="text-align: left; padding: 2rem;">'+
        '<p><span style="font-size: 18pt; font-family: georgia, palatino, serif;">K&ouml;sz&ouml;nj&uuml;k a visszajelz&eacute;s&eacute;t!</span></p>'+
        '<h4><span style="font-family: georgia, palatino, serif;">&Uuml;dv&ouml;zlettel, <em>Food-E</em></span></h4>'+
        '</div>'+
        '<div style="background-color: #001e6c; border-radius: 0 0 1rem 1rem; padding: 1rem; height: 3rem;">&nbsp;</div>'+
        '</div>';

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: this.account.user,
                pass: this.account.pass,
            },
        });

        let info = await transporter.sendMail({
            from: "'FoodE' <foodwebusiness@gmail.com>",
            to: email.fromEmail, 
            subject: 'noreply',
            text: "",
            html: html
        });
        return "Message sent: " + info.messageId;
    }
}

module.exports = new emailSend();