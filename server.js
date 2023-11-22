import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/api/v1/get-photoalbums', (req, res) => {
  const credentials = btoa('admin:FDSart484562');
  fetch('https://api.academjazzclub.ru/api/v1/get-photoalbums', {
    headers: {'Authorization': `Basic ${credentials}`,
    },
  })
  // eslint-disable-next-line no-shadow
      .then((res)=> res.json())
      .then((data)=> res.send(data))
      .catch((err)=>{
        res.send(err);
      });
});

app.post('/api/v1/get-events-list', (req, res) => {
  const credentials = btoa('admin:FDSart484562');
  fetch('https://api.academjazzclub.ru/api/v1/get-events-list', {
    body: JSON.stringify(req.body),
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    method: 'post',
  })
  // eslint-disable-next-line no-shadow
      .then((res)=> res.json())
      .then((data)=> res.send(data))
      .catch((err)=>{
        res.send(err);
      });
});

app.post('/api/v1/get-event', (req, res) => {
  const credentials = btoa('admin:FDSart484562');
  fetch('https://api.academjazzclub.ru/api/v1/get-event', {
    body: JSON.stringify(req.body),
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    method: 'post',
  })
  // eslint-disable-next-line no-shadow
      .then((res)=> res.json())
      .then((data)=> res.send(data))
      .catch((err)=>{
        res.send(err);
      });
});

app.post('/api/v1/get-events-by-artist', (req, res) => {
  const credentials = btoa('admin:FDSart484562');
  fetch('https://api.academjazzclub.ru/api/v1/get-events-by-artist', {
    body: JSON.stringify(req.body),
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    method: 'post',
  })
  // eslint-disable-next-line no-shadow
      .then((res)=> res.json())
      .then((data)=> res.send(data))
      .catch((err)=>{
        res.send(err);
      });
});

app.post('/api/v1/get-artists-list', (req, res) => {
  const credentials = btoa('admin:FDSart484562');
  fetch('https://api.academjazzclub.ru/api/v1/get-artists-list', {
    body: JSON.stringify(req.body),
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    method: 'post',
  })
  // eslint-disable-next-line no-shadow
      .then((res)=> res.json())
      .then((data)=> res.send(data))
      .catch((err)=>{
        res.send(err);
      });
});

app.get('/api/v1/get-setting', (req, res) => {
  const credentials = btoa('admin:FDSart484562');
  fetch('https://api.academjazzclub.ru/api/v1/get-setting', {
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    method: 'get',
  })
  // eslint-disable-next-line no-shadow
      .then((res)=> res.json())
      .then((data)=> res.send(data))
      .catch((err)=>{
        res.send(err);
      });
});


app.listen(3001, () => {
  console.log('Server started on port 3001');
});
