const express = require('express');
const path = require('path');
const router = express.Router();
const home = require('./home')
const contact_form = require('./contact_form')
const register_tutee_page = require('./register_tutee_page');
const register_tutor_page = require('./register_tutor_page');
const register_tutee = require('./register_tutee');
const register_tutor = require('./register_tutor');
const login_page = require('./login_page');
const login = require('./login');
const book_session_page = require('./book_session_page');
const book_session = require('./book_session');
const tutee_welcome = require('./tutee_welcome');
const tutor_welcome = require('./tutor_welcome');
const reference_check_page = require('./reference_check_page');
const reference_check = require('./reference_check');
const reference_form_page = require('./reference_form_page');
const reference_form = require('./reference_form');

router.get('/', home.get);
router.post('/contact_form', contact_form.post)
router.get('/register_tutor_page', register_tutor_page.get);
router.get('/register_tutee_page', register_tutee_page.get);
router.post('/register_tutee', register_tutee.post);
router.post('/register_tutor', register_tutor.post);
router.get('/login_page', login_page.get);
router.post('/login', login.post);
router.get('/book_session_page', book_session_page.get);
router.post('/book_session', book_session.post);
router.get('/tutee_welcome', tutee_welcome.get)
router.get('/tutor_welcome', tutor_welcome.get)
router.get('/reference_check_page', reference_check_page.get);
router.post('/reference_check', reference_check.post);
router.get('/reference_form_page/lol', reference_form_page.get);
router.post('/reference_form', reference_form.post);

module.exports = router;
