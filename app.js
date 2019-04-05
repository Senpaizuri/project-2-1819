const
    express = require("express"),
    app = express(),
    ejs = require("ejs"),
    compression = require("compression"),
    port = process.env.PORT || 5000

// HTTP2 Not (yet) natively supported with express :(
// Compression settings
app.use(compression())

// App settings
app.set("view engine", "ejs")

app.use(express.static("src"))

// Routing
app.get("/",(req,res)=>{
    res.setHeader("Cache-Control","n-cache")
    res.status(200).render("pages/home")
    res.on("close",()=>{
        res.flush()
    })
})

app.get("/api/sitecore/MyDealer/getMyDealer/",(req,res)=>{
    res.send(`{
        "success": false,
        "key": "pon-user-my-dealer",
        "data": null
      }`)
})

app.listen(port,()=>{
    console.log(
        `App listening to port: ${port}`
    )
})