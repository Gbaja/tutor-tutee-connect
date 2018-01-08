const registerationCheckErr = (err, req, res, person, redirectDestination) =>{
//  let errors =
  if (err.message === 'This user already exists, please login') {
    req.flash('error_msg', err.message);
    res.redirect(redirectDestination);
  } else if (err.message === `Please make sure you have entered a valid email in both your email and your ${person} email.`) {
    req.flash('error_msg', err.message);
    res.redirect(redirectDestination);
  } else if (err.message === "Passwords must contain one uppercase letter, one number, one special case letter(!@#$&*) and must be a minimum of 8 characters.") {
    req.flash('error_msg', err.message);
    res.redirect(redirectDestination);
  } else if (err.message === "Please enter a valid uk postcode!") {
    req.flash('error_msg', err.message);
    res.redirect(redirectDestination);
  } else if (err.message === `Please make sure your email is not the same as your ${person} email.`) {
    req.flash('error_msg', err.message);
    res.redirect(redirectDestination);
  } else if (err.message === `Please make sure you have entered a valid UK number for you and your ${person}.`) {
    req.flash('error_msg', err.message);
    res.redirect(redirectDestination);
  } else if (err.message === 'Please make sure your year of birth has 4 only numbers') {
    req.flash('error_msg', err.message);
    res.redirect(redirectDestination);
  }else if (err.message === `Please make sure your mobile number is not the same as your ${person} mobile number.`) {
    req.flash('error_msg', err.message);
    res.redirect(redirectDestination);
  } else if (err.message === "Passwords do not match.") {
    req.flash('error_msg', err.message);
    res.redirect(redirectDestination);
  } else if (err.message === "Please make sure you select level for each chosen subject.") {
    req.flash('error_msg', err.message);
    res.redirect(redirectDestination);
  }else {
    throw err
  }
}

module.exports = {
  registerationCheckErr
}
