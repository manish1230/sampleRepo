const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017', {dbName: 'test'}, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({ name: String, email: String, phone: String });
const Data = mongoose.model('Data', UserSchema);

app.get('/users', async (req, res) => res.json(await Data.find()));
app.get('/users/:id', async (req, res) => res.json(await Data.findById(req.params.id)));
app.post('/users', async (req, res) => res.json(await Data.create(req.body)));
app.put('/users/:id', async (req, res) => res.json(await Data.findByIdAndUpdate(req.params.id, req.body)));
app.delete('/users/:id', async (req, res) => res.json(await Data.findByIdAndDelete(req.params.id)));

app.listen(3000, () => console.log('Server running on port 3000'));
