const
    express = require("express"),
    app = express(),
    ejs = require("ejs"),
    ejsLint = require("ejs-lint"),
    shrinkRay = require("shrink-ray"),
    port = process.env.PORT || 5000

// App settings
app.set("view engine", "ejs")

app.use(express.static("src"))

ejsLint("home")

// ShrinkRay settings
app.use(shrinkRay({  
    cache: () => false,  
    cacheSize: false,
    filter: () => true,  
    brotli: { 
        quality: 4, // between 1 and 11  
    }, 
    gzip: { 
        level: 6 // between 1 and 9  
    } 
}))

// Routing
app.get("/",(req,res)=>{
    res.render("pages/home")
})

app.listen(port,()=>{
    console.log(
        `App listening to port: ${port}`
    )
})