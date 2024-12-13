import {db} from '../database/connection.database.js'

const createVisitor = async({fname, lname, email, phone, company}) => {
  const query = {
    text: `
      insert into visitors (firstName, lastName, email, phone, companyID)
      values ($1, $2, $3, $4, $5)
      returning email
    `,
    values: [fname, lname, email, phone, company]
  }

  const {rows} = await db.query(query)
  return rows[0]
}

const getAllVisitors = async() => {
  const query = {
    text: `select * from visitors`
  }
  const {rows} = await db.query(query)
  return rows
}

const findVisitorByEmail = async(email) => {
  const query = {
    text: `
    select * from visitors
    where email = $1
    `,
    values: [email]
  }
  const {rows} = await db.query(query)
  return rows[0]
}

const findVisitorsByCompany = async(company) => {
  const query = {
    text: `
    select v.firstname, v.lastname, v.email, v.phone, c.company
    from visitors v
    join companies c on v.companyid = c.id
    where c.id = $1; }`,
    values: [company]
  }
  const {rows} = await db.query(query)
  return rows
}


export const VisitorModel = {
  createVisitor,
  findVisitorByEmail,
  getAllVisitors,
  findVisitorsByCompany
}
