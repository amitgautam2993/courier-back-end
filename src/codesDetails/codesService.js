const fs = require('fs').promises;
const Code = require('./codeModel');

const readCodesFromJson = async () => {
  const data = await fs.readFile('./src/codesDetails/codes.json', 'utf8');
  return JSON.parse(data).data;
};

exports.searchCodes = async (query) => {
  const allCodes = await readCodesFromJson();
  const filteredCodes = allCodes.filter(code => 
    code.name.toLowerCase().includes(query.toLowerCase()) || 
    code.code.toLowerCase().includes(query.toLowerCase()) ||
    code.state.toLowerCase().includes(query.toLowerCase())
  );
  return filteredCodes.slice(0, 20);
};

exports.checkAbbreviation = async (query) => {

  if (!query) {
    return { error: 'Abbreviation is missing or empty' };
  }

  const allCodes = await readCodesFromJson();


  const code = allCodes.find(code => code.code === query.toUpperCase());


  if (code) {
    return true;
  } else {
    // Handle the case where the code is not found
    return false;
  }
}


exports.addCode = async (codeToAdd) => {
  const newCode = new Code(codeToAdd);
  return await newCode.save();
};
