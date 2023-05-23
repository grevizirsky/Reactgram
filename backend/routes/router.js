const express = require("express")
const router = express()

router.use("/api/users",  require("./UserRoute"))
router.use("/api/photos", require("./PhotoRoutes"))

//test route
router.get("/", (req, res) => {
    res.send("API WORKING")
})

module.exports = router