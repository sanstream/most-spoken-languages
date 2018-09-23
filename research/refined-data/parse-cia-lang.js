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
  if (pairing.length === 2) {
    const country = pairing[0].trim().toLowerCase()
    const count = parseInt(pairing[1].replace(/[\s]+/g, '').match(/[\d]+$/), 10) * 1000
    if (countryLookup[country]) {
      output[countryLookup[country].code]['populationCount'] = count
    }
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
    const languageSet = line.replace(/^[\s]+/g, '').replace(/[\s]+$/g, '')
    // split of the percentage value into a separate object per language:
    const language = languageSet.replace(/^[\s]+/g, '').replace(/\s[.\d]+$/, '')
    const langCode = langLookUp[language.toLowerCase()]
    const percentage = languageSet.match(/[.\d]+$/)
    if (langCode && percentage && percentage.length) {
      output[countryCode].languages[langCode] = parseFloat(percentage[0])
    }
  }
})

// console.log(output)
// console.log(langLookUp)
fs.writeFile('world-languages-2.json', JSON.stringify(output), 'utf8', () => {})
