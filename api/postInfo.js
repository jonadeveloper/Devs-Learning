const axios = require("axios");

module.exports.postInfo = async function (course) {
  let courseDB = {
    name: course.name,

    img: course.img,
    level: course.level,
    description: course.description,
    descriptionComplete: course.descriptionComplete,
    duration: course.duration,
    instructor: course.instructor,

    price: course.price,
    category: course.category,
  };
  await axios
    .post("http://localhost:3001/courses", courseDB)
    .then(function (response) {
      //console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
