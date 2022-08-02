
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const generateMarkdown = require("./utils/generateMarkdown");

function validateInput(value) {
    if (value != "") {
        return true;
    } else {
        return "Please input an an answer.";
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
            "MIT",
            "APACHE2.0",
            "Boost1.0",
            "GPL3.0",
            "BSD2",
            "BSD3",
            "None"
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
        name: "test",
        message: "Enter any test commands.",
        default: "npm run test",
        validate: validateInput,
    },
    {
        type: "input",
        name: "contributors",
        message: "Enter any contributors.",
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
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// function to initialize app
function init() {
    inquirer.prompt(questions)
        .then((inquirerAnswers) => { 
            console.log("Generating your README...");
            writeToFile("./output/README.md", generateMarkdown({ ...inquirerAnswers }));
        })
}

// Function call to initialize app
init();
