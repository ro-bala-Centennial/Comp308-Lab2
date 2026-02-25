const jwt = require("jsonwebtoken");

function signToken(student) {
  return jwt.sign(
    { id: student._id, studentNumber: student.studentNumber },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

module.exports = { signToken };