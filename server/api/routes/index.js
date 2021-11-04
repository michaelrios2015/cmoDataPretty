const router = require("express").Router();
module.exports = router;

router.use("/cmos", require("./cmos"));
router.use("/pools", require("./pools"));
router.use("/g1s", require("./g1s"));
router.use("/graphdata", require("./graphdata"));

router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});
