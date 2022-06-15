import bcrypt from 'bcryptjs';


const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('secret',10),
    isAdmin: true,
  },
  {
    name: 'Jany Ton',
    email: 'tanyton@example.com',
    password: bcrypt.hashSync('secret',10),
    isAdmin: false

  },
  {
    name: 'Perry Jada',
    email: 'perryjada@example.com',
    password: bcrypt.hashSync('secret',10),
    isAdmin: false

  },
  
]
export default users
