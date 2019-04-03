const
    express = require("express"),
    app = express(),
    ejs = require("ejs"),
    ejsLint = require("ejs-lint"),
    compression = require("compression"),
    port = process.env.PORT || 5000
    
// Compression settings
app.use(compression())

// App settings
app.set("view engine", "ejs")

app.use(express.static("src"))

ejsLint("home")


// Routing
app.get("/",(req,res)=>{
    res.setHeader("Cache-Control","n-cache")
    res.render("pages/home")
    res.on("close",()=>{
        res.flush()
    })
})

app.listen(port,()=>{
    console.log(
        `App listening to port: ${port}`
    )
})