const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/final-project');
const User = require('../api/user/user.model.js');

const users = [
  {
    username: 'Carlos',
    email: 'Carlos@Carlos.com',
    password: 'password',
    role: 'Collaborator',
    pic: 'CarlosPic',
  },
  {
    username: 'Pedro',
    email: 'Pedro@Pedro.com',
    password: 'password',
    role: 'Leader',
    pic: 'PedroPic',
  },
  {
    username: 'Juan',
    email: 'Juan@Juan.com',
    password: 'password',
    role: 'Provider',
    pic: 'JuanPic',
  },
  {
    username: 'Manuel',
    email: 'Manuel@Manuel.com',
    password: 'password',
    role: 'Collaborator',
    pic: 'ManuelPic',
  },
];

User.create(users, (err, docs) => {
  if (err) { throw err; }
  docs.forEach( (user) => {
    console.log(user.username);
  });
  mongoose.connection.close();
});
