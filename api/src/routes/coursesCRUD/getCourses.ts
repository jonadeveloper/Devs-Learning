const { Course, Category } = require("../../db");

export async function getCourses(req: any, res: any) {
  try {
    let { name } = req.query;
    const myRegEx = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
    if (name) {
      name = name.split(" ").join("-").toLowerCase();
      let course = await Course.findAll({
        where: { name: name },
        include: {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      course.length === 0 ? res.status(404).send(`The course ${name} has not been found`) : res.status(200).send(course);
    }
    let { id } = req.query;
    if (id) {
      if (myRegEx.test(id)) {
        let course = await Course.findAll({
          where: { id: id },
          include: {
            model: Category,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });
        course.length === 0 ? res.status(404).send("The course has not been found") : res.status(200).send(course);
      } else {
        return res.status(404).send("Id doesn't match type UUID");
      }
    } else {
      let course = await Course.findAll({
        include: {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.status(200).send(course);
    }
  } catch (err) {
    return res.status(404).send(err);
  }
}

export async function getRatings(_req: any, res: any) {
  try {
    let courses = await Course.findAll();
    let ratingsArr = courses.map((el: any) => {
      return el.rating
    });
    let ratings = ratingsArr.flatMap((num: number) => num);
    return res.status(200).send(ratings);
  } catch (err) {
    return res.status(200).send(err);
  }
}