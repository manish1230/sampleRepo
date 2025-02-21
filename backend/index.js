let express = require("express");
let Data = require("./Data");
let cors = require("cors");

let app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine (not used for API, but kept if needed)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// GET all users
app.get("/home", async (req, res) => {
  let val = await Data.find();
  res.send(val);
});

// CREATE operation
app.post("/users", async (req, res) => {
  let { name, email, phone } = req.body;
  console.log(req.body);
  
  console.log(name, email, phone);
  let newuser = new Data({ name, email, phone });

  try {
    const newUser = await newuser.save();
    console.log(newUser);
    
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send({ message: "Error saving user", error: err });
  }
});

// UPDATE operation
app.put("/update/:id", async (req, res) => {
  let { name, email, phone } = req.body;
  console.log(name, email, phone);

  let updt = await Data.findByIdAndUpdate(req.params.id, { name, email, phone });
  console.log(updt);
  res.status(201).send(await Data.findById(req.params.id));
});

// DELETE operation
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  let delval = await Data.findByIdAndDelete(userId);
  console.log(delval);
  res.status(201).send(delval);
});

// Start server
app.listen(8080, () => {
  console.log("Server is listening on port 8080...");
});
