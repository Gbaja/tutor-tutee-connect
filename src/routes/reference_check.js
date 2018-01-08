const {
  checkTutorExistsReference,
  checkReferrerEmail
} = require('../logics/queries');

exports.post = (req, res) => {
  console.log("checkedd");
  const reference_check_details = req.body;
  let  recipients_id;
  checkTutorExistsReference(reference_check_details.tutor_email).then((queryRes) => {
    console.log(queryRes);
    return new Promise((resolve, reject) => {
      if (queryRes.length === 0) {
        console.log("noo");
        reject(new Error("The tutor email address you have entered has not been used to register on our site. Please check with the person to make sure you have entered the correct email."))
      } else {
        resolve(queryRes[0].id);
      }
    })
  }).then((tutor_id) => {
    recipients_id = tutor_id;
    return checkReferrerEmail(reference_check_details.referee_email, tutor_id)
  }).then((queryRes) => {
    return new Promise((resolve, reject) => {
      if (!queryRes[0].exists) {
        console.log("noo referrer");
        reject(new Error("The email address you entered does not match the referee's email address the tutor registered with when registering. Please type the correct email."))
      } else {
        resolve();
      }
    })
  }).then(() => {
    res.redirect(`/reference_form_page/${recipients_id}`)
  }).catch((err) => {
    if (err.message === "The tutor email address you have entered has not been used to register on our site. Please check with the person to make sure you have entered the correct email.") {
      req.flash('error_msg', err.message);
      res.redirect('/reference_check_page');
    } else if (err.message === "The email address you entered does not match the referee's email address the tutor registered with when registering. Please type the correct email.") {
      req.flash('error_msg', err.message);
      res.redirect('/reference_check_page');
    } else {
      throw err;
    }
  })
}
