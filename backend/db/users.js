var records = [
    {
        id: 1,
        username: 'jack',
        password: 'secret',
        displayName: 'Jack',
        email: 'jack@example.com',
    },
];

exports.findById = function (id, cb) {
    process.nextTick(function () {
        var idx = id - 1;
        if (records[idx]) {
            return cb(null, records[idx]);
        }
        cb(new Error('User ' + id + ' does not exist'));
    });
};

exports.findByUsername = function (username, cb) {
    process.nextTick(function () {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.username === username) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    });
};
