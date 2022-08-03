const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

function validateInput(value) {
  if (value != "") {
    return true;
  } else {
    return "Please input an an answer.";
  }
}

// function to return the license badge
function getLicense(value) {
  if (value === "GNU AGPLv3") {
    return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
  } else if (value === "GNU GPLv3") {
    return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
  } else if (value === "GNU LGPLv3") {
    return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
  } else if (value === "Apache 2.0") {
    return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
  } else if (value === "Boost Software 1.0") {
    return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
  } else if (value === "MIT") {
    return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  } else {
    return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
  }
}

// question array
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the name of your project?",
    validate: validateInput,
  },
  {
    type: "input",
    name: "description",
    message: "Enter a description of your project.",
    validate: validateInput,
  },
  {
    type: "input",
    name: "usage",
    message: "Describe how to use your project.",
    validate: validateInput,
  },
  {
    type: "list",
    name: "license",
    message: "What license does your project use?",
    choices: [
      "GNU AGPLv3",
      "GNU GPLv3",
      "GNU LGPLv3",
      "Apache 2.0",
      "Boost Software 1.0",
      "MIT",
      "Mozilla",
    ],
    validate: validateInput,
  },
  {
    type: "input",
    name: "installation",
    message: "Enter any installation instructions.",
    default: "npm i",
    validate: validateInput,
  },
  {
    type: "input",
    name: "tests",
    message: "Enter any test commands.",
    default: "npm run test",
    validate: validateInput,
  },
  {
    type: "input",
    name: "contributing",
    message: "How can others contribute to your project?",
    validate: validateInput,
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub username.",
    validate: validateInput,
  },
  {
    type: "input",
    name: "email",
    message: "Enter you email.",
    validate: function (value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      } else {
        return "Not a valid email address. Please enter a valid email address.";
      }
    },
  },
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

// just for fun
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

// function to initialize app
function init() {
  inquirer.prompt(questions).then((data) => {
      console.log("Generating your README...");
      sleep(1000);
    data.getLicense = getLicense(data.license);
      console.log("Processing...");
      sleep(1000);
      writeToFile("./output/README.md", data);
      console.log("README written to 'output' folder");
  });
}

// Function call to initialize app
init();
