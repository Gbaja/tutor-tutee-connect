exports.get = (req, res) => {
  console.log(req.params);
  res.render("reference_form_page");
}
