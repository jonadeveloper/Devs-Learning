const axios = require("axios");

module.exports.postInfo = async function (course) {
    let courseDB = {
        name: course.name,
<<<<<<< HEAD
        level: course.level,
        description: course.description,
=======
<<<<<<< HEAD
        img: course.img,
        level: course.level,
        description: course.description,
        descriptionComplete: course.descriptionComplete,
        duration: course.duration,
        instructor: course.instructor,
=======
        level: course.level,
        description: course.description,
>>>>>>> development
>>>>>>> dataBase
        price: course.price,
        category: course.category
    };
    await axios.post("http://localhost:3001/courses", courseDB).then(function (response) {
<<<<<<< HEAD
        // console.log(response);
=======
<<<<<<< HEAD
        //console.log(response);
=======
        // console.log(response);
>>>>>>> development
>>>>>>> dataBase
    }).catch(function (error) {
        console.log(error);
    });
};

