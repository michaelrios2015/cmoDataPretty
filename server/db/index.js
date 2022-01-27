const db = require("./db");
const CPN = require("./models/CPN");
const Ginnie = require("./models/pools/Ginnie");


module.exports = {
	db,
	models: {
		CPN,
		Ginnie
	},
};