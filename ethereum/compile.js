const path = require('path');
const solc = require('solc');

//file system (fs) extra functionalities
const fs = require('fs-extra'); 

//path to build directory
const buildPath = path.resolve(__dirname, 'build');

//delete the build directory
fs.removeSync(buildPath); 

//path to Campaign.sol file
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

//read source code
const source = fs.readFileSync(campaignPath, 'utf8');


//compile the contracts
const output = solc.compile(source, 1).contracts;

//create build directory. ensureDirSync checks the build directory whether it's exists or not. If it doesn't exist, it will create a new build directory.
fs.ensureDirSync(buildPath); 

//tocheck the output
// console.log(output);

//produce JSON files by looping over each contract in output
for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}

