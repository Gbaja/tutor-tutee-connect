const nodemailer = require('nodemailer');

const tuteeRegisterationConfirmationEmails = (tuteeEmailAddress, guardianEmailAddress, tuteeName, guardianName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tutortuteeconnect@gmail.com',
      pass: process.env.password
    }
  });

  const tuteeEmail = {
    from: 'tutortuteeconnect@gmail.com',
    to: tuteeEmailAddress,
    subject: 'You have registered as a tutee on Tutor Tutee Connect',
    html: `<p> Dear ${tuteeName},</p><p> Thank you for registering as a tutee on our website. You can now log in to the website to connect with tutors.</p><p>If you have any questions, please do not hesitate to contact us.</p><p>Yours sincerely,</p> Tutor Tutee Connect team.`
  };
  transporter.sendMail(tuteeEmail, (err, info) => {
    if (error) {
      req.flash('error_msg', "Unable to send registeration confirmation email.");
      res.redirect('/register_tutee_page');
    } else {
      console.log("done.");
    }
  });

  const tuteeGuardianEmail = {
    from: 'tutortuteeconnect@gmail.com',
    to: guardianEmailAddress,
    subject: `${tuteeName} registered on Tutor Tutee Connect}`,
    html: `<p> Dear ${guardianName},</p><p> This is to inform you that ${tuteeName} has signed up as a tutee on our website and we are pleased they are using our service</p><p>If you give permission for them to be listed on our website, you do not have to do anything. If you do not give permission for them to be on our website then please do email us via tutortuteeconnect@gmail.com</p><p>Yours sincerely,</p> Tutor Tutee Connect team.`
  }
  transporter.sendMail(tuteeGuardianEmail, (err, info) => {
    if (error) {
      req.flash('error_msg', "Unable to send registeration confirmation email to guardian.");
      res.redirect('/register_tutee_page');
    } else {
      console.log("done.");
    }
  });
}

const tutorRegisterationConfirmationEmails = (tutorEmailAddress, refereeEmailAddress, tutorFirstName, tutorLastName,refereeName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tutortuteeconnect@gmail.com',
      pass: process.env.password
    }
  });
  const tutorEmail = {
    from: 'tutortuteeconnect@gmail.com',
    to: tutorEmailAddress,
    subject: 'You have registered as a tutor on Tutor Tutee Connect',
    html: `<p> Dear ${tutorFirstName},</p><p> Thank you for registering as a tutor on our website. You can now log in to the website to connect with tutees.</p><p>If you have any questions, please do not hesitate to contact us.</p><p>Yours sincerely,</p> Tutor Tutee Connect team.`
  };
  transporter.sendMail(tutorEmail, (err, info) => {
    if (error) {
      req.flash('error_msg', "Unable to send registeration confirmation email to guardian.");
      res.redirect('/register_tutor_page');
    } else {
      console.log("done.");
    }
  });

  const tutorReferenceEmail = {
    from: 'tutortuteeconnect@gmail.com',
    to: refereeEmailAddress,
    subject: 'Reference request',
    html: `<p> Dear ${refereeName},</p><p> ${tutorFirstName} ${tutorLastName} has put you down as their reference on Tutor Tutee Connect. Tutor tutee connect is a web platform that enables tutors to register and connect with tutees.</p><p>Please click <a href="http://localhost:8000/reference_check_page">here</a> to fill out a reference form for them.</p><p>We would appreciate if you can fill the form as soon as possible as ${tutorFirstName} application will not be approved without it. <p>Yours sincerely,</p> Tutor Tutee Connect team.`
  };
  transporter.sendMail(tutorReferenceEmail, (err, info) => {
    if (error) {
      req.flash('error_msg', "Unable to send registeration confirmation email to guardian.");
      res.redirect('/register_tutor_page');
    } else {
      console.log("done.");
    }
  });
}

module.exports = {
  tuteeRegisterationConfirmationEmails,
  tutorRegisterationConfirmationEmails
}
