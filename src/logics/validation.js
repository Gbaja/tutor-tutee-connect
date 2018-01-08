const validator = require('validator');
const bcrypt = require('bcryptjs');

const checkPasswordIsCorrect = (user_password, queryRes) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(user_password, queryRes[0].password, (err, bcryptRes) => {
      if (err) {
        reject(new Error("Server error"));
      } else if (bcryptRes) {
        resolve(queryRes)
      } else {
        reject(new Error("Incorrect password. Please try again."))
      }
    });
  })
}

const validateEmail = (email) => {
  return new Promise((resolve, reject)=>{
    const checkEmail = validator.isEmail(email);
    if(!checkEmail){
      reject(new Error("Please make sure you have entered a valid email in both your email and your guardian's email."))
    } else {
      resolve(email)
    }
  })
}

const checkStrongPassword = (password) =>{
  return new Promise((resolve, reject)=>{
    const strongPassword = validator.matches(password, /^(?=.*[A-Z])(?=.*[$@$!%*?])(?=.*[0-9]).{8,}$/)
    if(!strongPassword){
      reject(new Error("Passwords must contain one uppercase letter, one number, one special case letter(!@#$&*) and must be a minimum of 8 characters."))
    } else {
      resolve(password)
    }
  })
}

const checkPostCode = (postcode) => {
  return new Promise((resolve, reject) => {
    const ukNumber = validator.isPostalCode(postcode, 'GB')
    if(!ukNumber){
      reject(new Error("Please enter a valid uk postcode!"))
    } else {
      resolve(postcode)
    }
  })
}

const stringNotEqual = (value1, value2, person, thing) => {
  return new Promise((resolve, reject)=>{
    const checkEmails = validator.equals(value1, value2)
    if(checkEmails){
      reject(new Error(`Please make sure your ${thing} is not the same as your ${person} ${thing}.`))
    } else {
      resolve()
    }
  })
}

const validateMobileNumber = (number) => {
  return new Promise((resolve, reject)=>{
    const checkNumber = validator.isMobilePhone(number, 'en-GB');
    if(!checkNumber){
      reject(new Error('Please make sure you have entered a valid UK number for you and your guardian.'))
    } else {
      resolve();
    }
  })
}

const checkYearOfBirth = (year) =>{
  return new Promise((resolve, reject)=>{
    const length = 4;
    if(year.length !== length){
      reject(new Error('Please make sure your year of birth has 4 only numbers'))
    } else {
      resolve();
    }
  })
}

const hashPassword = (person_password) =>{
  return new Promise((resolve, reject) => {
    bcrypt.hash(person_password, 10, (err, bcryptRes) => {
      if (err) {
        reject(new Error("bcrypt error"))
      } else {
        resolve(bcryptRes)
      }
    })
  })
}

const userExists = (queryRes) =>{
  return new Promise((resolve, reject) => {
    if (queryRes[0].exists) {
      reject(new Error('This user already exists, please login'));
    } else {
      resolve();
    }
  })
}

const passwordMatch = (password, confirmPassword) => {
  return new Promise((resolve, reject)=>{
    const checkPasswordMatch = validator.equals(password, confirmPassword)
    if(!checkPasswordMatch){
      reject(new Error(`Passwords do not match.`))
    } else {
      resolve()
    }
  })
}


//ps: you still need to disabled checkbox when subject isnt selected.

const checkArrayIsEmpty =(arrayList)=>{
  return new Promise(function(resolve, reject){
      const makeArrString = arrayList.join();
      if (typeof arrayList === 'undefined' || arrayList === null) {
        reject(new Error(`Please make sure you select level for each chosen subject.`));
      } else {
        resolve(makeArrString);
      }

  })
};

module.exports = {
  checkPasswordIsCorrect,
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
}
