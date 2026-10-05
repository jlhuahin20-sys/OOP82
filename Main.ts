import { UserDAO } from "./UserDAO";

const userDAO = new UserDAO();

userDAO.insert("AAA", "pdasdasdasddhu@gmail.com");
userDAO.insert("ccc", "HsadasdSpdhu@gmail.com");
userDAO.insert("มDdd", "asdsdu@gmail.com");

const users = userDAO.findAll();

users.forEach(u => {
    console.log(u.getInfo());
});