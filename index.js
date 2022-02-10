var express = require('express'),
    request = require('request');
    rp      = require('request-promise');
    app     = express();


    const port = process.env.PORT || 3000;

app.set('view engine', 'ejs')  
app.use(express.static('public'));  

// Home Page
// app.get('/',(req,res)=>{
//     res.render('searchPage');
// });  

app.get('/',(req,res)=>{
    res.render('user');
});  

app.post("/user", async(req, res) => {
   
    try{

        const adminname = req.body.user;
        const adminpassword = req.body.pass;
        
        const name = await Admins.findOne({name:adminname});
        if(name.password == adminpassword){
            res.status(200).render("addstudent",{EP:''});
        }else{
            res.status(400),send("invalid login details1");
        }
      }catch(err){
        res.status(400).send(`invalid login details`);
        }
});

//To Create API Through Postman
app.get("/addadmin", async(req, res) =>{
    res.render("addadmin",{success:''});
});

app.post("/addadmin", async(req, res) => {
   
    //To create API of Admins
        const Admin = new Admins(req.body);
        Admin.save().then(() => {
            res.status(201).render("adminlogin");
        }).catch((e) => {
            res.status(400).send(e);
        });
});






//Search results page
app.get('/results', (req,res)=>{
    var searchElement = 'https://www.omdbapi.com/?s='+req.query.movie+'&apikey=thewdb';
    var movieDetails = [];
    var results;
    rp(searchElement)
    .then((body)=>{
        results = JSON.parse(body);  
        if(results['Response']=='True'){
            for(let i=0; i< results['Search'].length; i++){
                rp('https://www.omdbapi.com/?i='+results['Search'][i]['imdbID']+'&apikey=thewdb')
                .then(data => {
                    movieDetails.push(JSON.parse(data));
                    if(movieDetails.length === results['Search'].length){
                        res.render('movieResults',{results: results, keyword: req.query.movie, movieDetails: movieDetails});
                    }
                }) 
            }
        }
        else{
            res.render('movieResults',{results: results, keyword: req.query.movie, movieDetails: movieDetails});
        }        
    })
    .catch((err)=>{
        try{
            var displayError = JSON.parse(err['error']);
            console.log(displayError['Error']);
            res.render('movieResults',{results: {'Response': 'False', 'Error': displayError['Error']}, keyword: req.query.movie});
        }
        catch{
            console.log('Something went wrong');
        }
    });

});

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});

