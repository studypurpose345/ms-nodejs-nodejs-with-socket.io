const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if(!authHeader) {
    const error = new Error('Authorization Failed, Try Re-Logging');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjMwNzc0Njc1LTZkYTQtNDJiMC1iZjliLTZhY2M0NjUwZDEyMiIsImlhdCI6MTU4NTY3MDk3MiwiZXhwIjoxNTg1Njc0NTcyfQ.7ZZCiNmEWQ53kgB0aOa7lwBTeFnzE6j01PsKWlux2Ws');
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if(!decodedToken) {
    const error = new Error('Authorization Failed, Try Re-Logging');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};