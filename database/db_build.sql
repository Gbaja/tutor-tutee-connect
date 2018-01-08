BEGIN;

DROP TABLE IF EXISTS tutors CASCADE;
DROP TABLE IF EXISTS tutors_info CASCADE;
DROP TABLE IF EXISTS tutor_subjects CASCADE;
DROP TABLE IF EXISTS tutor_reference CASCADE;
DROP TABLE IF EXISTS reference_info CASCADE;
DROP TABLE IF EXISTS tutees CASCADE;
DROP TABLE IF EXISTS tutee_guardians CASCADE;
DROP TABLE IF EXISTS tutee_subjects CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;


CREATE TABLE tutors (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  postcode VARCHAR(16) NOT NULL,
  email VARCHAR(50) NOT NULL,
  year_of_birth VARCHAR(4) NOT NULL,
  monday_avalability VARCHAR(20),
  tuesday_avalability VARCHAR(20),
  wednesday_avalability VARCHAR(20),
  thursday_avalability VARCHAR(20),
  friday_avalability VARCHAR(20),
  saturday_avalability VARCHAR(20),
  sunday_avalability VARCHAR(20),
  password VARCHAR(100) NOT NULL
);

CREATE TABLE tutors_info (
  id SERIAL PRIMARY KEY,
  tutor_id INTEGER REFERENCES tutors(id) ON DELETE CASCADE,
  about_yourself TEXT,
  teaching_experience TEXT,
  tutoring_approach TEXT,
  education_background TEXT,
  dbs VARCHAR(3)
);

CREATE TABLE tutor_subjects (
  id SERIAL PRIMARY KEY,
  tutor_id INTEGER REFERENCES tutors(id) ON DELETE CASCADE,
  subject1 TEXT,
  subject1_level TEXT,
  subject2 TEXT,
  subject2_level TEXT,
  subject3 TEXT,
  subject3_level TEXT
);

CREATE TABLE tutor_reference (
  id SERIAL PRIMARY KEY,
  tutor_id INTEGER REFERENCES tutors(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  relations TEXT
);

CREATE TABLE reference_info (
  id SERIAL PRIMARY KEY,
  referee_id INTEGER REFERENCES tutor_reference(id) ON DELETE CASCADE,
  tutor_id INTEGER REFERENCES tutors(id),
  name VARCHAR(100) NOT NULL,
  how TEXT,
  tutoring_fit TEXT,
  comments TEXT
);

CREATE TABLE tutees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  postcode VARCHAR(16) NOT NULL,
  email VARCHAR(100) NOT NULL,
  year_of_birth VARCHAR(4) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE tutee_guardians (
  id SERIAL PRIMARY KEY,
  tutee_id INTEGER REFERENCES tutees(id) ON DELETE CASCADE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL
);

CREATE TABLE tutee_subjects (
  id SERIAL PRIMARY KEY,
  tutee_id INTEGER REFERENCES tutees(id) ON DELETE CASCADE,
  subject1 TEXT,
  subject1_level TEXT,
  subject2 TEXT,
  subject2_level TEXT,
  subject3 TEXT,
  subject3_level TEXT
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  tutee_id INTEGER REFERENCES tutees(id) NOT NULL,
  tutor_id INTEGER REFERENCES tutors(id) NOT NULL,
  session_date DATE NOT NULL,
  session_time TIME NOT NULL,
  venue VARCHAR(200),
  comment TEXT
);

INSERT INTO tutors (first_name, last_name, mobile_number, postcode, email, year_of_birth, monday_avalability, tuesday_avalability, wednesday_avalability, thursday_avalability, friday_avalability, saturday_avalability, sunday_avalability, password)
VALUES ('Fatimat', 'Gbaja', '07946167602', 'SE5 8ES', 'gbajaf@yahoo.co.uk', '1995','PM','Unavailable', 'AM', 'AM and PM', 'PM', 'Unavailable', 'AM','fatimat');
INSERT INTO tutors_info (tutor_id, about_yourself, teaching_experience, tutoring_approach, education_background, dbs)
                 VALUES ((SELECT id FROM tutors WHERE email = 'gbajaf@yahoo.co.uk'), 'I am a badass teacher', 'I have taught a lot of badass students', 'I take a badass approach', 'I have a sick background', 'yes');
INSERT INTO tutor_subjects (tutor_id, subject1, subject1_level, subject2, subject2_level, subject3, subject3_level)
                 VALUES((SELECT id FROM tutors WHERE email = 'gbajaf@yahoo.co.uk'), 'English', 'Primary', 'Accounting', 'GCSE', 'Biology', 'A level');
INSERT INTO tutor_reference (tutor_id, name, email, relations)
            VALUES ((SELECT id FROM tutors WHERE email = 'gbajaf@yahoo.co.uk'), 'Sophie','sophie@hotmail.com', 'teacher');
INSERT INTO reference_info (referee_id, tutor_id, name, how, tutoring_fit, comments)
                     VALUES((SELECT id FROM tutor_reference WHERE id = 1), (SELECT id FROM tutors WHERE email = 'gbajaf@yahoo.co.uk'), 'Sophie', 'I was Fatimat maths teacher', 'She is fit to tutor', 'I confirm that she is a badass teacher');
INSERT INTO tutees (first_name, last_name, mobile_number, postcode, email, year_of_birth,password)
            VALUES ('Anu', 'Badmos', '07926784287', 'SE15 8AE', 'anu@hotmail.com', '2007','anuoluwapo');
INSERT INTO tutee_guardians (tutee_id, first_name, last_name, mobile_number, email)
            VALUES ((SELECT id FROM tutees WHERE email = 'anu@hotmail.com'), 'Mariam', 'Badmos', '079126627627', 'mariam@yahoo.co.uk');
INSERT INTO tutee_subjects (tutee_id, subject1, subject1_level, subject2, subject2_level, subject3, subject3_level)
                    VALUES((SELECT id FROM tutees WHERE email = 'anu@hotmail.com'), 'Mathematics', 'Primary', 'Physics', 'GCSE', 'Biology', 'A level');
INSERT INTO sessions (tutee_id, tutor_id, session_date, session_time, venue, comment)
            VALUES ((SELECT id FROM tutees WHERE email = 'anu@hotmail.com'), (SELECT id FROM tutors WHERE email = 'gbajaf@yahoo.co.uk'), '01/10/2001', '02:00:00', 'Library', 'Please bring past papers');
COMMIT;
