// function to generate markdown for README
function generateMarkdown(data) {
  return `

  # ${data.title}
  
  ${data.getLicense}
  
  # Description
  ${data.description}
  
  # Table of Contents 
  * [Installation](#-Installation)
  * [Usage](#-Usage)
  * [License](#-License)
  * [Contributing](#-Contributing)
  * [Tests](#-Tests)
  * [Contact](#-Contact-Information)
      
  # Installation
  ${data.installation}
  
  # Usage
  ${data.usage}
  
  # License 
  ${data.license}
  
  # Contributing 
  ${data.contributing}
  
  # Tests
  ${data.tests}
  
  # Contact Information 
  * GitHub Username: ${data.github}
  * Contact Email: ${data.email}

`;
}

// Function to render badge
function renderBadge(license) {
  if (license !== "None") {
    return `![GitHub license](https://img.shields.io/badge/license-${license}-yellowgreen.svg)`
  }
  return ''
}

// Function to render link
function renderLink(license) {
  if (license !== "None") {
    return (
      `\n* [License](#license)\n`
    )
  }
  return ''
}


// Function to render section
function renderSection(license) {
  if (license !== "None") {
    return (
      `## License 📛

      Copyright © ${license}. All rights reserved. 
      
      Licensed under the ${license} license.`

    )
  }
  return ''
}

module.exports = generateMarkdown;
