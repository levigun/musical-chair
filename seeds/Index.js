const sequelize = require('../config/connection');
const seedFamily = require('./FamilyData');
const seedInstrumnets = require('./InstrumentData');
const seedUsers = require('./UserData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedFamily();

  await seedInstrumnets();

  await seedUsers();

  process.exit(0);
};

seedAll();
