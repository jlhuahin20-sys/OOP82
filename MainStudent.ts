import { StudentDAO } from "./studentDAO";

const userDAO = new StudentDAO();

userDAO.insert("684245098", "RDDD", 2.22);
userDAO.insert("684245129", "AAAA", 2.95);
userDAO.insert("684229156", "Mana dd", 2.09);
userDAO.insert("684229153", "Masd dsd", 3.9);
userDAO.insert("684229152", "Feee", 2.9);


const users = userDAO.findAll();

users.forEach(u => {
    console.log(`${u.getId()} ${u.getFullName()} ${u.getGpa()}`);
});