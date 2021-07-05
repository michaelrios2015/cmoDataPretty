const db = require("./db");
const CMOBody = require("./models/cmos/CMOBody");
const CMOHeader = require("./models/cmos/CMOHeader");
const CPN = require("./models/CPN");
const Pool = require("./models/pools/Pool");
const PoolBodyUpdate = require("./models/pools/PoolBodyUpdate");
const Platinum = require("./models/platinums/Platinum");
const PlatinumBody = require("./models/platinums/PlatinumBody");


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
		PoolBodyUpdate,
		Platinum,
		PlatinumBody
	},
};