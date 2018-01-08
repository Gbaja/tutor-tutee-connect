const dbConnection = require('../../database/db_connections');

const checkTuteeExists = (email) => dbConnection.query('SELECT EXISTS(SELECT email FROM tutees WHERE email = $1)', [email])

const registerTutee = (first_name, last_name, mobile_number, postcode, email, year_of_birth, password) => dbConnection.query('INSERT INTO tutees (first_name, last_name, mobile_number, postcode, email, year_of_birth, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [first_name, last_name, mobile_number, postcode, email, year_of_birth, password])

const registerTuteeSubject = (tutee_id, subject1, subject1_level, subject2, subject2_level, subject3, subject3_level) => dbConnection.query('INSERT INTO tutee_subjects (tutee_id, subject1, subject1_level, subject2, subject2_level, subject3, subject3_level) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING tutee_id', [tutee_id, subject1, subject1_level, subject2, subject2_level, subject3, subject3_level])

const registerTuteeGuardian = (tutee_id, first_name, last_name, mobile_number, email) => dbConnection.query('INSERT INTO tutee_guardians (tutee_id, first_name, last_name, mobile_number, email) VALUES ($1, $2, $3, $4, $5) RETURNING tutee_id', [tutee_id, first_name, last_name, mobile_number, email])

const checkTutorExists = (email) => dbConnection.query('SELECT EXISTS(SELECT email FROM tutors WHERE email = $1)', [email])

const registerTutor = (first_name, last_name, mobile_number, postcode, email, year_of_birth, monday_avalability, tuesday_avalability, wednesday_avalability, thursday_avalability, friday_avalability, saturday_avalability, sunday_avalability, password) => dbConnection.query('INSERT INTO tutors (first_name, last_name, mobile_number, postcode, email, year_of_birth, monday_avalability, tuesday_avalability, wednesday_avalability, thursday_avalability, friday_avalability, saturday_avalability, sunday_avalability, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id', [first_name, last_name, mobile_number, postcode, email, year_of_birth, monday_avalability, tuesday_avalability, wednesday_avalability, thursday_avalability, friday_avalability, saturday_avalability, sunday_avalability, password])

const registerTutorInfo = (tutor_id, about_yourself, teaching_experience, tutoring_approach, education_background, dbs) => dbConnection.query('INSERT INTO tutors_info (tutor_id, about_yourself, teaching_experience, tutoring_approach, education_background, dbs) VALUES ($1, $2, $3, $4, $5, $6) RETURNING tutor_id', [tutor_id, about_yourself, teaching_experience, tutoring_approach, education_background, dbs])

const registerTutorSubjects = (tutor_id, subject1, subject1_level, subject2, subject2_level, subject3, subject3_level) => dbConnection.query('INSERT INTO tutor_subjects (tutor_id, subject1, subject1_level, subject2, subject2_level, subject3, subject3_level) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING tutor_id', [tutor_id, subject1, subject1_level, subject2, subject2_level, subject3, subject3_level])

const registerTutorReference = (tutor_id, name, email, relations) => dbConnection.query('INSERT INTO tutor_reference (tutor_id, name, email, relations) VALUES ($1, $2, $3, $4) RETURNING tutor_id', [tutor_id, name, email, relations])

const getTutorDetailsForLogin = (email) => dbConnection.query('SELECT id, first_name, password FROM tutors WHERE email = $1', [email])

const getTuteeDetailsForLogin = (email) => dbConnection.query('SELECT id, first_name, password FROM tutees WHERE email = $1', [email])

const bookSession = (tutee_id, tutor_id, session_date, session_time, venue, comment) => dbConnection.query('INSERT INTO sessions (tutee_id, tutor_id, session_date, session_time, venue, comment) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [tutee_id, tutor_id, session_date, session_time, venue, comment])

// const checkTutorExistsReference = (email) => dbConnection.query('SELECT EXISTS(SELECT email FROM tutors WHERE email = $1) RETURNING id', [email])

const checkTutorExistsReference = (email) => dbConnection.query('SELECT id FROM tutors WHERE email = $1', [email])

const checkReferrerEmail = (email, tutor_id) => dbConnection.query('SELECT EXISTS(SELECT email FROM tutor_reference WHERE email = $1 and tutor_id = $2)', [email, tutor_id])


const existingRefereeInfo = (tutor_id) => dbConnection.query('SELECT id AS referee_id, tutor_id, name FROM tutor_reference WHERE tutor_id = $1', [tutor_id])

const addTutorReference = () => dbConnection.query('INSERT INTO reference_info (referee_id, tutor_id, name, how, tutoring_fit, comments) VALUES ($1, $2, $3, $4, $5, $6)', [referee_id, tutor_id, name, how, tutoring_fit, comments])

module.exports = {
  checkTuteeExists,
  registerTutee,
  registerTuteeSubject,
  registerTuteeGuardian,
  checkTutorExists,
  registerTutor,
  registerTutorInfo,
  registerTutorSubjects,
  registerTutorReference,
  getTutorDetailsForLogin,
  getTuteeDetailsForLogin,
  bookSession,
  checkTutorExistsReference,
  checkReferrerEmail,
  existingRefereeInfo,
  addTutorReference
}
