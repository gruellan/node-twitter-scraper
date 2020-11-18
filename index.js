const http = require('http');
const fs = require('fs');
const Twit = require('twit');
const hostname = '127.0.0.1';
const port = 3000;

var T = new Twit({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: '',
  timeout_ms: 60 * 1000,
  strictSSL: true,
})


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
  // Get tweets
  T.get('statuses/user_timeline', { screen_name: 'georgeruellan' }, function (err, data, response) {
    console.log(data)
    // Write to JSON file
    let res = JSON.stringify(data);
    fs.writeFileSync('tweets.json', res);
  })

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});