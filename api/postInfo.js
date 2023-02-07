const axios = require("axios");

module.exports.postInfo = async function (course) {
    let courseDB = {
        name: course.name,
        level: course.level,
        description: course.description,
        price: course.price,
        category: course.category
    };
    await axios.post("http://localhost:3001/courses", courseDB).then(function (response) {
        // console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
};

