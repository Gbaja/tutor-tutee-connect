const {
  existingRefereeInfo,
  addTutorReference
} = require('../logics/queries');

exports.post = (req, res) => {
  //res.sendfile('../../public/master.js')
  const reference_form_details = req.body;
  //console.log(req.params);
  console.log(reference_form_details);
return  existingRefereeInfo(1).then((queryRes)=>{
    console.log(queryRes);
    return addTutorReference(queryRes[0].referee_id, queryRes[0].tutor_id, queryRes[0].name, reference_form_details.referee_how, reference_form_details.referee_tutoring_fit, reference_form_details.referee_comments)
  }).then(()=>{
    console.log("go");
  }).catch((err)=>{
    throw err;
  })
}
