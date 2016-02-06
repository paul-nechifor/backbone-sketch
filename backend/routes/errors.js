exports.debug = function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
};
