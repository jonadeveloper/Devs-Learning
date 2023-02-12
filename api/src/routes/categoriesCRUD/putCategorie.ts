const { Course, Category } = require("../../db");

export async function putCategorie(req: any, res: any) {
  try {
    let {
      name,
      img,
      description,
      course
    } = req.body;
    let nameDB = name.split(" ").join("-").toLowerCase();
    let category = await Category.findOne({
      where: { name: nameDB },
      include: {
        model: Course,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }
    });
    if (category === undefined) return res.status(404).send(`La categoria ${name} no existe`);
    await Category.update(
      {
        img: img ? img : category.img,
        description: description ? description : category.description
      },
      {
        where: {
          name: nameDB,
        },
      }
    );
    if (course) {
      let newCourses = course.map((el: string) => {
        return el.split(" ").join("-").toLowerCase();
      });
      let coursesArr = category.courses.map((course: any)=>{
        return course.name
      });
      let oldCourses = await Course.findAll({
        where: {
          name: coursesArr
        }
      });
      oldCourses.forEach((el: any)=>{
        category.removeCourse(el)
      });
      let coursesDB = await Course.findAll({
        where: { name: newCourses },
      });
      coursesDB.forEach((el: any) => {
        category.addCourse(el);
      });
    };
    return res.status(200).send(`The category ${name} has been updated`);
  } catch (err) {
    return res.status(404).send(err);
  }
}
