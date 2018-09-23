const fs = require('fs')

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

  fs.readFile('world-populations.csv', 'utf8', function (err, data) {
    if (err) {
      console.log(err)
    }
    let byLines = data.split('\n')
    byLines.forEach(function (element) {
      let pairing = element.split(',')
      if (pairing.length === 2) {
        const country = pairing[0].replace(/^[\s]+/g, '').replace(/\s[.\d]+$/, '')
        const count = parseInt(pairing[1].replace(/[\s]+/g, '').match(/[\d]+$/), 10) * 1000
        if (!objectified[country]) {
          // console.log(country)
        } else {
          objectified[country]['populationCount'] = count
        }
      }
    })

    // console.log(objectified)
    fs.writeFile('world-languages.json', JSON.stringify(objectified), 'utf8', function () {})
  })
})
