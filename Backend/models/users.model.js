import test from 'node:test'
import {db} from '../database/connection.database.js'

const createUser = async({userid, email, pass}) => {
  const query = {
    text: `
      insert into users (userid, email, pass)
      values ($1, $2, $3)
      returning userid
    `,
    values: [userid, email, pass]
  }

  const {rows} = await db.query(query)

  return rows[0]
}

const findOneByEmail = async(email) => {
  const query = {
    text: `
    select * from users
    where email = $1
    `,
    values: [email]
  }
  const {rows} = await db.query(query)
  return rows[0]
}

const findOneById = async(userid) => {
  const query = {
    text: `
    select * from users
    where userid = $1
    `,
    values: [userid]
  }
  const {rows} = await db.query(query)
  return rows[0]
}


export const UserModel = {
  createUser,
  findOneByEmail,
  findOneById
}
