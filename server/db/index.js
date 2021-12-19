const db = require("./db");
const CMOBody = require("./models/cmos/CMOBody");
const CMOHeader = require("./models/cmos/CMOHeader");
const CPN = require("./models/CPN");
const Ginnie = require("./models/pools/Ginnie");


CMOHeader.hasMany(CMOBody);
CMOBody.belongsTo(CMOHeader);



module.exports = {
	db,
	models: {
		CMOBody,
		CMOHeader,
		CPN,
		Ginnie
	},
};