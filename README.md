# Tutor Tutee Connect (TTC)

## What

A website that allows students looking for a private tutor(tutees) in any subject and level to be able to find people that are offering private tuition(tutors) in their chosen level and subjects. 

## Who

The website has two main users- tutors and tutees.

Tutors are required to have somone write a reference for them. Referees are abe to fill out the reference form on the website. 

## User stories

As a tutor I can: 
* [x] Register for an account
* [x] Log in to my account any time
* See a list of tutees looking for a tutor in the subject I have said I can teach and at the level that I can teach it
* Express an interest in tutoring someone 
* Be notified by email if a tutee has booked a session with me and be sent details of that booking
* Confirm a booking. 

As a tutee I can:
* [x] Register for an account
* [x] Log in to that account anytime
* See a list of tutors that can teach the subject I need a tutor in and at the level I have specified
* I can book a session with a tutor and be notified if the session has been accepted
* I can be notified if a tutor has expressed an interest in tutoring me. 

As a referee I can: 
* [x] Be notified if a tutor has put me down as their referee and be sent a link to fill out a reference form for them
* [x] Go through a check to make sure that ny email has indeed been submitted to be a referee and confirm I know the tutor
* I can fill out a reference form. 

## How 

Tech stack: Html, Css, Javascript, ExpressJS, Express handlebars, Postgresql.

Middlewares/Modules: pgpromise, validator, express-session, connect-flash, nodemailer, bcryptjs.


## Why

This website was designed and developed by me for practise purpose only. Not  for commercial use.

I used this project an opportunity to  consolidate and demonstrate my knowledge of the tech stack used.

## Thoughts

After learning express and handlebars on my course, I felt like I needed to do something to help me understand better and to learn more about middleswares/npm modules  This project allowed me to do so and I was also able to implement some server side validation. I have a few tables(more than necessary) on purpose help me build on my understanding of relationships in sql. This also ties in to why I have long form

I used promise for the first time in this project mostly through using the pg-promise npm module, I might have got carried a way with the then's aswell (🙈). I have learnt a better way to chain my promises to make code cleaer and more readable. Another thing I have since learnt is how to handle errors in express.
