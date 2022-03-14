const {User} = require('../models');
const {Family} = require('../models');
const {Instrument} = require('../models');
const sequelize = require('../config/connection');
const seedFamily = require('./FamilyData');
const seedInstrumnets = require('./InstrumentData');
const seedUsers = require('./UserData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
  await User.bulkCreate(seedUsers);

  await Family.bulkCreate(seedFamily);

  await Instrument.bulkCreate(seedInstrumnets);

  

  process.exit(0);
};

seedAll();
