import {db} from '../database/connection.database.js'

const createVisitor = async ({ fname, lname, email, phone, company }) => {
  console.log("Starting createVisitor function...");
  console.log("Received data:", { fname, lname, email, phone, company });

  // Connect to the database and start a transaction
  const client = await db.connect();
  try {
    console.log("Database connection established. Beginning transaction...");
    await client.query('BEGIN');

    // Step 1: Check if the company exists
    const companyQuery = {
      text: `SELECT id FROM companies WHERE company = $1`,
      values: [company],
    };
    console.log("Checking if company exists with query:", companyQuery);

    const companyResult = await client.query(companyQuery);
    console.log("Company query result:", companyResult.rows);

    let companyId;
    if (companyResult.rows.length > 0) {
      // Step 2: Use the existing company ID
      companyId = companyResult.rows[0].id;
      console.log("Company exists. Using company ID:", companyId);
    } else {
      // Step 3: Insert the company if it doesn't exist
      const insertCompanyQuery = {
        text: `INSERT INTO companies (company) VALUES ($1) RETURNING id`,
        values: [company],
      };
      console.log("Inserting new company with query:", insertCompanyQuery);

      const insertCompanyResult = await client.query(insertCompanyQuery);
      companyId = insertCompanyResult.rows[0].id;
      console.log("New company inserted. Company ID:", companyId);
    }

    // Step 4: Insert the visitor
    const visitorQuery = {
      text: `
        INSERT INTO visitors (firstName, lastName, email, phone, companyid)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING email
      `,
      values: [fname, lname, email, phone, companyId],
    };
    console.log("Inserting visitor with query:", visitorQuery);

    const visitorResult = await client.query(visitorQuery);
    console.log("Visitor insertion successful. Result:", visitorResult.rows);

    // Commit the transaction
    await client.query('COMMIT');
    console.log("Transaction committed successfully.");

    return visitorResult.rows[0];
  } catch (error) {
    // Rollback transaction in case of an error
    console.error("Error occurred. Rolling back transaction...");
    await client.query('ROLLBACK');
    console.error("Error details:", error);
    throw error;
  } finally {
    client.release();
    console.log("Database connection released.");
  }
};

const getAllVisitors = async () => {
  try {
    const query = {
      text: `
      SELECT v.*, c.company FROM visitors v
      left Join companies c
      on v.companyid = c.id`,
    };
    const { rows } = await db.query(query);

    return rows || [];
  } catch (error) {
    console.error('Error fetching visitors from the database:', error);
    throw new Error('Database query failed');
  }
};

const getAllCompanies = async () => {
  try {
    const query = {
      text: `SELECT * FROM companies`,
    };
    const { rows } = await db.query(query);

    // Extract the "name" column from each row
    return rows.map(row => row.company) || [];
  } catch (error) {
    console.error('Error fetching companies from the database:', error);
    throw new Error('Database query failed');
  }
};

const AddCompany = async(company) => {
  try {
    const query = {
      text: `INSERT INTO companies (company) Values ($1)`,
      values: [company]
    };
    const { rows } = await db.query(query);
    return rows[0]
  } catch (error) {
    console.error('Error adding company to the database:', error);
    throw new Error('Database query failed');
  }
}

const FindCompany = async(company) => {
  const query = {
    text: `
    select * from companies
    where company = $1
    `,
    values: [company]
  }
  const {rows} = await db.query(query)
  return rows[0]
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
  findVisitorsByCompany,
  getAllCompanies,
  AddCompany,
  FindCompany
}


