const fs = require('fs')

var output = {}
var countryLookup = {}
var langLookUp = {}

const countryCodesCSV = fs.readFileSync('../country-codes.csv', 'utf8')
countryCodesCSV.split('\n').forEach(el => {
  const items = el.split(',')
  output[items[1]] = {
    countryName: items[0],
  }
  countryLookup[items[0]] = {
    code: items[1],
  }
})

const langCodesCSV = fs.readFileSync('../language-codes.csv', 'utf8')
langCodesCSV.split('\n').forEach(el => {
  const items = el.split(',')
  langLookUp[items[4]] = {
    languageName: items[1],
  }
})

const populations = fs.readFileSync('world-populations.csv', 'utf8').split('\n')
populations.forEach(function (element) {
  let pairing = element.split(',')
  if (pairing.length === 2) {
    const country = pairing[0].replace(/^[\s]+/g, '').replace(/\s[.\d]+$/, '')
    const count = parseInt(pairing[1].replace(/[\s]+/g, '').match(/[\d]+$/), 10) * 1000
    if (countryLookup[country]) {
      output[countryLookup[country].code]['populationCount'] = count
    }
  }
})

console.log(output)

fs.writeFile('world-languages-2.json', JSON.stringify(output), 'utf8', () => {})

fs.readFile('cia-language-census.txt', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
  }
  let byLines = data.split('\n')
  // console.log(byLines[0])

  let objectified = {}

  byLines.filter(function (line) {
    return line[0] !== ' '
  }).forEach(element => {
    // console.log(element)
    objectified[element.replace(':', '')] = {}
  })

  let keyTracker = ''
  byLines.forEach(function (line) {
    if (line[0] !== ' ') {
      // keep track of which country's languages we're parsing:
      keyTracker = line.replace(':', '')
    } else {
      // remove leading whitespace for the languages:
      const languageSet = line.replace(/^[\s]+/g, '').replace(/[\s]+$/g, '')
      // split of the percentage value into a separate object per language:
      const language = languageSet.replace(/^[\s]+/g, '').replace(/\s[.\d]+$/, '')
      const percentage = languageSet.match(/[.\d]+$/)
      objectified[keyTracker] = {}
      objectified[keyTracker]['languages'] = {}
      if (percentage && percentage.length) {
        objectified[keyTracker]['languages'][language] = parseFloat(percentage[0])
      }
    }
  })
})
