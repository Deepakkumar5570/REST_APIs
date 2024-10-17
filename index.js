const express= require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4} =require('uuid');
const methodOverride =require("method-override")


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

//to store data like a database

let posts =[
    {
        id: uuidv4(),
        username : "Deepakkumar",
        content : " i love coding",
    },
    {
        id: uuidv4(),
        username : "Varsha",
        content : " i love medical",
    },
    {
        id:uuidv4(),
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
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res) =>{
    let {id} =req.params;
    // console.log(id);
    let post =posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs",{post});

});

// PATCH 

app.patch("/posts/:id",(req,res) => {
    let {id} =req.params;
    let newContent = req.body.content;

    // post ke data ko update
    let post =posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");

});

app.get("/posts/:id/edit",(req,res) => {
    let {id} =req.params;
    let post =posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});

});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");  // Redirect back to the main post listing
});





app.listen(port, () =>{
    console.log("listening to port: 8080");
});
