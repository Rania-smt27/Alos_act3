const express = require('express')
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express()
const jobs = require('./Jobs.json')
const { check, validationResult } = require('express-validator');
const totoro =require('totoro-node')


// Middleware
app.use(express.json())
app.use(cors());
app.use(bodyparser.json());
const routes = require("./router/router");


 
const controller = require("./controller/controller");

app.use(bodyparser.json());
app.use("/api", routes);




// chargement de file user 


app.use('/',totoro.rain({
    // defition de version 
    v1:{
        // pramater optimale par defaut 
        active: true,
        deprecated: false,

        endpoints: [
            {
              route: "/jobs",
              method: "GET",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              { 
              
                return res.status(200).json(jobs)

                
              }

              
            },
            {
              route: "/jobs/:id",
              method: "GET",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              {
                
              
                const id = parseInt(req.params.id)
                const job = jobs.find(job => job.id === id)
                return res.status(200).json(job)
              }
        



            },{

              route: "/jobs/:id",
              method: "PUT",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              {
                const id = parseInt(req.params.id)
                let job = jobs.find(job => job.id === id)
                if(jobs.find(job => job.id === id)){
                  job.title =req.body.title,
                  job.type =req.body.type,
                  job.company =req.body.company,
                  job.email =req.body.email,
                  job.phone =req.body.phone,
                  job.address =req.body.address}
               return res.status(200).json(job)
                
              
              
              }
            

            },
          {
            route: "/jobs/:id",
            method: "DELETE",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              const id = parseInt(req.params.id)
              let job = jobs.find(job => job.id === id)
              jobs.splice(jobs.indexOf(job),1)
             return res.status(200).json(jobs)
            }

          },


        ]

             

    },
    

    v2:{
      active: true,
      deprecated: false,

      endpoints: [
          {
              route: "/jobs",
              method: "GET",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              {
               return res.status(200).json(jobs)
                
             }   
          },
          
          
          {
            route: "/jobs/:id",
            method: "GET",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              const id = parseInt(req.params.id)
              const job = jobs.find(job => job.id === id)
              return res.status(200).json(job)
            },
          
          },

          {
            route: "/jobs/:id",
            method: "DELETE",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              const id = parseInt(req.params.id)
              let job = jobs.find(job => job.id === id)
              jobs.splice(jobs.indexOf(job),1)
             return res.status(200).json(jobs)
            },
          
          },

          
          {
            route: "/jobs",
            method: "GET",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              return res.status(200).json(jobs)
            }

            
          },
          {
            route: "/jobs/:id",
            method: "GET",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              const id = parseInt(req.params.id)
              const job = jobs.find(job => job.id === id)
              return res.status(200).json(job)
            }
      



          },{

            route: "/jobs/:id",
            method: "PUT",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              const id = parseInt(req.params.id)
              let job = jobs.find(job => job.id === id)
              if(jobs.find(job => job.id === id)){
                job.title =req.body.title,
                job.type =req.body.type,
                job.company =req.body.company,
                job.email =req.body.email,
                job.phone =req.body.phone,
                job.address =req.body.address}
             return res.status(200).json(job)
              
            
            
            }
          

          },
        {
          route: "/jobs/:id",
          method: "DELETE",
          active: true, 
          deprecated: false, 
          implementation: function(apiVersion, req, res)
          {
            
          
            const id = parseInt(req.params.id)
            let job = jobs.find(job => job.id === id)
            jobs.splice(jobs.indexOf(job),1)
           return res.status(200).json(jobs)
          }

        },{



          route: "/jobs",
          method: "POST",
          active: true, 
          deprecated: false, 
          implementation:([
            check('type').isIn(['Full-stack', 'Full-time', 'Part-time', 'Freelancer', 'Remote']),
            check('company').isLength({ max: 50 }),
            check('email').isLength({ max: 50 }),
            check('phone').isLength({ max: 50 }),
            check('title').isLength({ max: 50 }),
            check('address').isIn(['Oran','Mostaganem','Alger','Masacara','Telemcen','Setif']),
          ], (apiVersion,req, res) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() })
             
            }
          
            else {
              jobs.push(req.body)
              return res.status(200).json(jobs)
              
            }
          
            
           
          })},


        ]


    }

}))




app.use((req, res, next)=> {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});


app.use(function(error, req, res, next) {
  res.status(error.status || 500);
  res.json({error:{
    message:error.message
  }
})
});






const PORT = process.env.PORT || 8080;


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

