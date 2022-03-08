const User = require('./user');
const Family = require('./family');
const Instrument = require('./instrument');

// a user can have many instruments
User.hasMany(Instrument, {
    foreignKey: "user_id",
});
// an instrument belongs to family
Instrument.belongsTo(Family, {
    foreignKey: "family_id",
});
// an insturment belongs to a user
Instrument.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = { User, Family, Instrument };