const codesService = require('./codesService');

exports.searchCodes = async (req, res) => {
  const { query } = req.query;
  const codes = await codesService.searchCodes(query);
  res.json(codes);
};

exports.checkAbbreviation = async (req, res) => {
  const {query} = req.query;
  //console.log('Abbreviation:', abbreviation); // Check if the abbreviation is correctly extracted
  const code = await codesService.checkAbbreviation(query);
  //console.log('Code:', code); // Check the value of the code object
  res.json({ 'codeexists': code, 'error': '',data: null });
}

exports.addCode = async (req, res) => {
  const codeToAdd = req.body;
  const addedCode = await codesService.addCode(codeToAdd);
  res.json(addedCode);
};

