exports.get = (req, res) => {
  if(req.session.Loggedin === true){
    res.render('tutor_welcome_page')
  } else {
    res.send("You are not logged in, please do so before accessing this page.")
  }
}
