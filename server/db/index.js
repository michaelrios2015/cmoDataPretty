const db = require("./db");
const CMOBody = require("./models/CMOBody");
const CMOHeader = require("./models/CMOHeader");
const CPN = require("./models/CPN");
const CurrentCMOS = require("./models/CurrentCMOS");


CMOHeader.hasMany(CMOBody);
CMOBody.belongsTo(CMOHeader);



module.exports = {
	// Include your models in this exports object as well!
	db,
	models: {
		CMOBody,
		CMOHeader,
		CPN,
		CurrentCMOS
	},
};