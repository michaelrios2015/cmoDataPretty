const db = require("./db");
const CMOBody = require("./models/CMOBody");
const CMOHeader = require("./models/CMOHeader");
const CPN = require("./models/CPN");


CMOHeader.hasMany(CMOBody);
CMOBody.belongsTo(CMOHeader);



module.exports = {
	db,
	models: {
		CMOBody,
		CMOHeader,
		CPN
	},
};