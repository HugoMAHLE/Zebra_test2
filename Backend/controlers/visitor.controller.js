import { VisitorModel } from "../models/visitor.model.js";
import jwt from 'jsonwebtoken'


// api/v1/visitor/create
const createVisitor = async(req, res) => {
  try{
    const {fname, lname, email, phone, company} = req.body

    if(!fname || !lname || !email || !phone || !company){
      return res.status(400).json({ ok: false, msg: "Missing Data" })
    }

    const visitor = await VisitorModel.findVisitorByEmail(email)
    if(visitor) {
      return res.status(409).json({ ok: false, msg: "Visitor already exist" })
    }

    const newvisitor = await VisitorModel.createVisitor({fname,lname, email, phone, company})
    return res.status(201).json({ok:true})

  }catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error del servidor' + error
    })

  }
}

// // api/v1/users/login
// const login = async(req, res) => {
//   try{
//     const {userid, pass} = req.body

//     if(!userid || !pass){
//       return res.status(400).json({ ok: false, msg: "Missing Data" })
//     }

//     const user = await VisitorModel.findOneById(userid)
//     if( !user ) {
//       return res.status(404).json({ ok: false, msg: "User does not exist"})
//     }

//     const isMatch = await bcryptjs.compare(pass, user.pass)

//     if (!isMatch){
//       return res.status(401).json({ ok: false, msg: "Password is incorrect"})
//     }

//     const token = jwt.sign(
//       { userid: user.userid },
//       process.env.JWT_SECRET,
//       { expiresIn:  "1h" }
//     )

//     return res.json({ok:true, token: token})

//   }catch (error) {
//     console.log(error)
//     return res.status(500).json({
//       ok: false,
//       msg: 'Error del servidor'
//     })
//   }
// }

// api/v1/users/visitors
const getVisitors = async (req, res) => {
  try {
    const visitors = await VisitorModel.getAllVisitors(); // Fetch visitors
    return res.status(200).json({ ok: true, msg: visitors }); // Send successful response
  } catch (error) {
    console.error('Error fetching visitors:', error); // Log error for debugging
    return res.status(500).json({
      ok: false,
      msg: 'Error occurred while fetching visitors', // Provide a more descriptive error message
    });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await VisitorModel.getAllCompanies(); // Fetch visitors
    return res.status(200).json({ ok: true, msg: companies }); // Send successful response
  } catch (error) {
    console.error('Error fetching companies:', error); // Log error for debugging
    return res.status(500).json({
      ok: false,
      msg: 'Error occurred while fetching companies', // Provide a more descriptive error message
    });
  }
};

export const VisitorController = {
  createVisitor,
  getVisitors,
  getCompanies
}
