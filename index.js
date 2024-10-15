const express= require("express");
const app = express();
const port = 8080;
const path = require("path");


app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

//to store data like a database

let posts =[
    {
        id: "1a",
        username : "Deepakkumar",
        content : " i love coding",
    },
    {
        id: "2b",
        username : "Varsha",
        content : " i love medical",
    },
    {
        id:"3c",
        username : "Anjali",
        content : " i love my family",
    },
];

app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});

app.post("/posts",(req,res) =>{
    // console.log(req.body);

    // to add data into array
    let {username,content} =req.body;
    posts.push({username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res) =>{
    let {id} =req.params;
    // console.log(id);
    let post =posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs",{post});

});


app.listen(port, () =>{
    console.log("listening to port: 8080");
});
