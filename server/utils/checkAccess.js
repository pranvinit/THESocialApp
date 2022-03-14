const checkAccess = (reqId, resourceId) => {
  return reqId === resourceId;
};

module.exports = checkAccess;
