const nodemailer = require('nodemailer');

exports.post = (req, res) => {
  const contact_form_details = req.body;
  console.log(contact_form_details);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tutortuteeconnect@gmail.com',
        pass: process.env.password
      }
    });
    const contactEmail = {
      from: contact_form_details.contact_email,
      to: 'tutortuteeconnect@gmail.com',
      subject: 'Website Contact Form message',
      html: `<p> Dear Tutor Tutee Connect team,</p><p> From: ${contact_form_details.contact_name}.</p><p>${contact_form_details.contact_message}</p>`
    };
    transporter.sendMail(contactEmail, (err, info) => {
      if(err){
        req.flash('error_msg', "Unable to send email. Please make sure the email you have entered is a valid one or try again later. You can also send us an email directly if urgent.");
        res.redirect('/#contactSection');
      } else {
        req.flash('success', "Thank you for contacting us. We will be in touch soon");
        res.redirect('/#contactSection');
      }
    })

}
