const router = require("express").Router();
module.exports = router;


router.use("/cmostwo", require("./cmostwo"));
router.use("/ginnies", require("./ginnies"));
router.use("/graphdata", require("./graphdata"));

router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});
