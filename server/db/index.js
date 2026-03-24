const db = require("./db");
const CPN = require("./models/CPN");
const Ginnie = require("./models/pools/Ginnie");
const Visitor = require("./models/Visitor");


module.exports = {
	db,
	models: {
		CPN,
		Ginnie,
		Visitor
	},
};