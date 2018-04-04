const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const Twitter = require('twitter');
const app = express();

app.set('view engine', 'pug');
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

const client = new Twitter({
    consumer_key: 'tEKResovDPAgsqph6aA6nQcu2',
    consumer_secret: 'JIw9r19FhAVrP2RnyGTIrYnicFbrweAiAfrAJNDum2rWx4mlEW',
    access_token_key: '547288373-sUjasRS2WWNj1nPE0NgDm3Z7H7MbxzewKOg89QgH',
    access_token_secret: 'J7Y0hw6Dr6VPpw3dILSvZj6SoSDDZp4YyPvM56GUnKdDx'
});

app.get('/', (req, res) => {
  res.render('index', {
    apiUrl: req.apiGateway ? `https://${req.apiGateway.event.headers.Host}/${req.apiGateway.event.requestContext.stage}` : 'http://localhost:3000'
  });
})

app.get('/FloridaMan', (req, res) => {
    client.get('statuses/user_timeline', {screen_name: '@_FloridaMan'}, (error, tweets, response) => {
        if(!error)
            console.log(tweets);
    })
})
