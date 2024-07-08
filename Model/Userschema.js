const mongoose = require("mongoose");

const Userschemaflight = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    name:{
        type: String,
        required: true
    }
},
    {
        collection: "flights"
    }
);

const Userschemahotel = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true  
    }
},

{
    collection: "hotels"
}
);

const Userschematour = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    places: {
        type: [String],
        required: true
    }
}, {
    collection: "tours"
});


const Userschemasignup = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: "users"
});

module.exports = {
    Flight: mongoose.model("flights", Userschemaflight),
    Hotel: mongoose.model("hotels", Userschemahotel),
    Tour: mongoose.model("tours", Userschematour),
    Signup: mongoose.model("signups", Userschemasignup)
};