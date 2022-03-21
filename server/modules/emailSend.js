class emailSend {
    async makeAccount(details){
        const nodemailer = require('nodemailer');
        const account = {
            user: "information.foodE@gmail.com",
            pass: process.env.EMAIL_PASS
        };
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
        let info = await transporter.sendMail({
            from: details.from,
            to: details.to,
            subject: details.subject,
            text: "",
            html: details.html
        });
        return "Message sent: " + info.messageId;
    }

    async EmailSendingForRegisterBefore(email) {
        let html =
            '<div style="width: 80%; border-radius: 2rem; border: 1px solid black; margin: auto;  margin-top: 1rem; font-family: Georgia, `Times New Roman`, Times, serif">'
            + '<div class="header" style="background-color: #001e6c; border-radius: 2rem 2rem 0 0;">'
            + '<img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem;">'
            + '</div>'
            + '<div style="margin: 1rem;">'
            + ' <h1 style="font-size: 2vw;">Kedves ' + email.name + '!</h1>'

            + '<hr>'
            + ' <p style="font-size: 1.7vw;">A regisztrációja elbírálás alatt van, kérjük legyen türelemmel. Amint sikeresen lezárult a regisztáció, e-mailben értesítsük.</p>'

            + '<p style="font-size: 1.4vw;">Ha bármilyen kérdés merül fel, forduljon hozzánk bizalommal: <span><br>information.foode@gmail.com</span></p>'
            + '<hr>'

            + ' <p style="font-size: 1.2vw;">Üdvözlettel: <i>FoodE</i></p>'
            + ' </div>'

            + '<div class="lower" style="background-color: #001e6c; border-radius: 0 0 2rem 2rem;">'
            + '<img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem; opacity: 0;">'
            + ' </div>'
            + ' </div>';

        const details = {
            from: "FoodE <information.foode@gmail.com>",
            to: email.email,
            html: html,
            subject: "Regisztáció"
        }
        return this.makeAccount(details);
    }

    async EmailSendingForRegisterAcceptedFromDataBase(email){
        let html =
        '<div style="width: 80%; border-radius: 2rem; border: 1px solid black; margin: auto; margin-top: 1rem; font-family: Georgia, `Times New Roman`, Times, serif">'
        + '<div class="header" style="background-color: #001e6c; border-radius: 2rem 2rem 0 0;">'
        + '  <img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem;">'
        + ' </div>'
        + '<div style="margin: 1rem;">'
        + ' <h1 style="font-size: 2vw;">Kedves ' + email.name + '!</h1>'

        + '  <hr>'
        + ' <p style="font-size: 1.7vw;"><b>Sikeresen regisztált a Food-E weboldalon.</b> '
        + '   <br> A továbbiakban'
        + '   <a href="https://www.foode.hu">itt</a>'
        + '   tud bejelentkezni a következő azonosítóval illetve jelszóval:'
        + ' </p>'
        + ' <p style="font-size: 1.2vw;> Azonosító: <i>' + email.omAzon + '</i>, Jelszó: <i>' + email.pass + '</i> </p>'
        + ' <p style="font-size: 1.4vw;">Bejeletkezés után kérjül változtassa meg a jelszavát!</p>'

        + ' <p style="font-size: 1.4vw;">Ha bármilyen kérdés merül fel, forduljon hozzánk bizalommal: <span><br>information.foode@gmail.com</span></p>'
        + ' <hr>'

        + ' <p style="font-size: 1.2vw;">Üdvözlettel: <i>FoodE</i></p>'
        + '</div>'

        + '<div class="lower" style="background-color: #001e6c; border-radius: 0 0 2rem 2rem;">'
        + '<img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem; opacity: 0;">'
        + ' </div>'
        + '</div>';

        const details = {
            from: "FoodE <information.foode@gmail.com>",
            to: email.email,
            html: html,
            subject: "Sikeres regisztáció"
        }
        return this.makeAccount(details);
    }

    async EmailSendingForRegisterAccepted(email) {
        let html =
            '<div style="width: 80%; border-radius: 2rem; border: 1px solid black; margin: auto; margin-top: 1rem; font-family: Georgia, `Times New Roman`, Times, serif">'
            + '<div class="header" style="background-color: #001e6c; border-radius: 2rem 2rem 0 0;">'
            + '  <img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem;">'
            + ' </div>'
            + '<div style="margin: 1rem;">'
            + ' <h1 style="font-size: 2vw;">Kedves ' + email.name + '!</h1>'

            + '  <hr>'
            + ' <p style="font-size: 1.7vw;"><b>Sikeresen regisztált a Food-E weboldalon.</b> '
            + '   <br> A továbbiakban a regisztrációnál megadott OM azonosítóval illetve a jelszóval tud bejelentkezni'
            + '   <a href="https://www.foode.hu">itt</a>.'
            + ' </p>'

            + ' <p style="font-size: 1.4vw;">Ha bármilyen kérdés merül fel, forduljon hozzánk bizalommal: <span><br>information.foode@gmail.com</span></p>'
            + ' <hr>'

            + ' <p style="font-size: 1.2vw;">Üdvözlettel: <i>FoodE</i></p>'
            + '</div>'

            + '<div class="lower" style="background-color: #001e6c; border-radius: 0 0 2rem 2rem;">'
            + '<img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem; opacity: 0;">'
            + ' </div>'
            + '</div>';

            const details = {
                from: "FoodE <information.foode@gmail.com>",
                to: email.email,
                html: html,
                subject: "Sikeres regisztáció"
            }
            return this.makeAccount(details);
    }

    async ReplyEmailSendingForRegister(email) {
        let html = '    <div style="width: 80%; border-radius: 2rem; border: 1px solid black; margin: auto; margin-top: 1rem; font-family: Georgia, `Times New Roman`, Times, serif">'
            + ' <div class="header" style="background-color: #001e6c; border-radius: 2rem 2rem 0 0;">'
            + '    <img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem;">'
            + ' </div>'
            + ' <div style="margin: 1rem;">'
            + '   <h1 style="font-size: 2vw; text-align: center;">Új regisztráció</h1>'

            + '   <hr>'
            + '  <table style="background-color: #00000020; border-radius: 2rem; margin: auto; padding: 2rem; width: 80%;">'
            + '   <tbody>'
            + '    <tr>'
            + '      <td style="color: #000000c0;">Név</td>'
            + '      <td style="font-weight: bold">' + email.name + '</td>'
            + '      <td></td>'
            + '      <td style="color: #000000c0;">Osztály</td>'
            + '      <td style="font-weight: bold">' + email.class + '</td>'
            + '   </tr>'
            + '   <tr style="height: 0.5rem;"></tr>'
            + '  <tr>'
            + '     <td style="color: #000000c0;">OM azonosító</td>'
            + '     <td style="font-weight: bold">' + email.omAzon + '</td>'
            + '     <td></td>'
            + '     <td style="color: #000000c0;">E-mail</td>'
            + '     <td style="font-weight: bold">' + email.email + '</td>'
            + '      </tr>'
            + '      <tr style="height: 0.5rem;"></tr>'
            + '      <tr>'
            + '         <td colspan="1" style="color: #000000c0;">Iskola</td>'
            + '          <td colspan="4" style="font-weight: bold">' + email.school + '</td>'
            + '      </tr>'
            + '     </tbody>'
            + '  </table>'

            + '   <hr>'
            + '    <p style="font-size: 1.4vw;">Regisztálás elfogadása: <a href="https://www.foode.hu/adatbazis">itt</a>.</p>'
            + '  </div>'

            + ' <div class="lower" style="background-color: #001e6c; border-radius: 0 0 2rem 2rem;">'
            + '   <img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem; opacity: 0;">'
            + '</div>'
            + '</div>';

            const details = {
                from: email.email,
                to: "information.foode@gmail.com",
                html: html,
                subject: "Regisztráció -- ' "+ email.name + '/' + email.class
            }
            return this.makeAccount(details);
    }

    async EmailSendingForReport(email) {
        let html = '<div style="width: 80%; border-radius: 2rem; border: 1px solid black; margin: auto; margin-top: 1rem; font-family: Georgia, `Times New Roman`, Times, serif">'
            + ' <div class="header" style="background-color: #001e6c; border-radius: 2rem 2rem 0 0;">'
            + '    <img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem;">'
            + ' </div>'
            + ' <div style="margin: 1rem;">'
            + '   <h1 style="font-size: 2vw; text-align: center;">Hiba jelentés</h1>'

            + '   <hr>'
            + '  <table style="background-color: #00000020; border-radius: 2rem; margin: auto; padding: 2rem; width: 80%;">'
            + '    <tbody>'
            + '      <tr>'
            + '        <td colspan="5" style="color: #000000c0; text-align: center;">Hol a hiba:</td>'

            + '     </tr>'
            + '    <tr>'
            + '        <td colspan="5" style="text-align: center;">' + email.where + '</td>'
            + '    </tr>'
            + '    <tr>'
            + '        <td colspan="5" style="color: #000000c0; text-align: center;">Hiba leírása:</td>'

            + '    </tr>'
            + '   <tr>'
            + '       <td colspan="5" style="text-align: center;">' + email.what + '</td>'
            + '    </tr>'
            + '   <tr style="height: 1rem;"></tr>'
            + '   <tr>'
            + '       <td colspan="5" style="color: #000000c0; text-align: center;">Küldő:</td>'
            + '   </tr>'
            + '   <tr>'
            + '       <td style="color: #000000c0;">Név</td>'
            + '       <td style="font-weight: bold">' + email.name + '</td>'
            + '       <td></td>'
            + '       <td style="color: #000000c0;">Osztály</td>'
            + '       <td style="font-weight: bold">' + email.class + '</td>'
            + '    </tr>'
            + '    <tr style="height: 0.5rem;"></tr>'
            + '     <tr>'
            + '        <td style="color: #000000c0;">OM azonosító</td>'
            + '         <td style="font-weight: bold">' + email.omAzon + '</td>'
            + '         <td></td>'
            + '        <td style="color: #000000c0;">E-mail</td>'
            + '         <td style="font-weight: bold">' + email.email + '</td>'
            + '     </tr>'
            + '    <tr style="height: 0.5rem;"></tr>'
            + '   </tbody>'
            + ' </table>'

            + '     <hr>'

            + '  </div>'

            + '  <div class="lower" style="background-color: #001e6c; border-radius: 0 0 2rem 2rem;">'
            + '      <img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem; opacity: 0;">'
            + '  </div>'
            + ' </div>';

            const details = {
                to: "report.foode@gmail.com",
                from: email.fromEmail,
                html: html,
                subject: "Hiba jelentés"
            }
            return this.makeAccount(details);
    }

    async ReplyEmailSendingForReport(email) {
        let html = '<div style="width: 80%; border-radius: 2rem; border: 1px solid black; margin: auto; margin-top: 1rem; font-family: Georgia, `Times New Roman`, Times, serif">'
            + ' <div class="header" style="background-color: #001e6c; border-radius: 2rem 2rem 0 0;">'
            + '   <img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem;">'
            + ' </div>'
            + ' <div style="margin: 1rem;">'
            + '    <hr>'
            + '   <p style="font-size: 2vw; text-align: center;">'
            + '       Köszönjük a visszajelzését! <br>Jelentése rögzítésre került.'
            + '   </p>'
            + '   <hr>'
            + '   <p style="font-size: 1.2vw;">Üdvözlettel: <i>FoodE</i></p>'
            + ' </div>'

            + '  <div class="lower" style="background-color: #001e6c; border-radius: 0 0 2rem 2rem;">'
            + '    <img src="https://i.ibb.co/1dsRrHm/Food-Web-logo.png" alt="Food-Web-logo" style="width: 25%; margin: 1rem; opacity: 0;">'
            + ' </div>'
            + '</div>';

            const details = {
                from: "FoodE <report.foode@gmail.com>",
                to: email.fromEmail,
                html: html,
                subject: "noreply"
            }
            return this.makeAccount(details);
    }
}

module.exports = new emailSend();