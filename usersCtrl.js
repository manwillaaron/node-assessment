const userData = require("./userData");
let numId= 101

module.exports = {
  getUser(req, res) {
    let { email, age, favorites } = req.query;
    let filteredUsers;
    if (email) {
      filteredUsers = userData.filter(obj => {
        if (obj.email == email) {
          return obj;
        }
      });
    } else if (age) {
      filteredUsers = userData.filter(obj => {
        if (obj.age < age) {
          return obj;
        }
      });
    } else if (favorites) {
      filteredUsers = userData.filter(obj => {
        for (let i = 0; i < obj.favorites.length; i++) {
          if (obj.favorites[i] == favorites) {
            return obj;
          }
        }
        return filteredUsers;
      });
    } else {
      res.status(200).send(userData);
    }
    res.status(200).send(filteredUsers);
  },
  getUserWithId(req, res) {
    let { userId } = req.params;
    let foundUser = userData.filter(obj => {
      if (obj.id === +userId) {
        return { ...obj };
      }
    });
    !foundUser[0] ? res.sendStatus(404) : res.status(200).send(foundUser[0]);
  },
  getAdminUsers(req, res) {
    let allAdmin = userData.filter(obj => obj.type === "admin");
    res.status(200).send(allAdmin);
  },
  getNonAdmin(req, res) {
    let allNonAdmin = userData.filter(obj => obj.type !== "admin");
    res.status(200).send(allNonAdmin);
  },
  getUserByType(req, res) {
    let { userType } = req.params;
    let usersWithSameType = userData.filter(obj => obj.type === userType);
    res.status(200).send(usersWithSameType);
  },
  updateInfo(req,res){
      console.log('req.body',req.body);
      console.log('req.params', req.params);
      let {userId} =  req.params
      let index = userData.findIndex(obj => obj.id === +userId)
      let currentUser = userData[index]
      console.log({currentUser});
      let {
          id,
          first_name,
          last_name,
          email,
          gender,
          language,
          age,
          city,
          state,
          type,
          favorites
      } = req.body
let numId = +userId
let numage = +age
      console.log({numId});
  
    userData[index] = 
    {
      "id": numId,
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "gender": gender,
      "language": language,
      "age": numage,
      "city": city,
      "state": state,
      "type": type,
      "favorites": favorites
    }
    // console.log({updatedUser});
      // userData.splice(index,1,updatedUser)
      res.status(200).send(userData)

  },
  addUser(req, res) {
    const {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body;
    userData.push({
        id: numId,
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        language: language,
        age: age,
        city: city,
        state: state,
        type: type,
        favorites: favorites,
    });
    numId++;
    res.status(200).send(userData);
},

  deleteUser(req, res) {
    let { userId } = req.params;
    let deletedUser = userData.filter(obj => obj.id === +userId);
    let index = userData.findIndex(obj => obj.id === +userId)
    !deletedUser
      ? res.sendStatus(404)
      : userData.splice(index,1)
    res.status(200).send(userData);
  }
};
