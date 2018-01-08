const {bookSession} = require('../logics/queries');

exports.post = (req, res) => {
  const session_details = req.body;
  //change first arguement to be id of the tutee booking and second arguement to be the id of the tutor they are booking
  bookSession("1", "2", session_details.date, session_details.time, session_details.venue, session_details.comment).then((id)=>{
    const session_id = session_id[0].id
    console.log("Booked");
  }).catch((err)=>{
    throw err;
  })
}
