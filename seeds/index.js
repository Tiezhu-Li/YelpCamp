const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random100 = Math.floor(Math.random() * 100);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6573cd609e387c46e9d56502",
      location: `${cities[random100].city}, ${cities[random100].admin_name}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [cities[random100].lng, cities[random100].lat],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dpzwa4lxs/image/upload/v1702208299/Yelp-Camp/vjhvdnlkoy54jbtbdqln.jpg",
          filename: "Yelp-Camp/vjhvdnlkoy54jbtbdqln",
        },
        {
          url: "https://res.cloudinary.com/dpzwa4lxs/image/upload/v1702381382/Yelp-Camp/jljj3usktlhl8zjtrio7.jpg",
          filename: "Yelp-Camp/jljj3usktlhl8zjtrio7",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores assumenda voluptatum perspiciatis provident illo culpa quos dolores, excepturi, molestias eveniet voluptates corrupti rerum tenetur explicabo corporis odit! Porro, sint aperiam",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
