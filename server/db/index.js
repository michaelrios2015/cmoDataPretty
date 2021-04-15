const db = require("./db");
const CMOS = require("./models/CMOS");
const CPN = require("./models/CPN");
const CurrentCMOS = require("./models/CurrentCMOS");

module.exports = {
	// Include your models in this exports object as well!
	db,
	models: {
		CMOS,
		CPN,
		CurrentCMOS
	},
};