// const express = require('express')
// const mongoose = require('mongoose')

// const app = express()
// const routercom = require('../routes/routerComplaint');

// const mongoDbURL = "mongodb+srv://bhawan:200132400588@atlascluster.fl5bp73.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"

// mongoose.connect(mongoDbURL)
// .then(() => console.log('Database Connected'))
// .catch((err) => console.log(err))

// app.listen(6000, () => console.log('Sever Connected'))

// app.use('/api',routercom);



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routerComplaint = require('../routes/routerComplaint');
const routerFeedback = require('../routes/routerFeedback');

const app = express();

const mongoDbURL = "mongodb+srv://bhawan:200132400588@atlascluster.fl5bp73.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

mongoose.connect(mongoDbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routerComplaint , routerFeedback);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
