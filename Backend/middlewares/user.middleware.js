export const verifyUserType = (req, res, user) => {

  switch (user.type){
    case "admin":
      break;
    case "general":
      return res.status(401).json({ error: "Token not provided"})
    case "host":
      return res.status(401).json({ error: "Token not provided"})

  }

  try {
    const {userid} = jwt.verify(token, process.env.JWT_SECRET)
    req.userid = userid
    next()
  } catch (error) {
    return res.status(400).json({error: "Invalid Token"})
  }
}
