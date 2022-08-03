const express = require('express');
const mongoose = require("mongoose");
var app = express();
const http = require('http').Server(app)
require('dotenv').config();
var bodyParser = require('body-parser');
const cors = require('cors');
var path = require("path");
const morgan = require("morgan");

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 50000,
  })
)

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/uploads")));
app.use("/", express.static("public"));


//database connection
// mongoose.Promise = global.Promise;
// const PASSWORD = encodeURIComponent("");
// const database = "AMA_project";
// const databs = encodeURI(``);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("DB Not conected"));

//User Routes
const User = require("./src/routes/Patient/auth")
const userSpecialist = require("./src/routes/Patient/doctorSpecialist")
const review = require("./src/routes/Patient/review")
const bookAppointment = require("./src/routes/Patient/bookAppointment")
const Report = require("./src/routes/Patient/report")
const sugarVitals = require("./src/routes/Patient/sugarVitals")
const InsulinVitals = require("./src/routes/Patient/insulinVitals")
// const bpVitals = require("./src/routes/Patient/")



//Admin Routes
const Specialist = require("./src/routes/Admin/specialist")
const registerDoctor = require("./src/routes/Admin/registerDoctor")
const Prescription = require("./src/routes/Admin/prescription")
const LabReport = require("./src/routes/Admin/labReport")


//Admin Middleware
app.use('/api', Specialist)
app.use('/api', registerDoctor)
app.use('/api', Prescription)
app.use('/api', LabReport)


//User Middleware
app.use("/api", User)
app.use("/api", userSpecialist)
app.use('/api', review)
app.use('/api', bookAppointment)
app.use('/api', Report)
app.use('/api', sugarVitals)
app.use('/api', InsulinVitals)



const port = process.env.PORT;
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});