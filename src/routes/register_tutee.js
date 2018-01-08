const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {
  checkTuteeExists,
  registerTutee,
  registerTuteeSubject,
  registerTuteeGuardian
} = require('../logics/queries');

const {
  validateEmail,
  checkStrongPassword,
  checkPostCode,
  stringNotEqual,
  validateMobileNumber,
  checkYearOfBirth,
  hashPassword,
  userExists,
  passwordMatch,
  checkArrayIsEmpty
} = require('../logics/validation');

const {
  tuteeRegisterationConfirmationEmails
} = require('../logics/emails');

const {
  registerationCheckErr
} = require('../logics/registeration_err');



exports.post = (req, res) => {
  const tutee_details = req.body;
  console.log(tutee_details);
  validateEmail(tutee_details.email).then((email) => {
    return checkTuteeExists(tutee_details.email)
  }).then((queryRes) => {
    return userExists(queryRes)
  }).then(() => {
    return passwordMatch(tutee_details.password, tutee_details.confirm_password)
  }).then(() => {
    return checkStrongPassword(tutee_details.password);
  }).then((password) => {
    return hashPassword(password)
  }).then((hash) => {
    tutee_details.password = hash
  }).then(() => {
    return validateMobileNumber(tutee_details.mobile_number)
  }).then(() => {
    return checkPostCode(tutee_details.postcode)
  }).then((postcode) => {
    tutee_details.postcode = postcode;
  }).then(() => {
    checkArrayIsEmpty(tutee_details.sub1_level)
  }).then((sub1_level_string)=>{
    tutee_details.sub1_level = sub1_level_string;
  }).then(() => {
    checkArrayIsEmpty(tutee_details.sub2_level)
  }).then((sub2_level_string)=>{
      tutee_details.sub2_level = sub2_level_string
  }).then(() => {
    checkArrayIsEmpty(tutee_details.sub3_level)
  }).then((sub3_level_string)=>{
      tutee_details.sub3_level = sub3_level_string
  }).then(() => {
    return checkYearOfBirth(tutee_details.year_of_birth)
  }).then(() => {
    return validateMobileNumber(tutee_details.guardian_mobile_number)
  }).then(() => {
    return validateEmail(tutee_details.guardian_email)
  }).then(() => {
    return stringNotEqual(tutee_details.email, tutee_details.guardian_email, "guardian's", "email");
  }).then(() => {
    return stringNotEqual(tutee_details.mobile_number, tutee_details.guardian_mobile_number, "guardian's", "mobile number");
  }).then(() => {
    return registerTutee(tutee_details.first_name, tutee_details.last_name, tutee_details.mobile_number, tutee_details.postcode, tutee_details.email, tutee_details.year_of_birth, tutee_details.password)
  }).then((tutee_id) => {
    return registerTuteeSubject(tutee_id[0].id, tutee_details.subject1, tutee_details.sub1_level, tutee_details.subject2, tutee_details.sub2_level, tutee_details.subject3, tutee_details.sub3_level)
  }).then((tutee_id) => {
    return registerTuteeGuardian(tutee_id[0].tutee_id, tutee_details.guardian_first_name, tutee_details.guardian_last_name, tutee_details.guardian_mobile_number, tutee_details.guardian_email)
  }).then((tutee_id) => {
    req.session.name = tutee_details.first_name;
    req.session.Loggedin = true;
    req.session.tutee_id = tutee_id[0].tutee_id;
    tuteeRegisterationConfirmationEmails(tutee_details.email, tutee_details.guardian_email, tutee_details.first_name, tutee_details.guardian_first_name)
  }).then(() => {
    res.render('tutee_welcome_page')
  }).catch((err) => {
    registerationCheckErr(err, req, res, "guardian's", '/register_tutee_page')
  })
}
