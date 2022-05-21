
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs')

// signup
module.exports.signup = async (req, res) => {
console.log(req.body, "signup##");
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  




 fs.readFile('user.txt', 'utf-8', async(err, data) => {

  const lines = data.split(/\r?\n/);
  let mail;
  lines.forEach(line => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
  }
      if (line==email)
      {return mail=true;}
      
  
      
       
      
      
  });




  if (mail==true)
      {
        return res.send({
          status: false,
          msg: "email is already exits",
        });
      }
  
      else
      {
      
        fs.writeFile('user.txt',name+'\n', { flag: 'a+' }, err => {})
        fs.writeFile('user.txt',email+'\n', { flag: 'a+' }, err => {})
        fs.writeFile('user.txt',password+'\n', { flag: 'a+' }, err => {})
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;}
      
       return res.send({
          status: true,
          msg: "user register successful",
        });
      
      }
      
      
    
    
   } )








  
}
// login

module.exports.login = (req, res) => {
  console.log(req.body, "login");
  let email = req.body.email;
  let password = req.body.password;

  // checkemailid



  fs.readFile('user.txt', 'utf-8', (err, data) => {

    const lines = data.split(/\r?\n/);
    let mailll
    let namee
    let paswordd
    let maill;
    lines.forEach(line => {
      console.log(line)
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
       
    if (line==email)
    {maill=true;
    
      let j=0
      let k=0
      let i=0
      
      k=k + lines.indexOf(line) -1
      namee=lines[k];
      i=i + lines.indexOf(line) +1
      paswordd=lines[i]
     j=j+lines.indexOf(line) 
     mailll=lines[j]
     console.log(lines[i])  
    }
    

    
      
      
   })



   if (maill==true)
   {
    // let chkpwd =  bcrypt.compare(password, paswordd);
     if (password === paswordd) {
       let user = {
         name:namee,
         email: mailll
       };
         
         
       
       const token = jwt.sign({user}, "privatkey");
       console.log(token, "token##");
      return res.send({
         status: true,
         token: token,
         user: user,
         msg: "user login successful",
       });
     }
     else {
      return res.send({
         status: false,
         msg: "invalid user",
       });
     }
   }
   else {
    return res.send({
       status: false,
       msg: "invalid email id",
     });
   }
 



  })
}


module.exports.home = (req, res) => {
  let chkToken = verifyToken(req.token);//verify token with home route because it does'nt work with us  in versioning
  if (chkToken.status == true) {
  return  res.send("api working here ...");
  }else{
    res.send({
      status: false,
      msg: "token invalid",
    });
  }
 };


//verifytokens

function verifyToken(token) {
  return jwt.verify(token, "privatkey", (err, result) => {
    if (err) {
      console.log(err)
      let a = { status: false };
      console.log("check false")
      return a;
    } else {
      let b = { status: true };
      console.log("check true")
      return b;
    }
  });
}
