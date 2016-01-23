var _ = require('underscore');
var faker = require('faker');

exports.index = function (req, res) {
  var perPage = 20;
  var index = Number(req.query.page) || 1;
  var list = _.map(_.range(perPage), function (i) {
    faker.seed(perPage * (index - 1) + i + 1);
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      bio: faker.lorem.sentence(),
      image: faker.image.avatar(),
    };
  });
  res.json({res: {list: list, totalPages: 10}});
};
