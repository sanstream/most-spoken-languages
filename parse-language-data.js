const fs = require('fs')
const CsvParser = require('csv-parse/lib/sync')

var output = {}
var countryLookup = {}
var langLookUp = {}

// extract country codes to the countryLookup:
const countryCodesCSV = fs.readFileSync('./research/country-codes.csv', 'utf8')
CsvParser(countryCodesCSV, {
  columns: true,
  skip_empty_lines: true,
}).forEach(items => {
  output[items['short2']] = {
    countryName: items.fullname,
    languages: {},
    populationCount: null,
  }
  countryLookup[items.fullname.toLowerCase().trim()] = {
    code: items.short2,
  }
})

// extract language data and codes to langLookup
const langCodesCSV = fs.readFileSync('./research/language-codes.csv', 'utf8')
const parsedCodes = CsvParser(langCodesCSV, {
  columns: true,
  skip_empty_lines: true,
})

parsedCodes.forEach(items => {
  const longLanguage = items['lang en'].toLowerCase()
  const langCode = items['short2']
  // example: English: 'en'
  langLookUp[longLanguage] = langCode
})

// Add population counts per country in output
const populations = fs.readFileSync('./research/refined-data/world-populations.csv', 'utf8').split('\n')
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

/**
 * Extract CIA language census data:
 */
const ciaLangCensus = fs.readFileSync('./research/refined-data/cia-language-census.txt', 'utf8').split('\n')
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
      output[countryCode].languages[langCode] = {}
      output[countryCode].languages[langCode]['CIA'] = { percentage, }
      if (percentage === null) {
        console.log(languageSet)
      }
    }
  }
})

/**
 * Extract United Nations language census data:
 */
const UNdata = fs.readFileSync('./research/refined-data/UNdata_Export_20180311_154013997.csv', 'utf8')

const UNrecords = CsvParser(UNdata, {
  columns: true,
  skip_empty_lines: true,
}).filter(rec => {
  return rec['Area'] === 'Total' && rec['Sex'] === 'Both Sexes'
})

UNrecords.forEach(record => {
  const countryCode = countryLookup[record['Country or Area'].toLowerCase()] ? countryLookup[record['Country or Area'].toLowerCase()].code : null
  const langCode = langLookUp[record['Language'].toLowerCase()] ? langLookUp[record['Language'].toLowerCase()] : null

  if (langCode && countryCode) {
    const count = parseInt(record['Value'], 10)
    if (!output[countryCode].languages[langCode]) {
      output[countryCode].languages[langCode] = {}
    }
    output[countryCode].languages[langCode]['UN'] = { count, }
  }
})

fs.writeFile('./research/refined-data/world-languages.json', JSON.stringify(output), 'utf8', () => {})
