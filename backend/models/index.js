import sequelize from '../config/db.js';

import AdminModel from './admin.model.js';
import DarshanModel from './darshan.model.js';
import EventModel from './event.model.js';
import EventTypeModel from './eventtype.model.js';
import {ArticleModel, VideoModel } from './resources.model.js';

const Admin = AdminModel(sequelize);
const Darshan = DarshanModel(sequelize);
const Event = EventModel(sequelize);
const EventType = EventTypeModel(sequelize,);
const Article = ArticleModel(sequelize);
const Video = VideoModel(sequelize);


await sequelize.sync({ alter: true });

export {
  sequelize,
  Admin,
  Darshan,
  Event,
  EventType,
  Article,
  Video 
};
