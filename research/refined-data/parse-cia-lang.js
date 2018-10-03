const fs = require('fs')

var output = {}
var countryLookup = {}
var langLookUp = {}

const countryCodesCSV = fs.readFileSync('../country-codes.csv', 'utf8')
countryCodesCSV.split('\n').forEach(el => {
  const items = el.split(',')
  output[items[1]] = {
    countryName: items[0],
    languages: {},
    populationCount: null,
  }
  countryLookup[items[0].toLowerCase().trim()] = {
    code: items[1],
  }
})

const langCodesCSV = fs.readFileSync('../language-codes.csv', 'utf8')
langCodesCSV.split('\n').forEach(el => {
  const items = el.split(',')
  if (items.length) {
    if (items[1]) {
      langLookUp[items[1].toLowerCase()] = items[3]
    }
  }
})

const populations = fs.readFileSync('world-populations.csv', 'utf8').split('\n')
populations.forEach(function (element) {
  let pairing = element.split(',')
  const country = pairing[0].trim().toLowerCase()
  let count = null
  if (pairing.length === 2) {
    count = parseInt(pairing[1].replace(/[\s]+/g, '').match(/[\d]+$/), 10) * 1000
  }
  if (countryLookup[country]) {
    output[countryLookup[country].code]['populationCount'] = count
  }
})

const ciaLangCensus = fs.readFileSync('cia-language-census.txt', 'utf8').split('\n')
const ciaLangCensusLookup = {}

ciaLangCensus.filter(function (line) {
  return line[0] !== ' '
}).forEach(element => {
  // console.log(element)
  ciaLangCensusLookup[element.replace(':', '')] = {}
})

let countryName = ''
let countryCode = null
ciaLangCensus.forEach(function (line) {
  if (line[0] !== ' ') {
    // keep track of which country's languages we're parsing:
    countryName = line.replace(':', '').trim().toLowerCase()
    countryCode = countryLookup[countryName] ? countryLookup[countryName].code : null
  } else if (countryCode) {
    // remove leading whitespace for the languages:
    const languageSet = line.trim().replace(/[\s]+/g, ':').split(':')
    // split of the percentage value into a separate object per language:
    const language = languageSet[0]
    const langCode = langLookUp[language.toLowerCase()]
    if (langCode) {
      const percentage = (languageSet[1]) ? parseFloat(languageSet[1]) : null
      output[countryCode].languages[langCode] = percentage
    }
  }
})

// console.log(output)
// console.log(langLookUp)
fs.writeFile('world-languages-2.json', JSON.stringify(output), 'utf8', () => {})
