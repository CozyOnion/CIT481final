const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const serviceAccount = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const collectionRef = db.collection('destinations');

app.use(express.static("views"));
app.use(bodyParser.json());
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get('/getAllDestinations', async (req, res) => {
  try {
      const snapshot = await collectionRef.get();
      const data = [];
      snapshot.forEach((doc) => {
          data.push(doc.data());
      });
      res.json(data);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/generateDestinations', async (req, res) => {
  console.log(req.body)
  try {
      const requestData = req.body;
      let query = db.collection('destinations');
      for (const key in requestData) {
        if (requestData.hasOwnProperty(key) && requestData[key] !== '') {
            query = query.where(key, '==', requestData[key]);
        }
      }
      const querySnapshot = await query.get();
      const data = [];
      querySnapshot.forEach((doc) => {
          data.push(doc.data());
      });
      res.json(data);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
  }
});

const port = 3000;

const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});