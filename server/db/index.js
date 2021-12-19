const db = require("./db");
const CMOBody = require("./models/cmos/CMOBody");
const CMOHeader = require("./models/cmos/CMOHeader");
const CPN = require("./models/CPN");
const Pool = require("./models/pools/Pool");
const G1 = require("./models/pools/G1");
const Ginnie = require("./models/pools/Ginnie");


CMOHeader.hasMany(CMOBody);
CMOBody.belongsTo(CMOHeader);



// PoolBody.hasOne(PoolPrediction);
// PoolPrediction.belongsTo(PoolBody);


module.exports = {
	db,
	models: {
		CMOBody,
		CMOHeader,
		CPN,
		Pool,
		G1,
		Ginnie
	},
};