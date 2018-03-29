const axios = require('axios')
const chalk = require('chalk')

// Demo 01: Just get authors
function demo01() {
  axios.get('http://poetrydb.org/author')
    .then(result => {
      const { authors } = result.data
      authors.forEach(author => console.log(author))
    })
}

// Demo 02: Extract authors and turn them into URLs for the titles
function demo02() {
  axios.get('http://poetrydb.org/author')
    .then(result => result.data.authors)
    .then(authors => authors.map(author => `http://poetrydb.org/author/${encodeURIComponent(author)}/title`))
    .then(titleURLs => titleURLs.forEach(url => console.log(url)))
    .catch(err => console.log(chalk.bgRed(err)))
}


function demo03() {
  axios.get('http://poetrydb.org/author')
    .then(result => result.data.authors)
    .then(authors => authors.map(author => `http://poetrydb.org/author/${encodeURIComponent(author)}/title`))
    .then(titleURLs => titleURLs.map(titleURL => axios.get(titleURL)))
    .then(promises => Promise.all(promises))
    .then(results => results.map(x => x.data))
    .then(titles => console.log(titles))
    .catch(err => console.log(chalk.bgRed(err)))
}

// demo01()
// demo02()
demo03()
