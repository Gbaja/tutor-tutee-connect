const bcrypt = require('bcryptjs');
const {
  checkTuteeExists,
  getTuteeDetailsForLogin,
  checkTutorExists,
  getTutorDetailsForLogin
} = require('../logics/queries');

exports.post = (req, res) => {
  login_tutee(req, res);
}

const login_tutee = (req, res) => {
  const login_details = req.body;

  checkTuteeExists(login_details.login_email).then((queryRes) => {
    console.log(queryRes[0]);
    return new Promise((resolve, reject) => {
      if (!queryRes[0].exists) {
        reject(login_tutor(req, res))
      } else {
        resolve();
      }
    })
  }).then(() => {
    return getTuteeDetailsForLogin(login_details.login_email)
  }).then((queryRes) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(login_details.login_password, queryRes[0].password, (err, bcryptRes) => {
        if (err) {
          reject(new Error("Server error"));
        } else if (bcryptRes) {
          resolve(queryRes)
        } else {
          reject(new Error("Incorrect password. Please try again."))
        }
      });
    })
  }).then((queryRes) => {
    req.session.name = queryRes[0].first_name;
    req.session.Loggedin = true;
    req.session.tutee_id = queryRes[0].id;
    console.log(req.session);
    res.render('tutee_welcome_page')
  }).catch((err) => {
    if (err.message === 'Incorrect password. Please try again.') {
      req.flash('error_msg', err.message);
      res.redirect('/login_page');
    } else {
      throw err
    }
  })
}

const login_tutor = (req, res) => {
  const login_details = req.body;

  checkTutorExists(login_details.login_email).then((queryRes) => {
    console.log(queryRes[0]);
    return new Promise((resolve, reject) => {
      if (!queryRes[0].exists) {
        reject(new Error('This user does not exists, please register.'))
      } else {
        resolve();
      }
    })
  }).then(() => {
    return getTutorDetailsForLogin(login_details.login_email)
  }).then((queryRes) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(login_details.login_password, queryRes[0].password, (err, bcryptRes) => {
        if (err) {
          reject(new Error("Server error"));
        } else if (bcryptRes) {
          resolve(queryRes)
        } else {
          reject(new Error("Incorrect password. Please try again."))
        }
      });
    })
  }).then((queryRes) => {
    req.session.name = queryRes[0].first_name;
    req.session.Loggedin = true;
    req.session.tutor_id = queryRes[0].id;
    console.log(req.session);
    res.render('tutor_welcome_page')
  }).catch((err) => {
    if (err.message === 'This user does not exists, please register.') {
      req.flash('error_msg', err.message);
      res.redirect('/login_page');
    } else if (err.message === 'Incorrect password. Please try again.') {
      req.flash('error_msg', err.message);
      res.redirect('/login_page');
    } else {
      throw err
    }
  })
}
