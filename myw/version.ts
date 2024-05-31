// read the release version number from the main package.json
const { version } = require('./package.json');

export const versionNumber = process.env.DEPLOY_VERSION || version;

export const getVersion = function getVersion(req, res) {
	res.status(200).send({ version: module.exports.number || null });
};
