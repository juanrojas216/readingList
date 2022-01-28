const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/javascriptdb', {
    useNewUrlParser: true
})
.then(db=>console.log('DB connected'))
.catch(err => console.log(err));