const axios = require("axios");

module.exports.postCourses = async function (course) {
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

module.exports.postCategories = async function (category) {
  let categoryDB = {
    name: category.name,
    img: category.img,
    description: category.description
  };
  await axios
    .post("http://localhost:3001/categories", categoryDB)
    .then(function (response) {
      //console.log(response);
    })
    .catch(function (error) {
      //console.log(error);
    });
}