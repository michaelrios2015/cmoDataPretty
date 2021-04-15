const router = require("express").Router();
module.exports = router;

router.use("/cmos", require("./cmos"));

router.use("/currentcmos", require("./currentcmos"));

// router.use("/user_games", require("./user_games"));


router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});
