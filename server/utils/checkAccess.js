const checkAccess = (reqId, resourceId) => {
  console.log(reqId, resourceId);
  return reqId === resourceId;
};

module.exports = checkAccess;
