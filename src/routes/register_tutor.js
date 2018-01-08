const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {
  checkTuteeExists,
  registerTutee,
  checkTutorExists,
  registerTutor,
  registerTutorInfo,
  registerTutorSubjects,
  registerTutorReference
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
  passwordMatch
} = require('../logics/validation');

const {
  tutorRegisterationConfirmationEmails
} = require('../logics/emails');

const {
  registerationCheckErr
} = require('../logics/registeration_err');

exports.post = (req, res) => {
  const tutor_details = req.body;
  console.log(req.body)
  validateEmail(tutor_details.email).then((email) => {
    return checkTutorExists(tutor_details.email)
  }).then((queryRes) => {
    return userExists(queryRes)
  }).then(() => {
    return passwordMatch(tutor_details.password, tutor_details.confirm_password)
  }).then(() => {
    return checkStrongPassword(tutor_details.password);
  }).then((password) => {
    return hashPassword(password)
  }).then((hash) => {
    tutor_details.password = hash
  }).then(() => {
    return validateMobileNumber(tutor_details.mobile_number)
  }).then(() => {
    return checkPostCode(tutor_details.postcode)
  }).then((postcode) => {
    tutor_details.postcode = postcode;
  }).then(() => {
    return checkYearOfBirth(tutor_details.year_of_birth)
  }).then(() => {
    return validateEmail(tutor_details.referee_email)
  }).then(() => {
    return stringNotEqual(tutor_details.email, tutor_details.referee_email, "referee's", "email");
  }).then(() => {
    return registerTutor(tutor_details.first_name, tutor_details.last_name, tutor_details.mobile_number, tutor_details.postcode, tutor_details.email, tutor_details.year_of_birth, tutor_details.monday_avalability, tutor_details.tuesday_avalability, tutor_details.wednesday_avalability, tutor_details.thursday_avalability, tutor_details.friday_avalability, tutor_details.saturday_avalability, tutor_details.sunday_avalability, tutor_details.password);
  }).then((tutor_id) => {
    return registerTutorInfo(tutor_id[0].id, tutor_details.about, tutor_details.teaching_experience, tutor_details.tutoring_approach, tutor_details.education_background, tutor_details.dbs_options);
  }).then((tutor_id) => {
    return registerTutorSubjects(tutor_id[0].tutor_id, tutor_details.subject1, tutor_details.sub1_ability_to_teach.toString(), tutor_details.subject2, tutor_details.sub2_ability_to_teach.toString(), tutor_details.subject3, tutor_details.sub3_ability_to_teach.toString())
  }).then((tutor_id) => {
    return registerTutorReference(tutor_id[0].tutor_id, tutor_details.referee_name, tutor_details.referee_email, tutor_details.referee_relations);
  }).then((tutor_id) => {
    req.session.name = tutor_details.first_name;
    req.session.Loggedin = true;
    req.session.tutor_id = tutor_id[0].tutor_id;
  tutorRegisterationConfirmationEmails(tutor_details.email, tutor_details.referee_email, tutor_details.first_name, tutor_details.last_name, tutor_details.referee_name);
  }).then(() => {
    console.log("Email sent")
    console.log(req.session);
    res.render('tutor_welcome_page');
  }).catch((err) => {
    registerationCheckErr(err, req, res, "referee's", './register_tutor_page')
  })
}
