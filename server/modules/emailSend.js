class emailSend {
    account = {
        user: "foodwebusiness@gmail.com",
        pass: "dowqcumjoxgirnlz"
    }

    async EmailSending(email) {
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
        console.log("Message sent: %s", info.messageId);
    }
}

module.exports = new emailSend();