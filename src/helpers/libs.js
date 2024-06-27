const ReRegExp = require('reregexp').default;
const helpers = {};
//
helpers.randonName = () => {
    const reg = new ReRegExp(/^[\w]{6}$/i);
    const name = reg.build()
    return name;
};

module.exports = helpers;


