import sequelize from '../config/db.js';

import AdminModel from './admin.model.js';
import DarshanModel from './darshan.model.js';
import EventModel from './event.model.js';
import EventTypeModel from './eventtype.model.js';

const Admin = AdminModel(sequelize);
const Darshan = DarshanModel(sequelize);
const Event = EventModel(sequelize);
const EventType = EventTypeModel(sequelize,);
await sequelize.sync({ alter: true });

export {
  sequelize,
  Admin,
  Darshan,
  Event,
  EventType 
};
