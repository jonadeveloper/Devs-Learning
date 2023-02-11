const { Course, Category } = require("../../db");

export async function putCourse(req: any, res: any) {
  try {
    let {
      name,
      img,
      level,
      description,
      descriptionComplete,
      duration,
      instructor,
      price,
      category,
    } = req.body;
    let nameDB = name.split(" ").join("-").toLowerCase();
    let course = await Course.findOne({
      where: { name: nameDB },
    });
    if (course === undefined) return res.status(404).send(`El curso ${name} no existe`)
    await Course.update(
      {
        level: level ? level : course.level,
        img: img ? img : course.img,
        descriptionComplete: descriptionComplete
          ? descriptionComplete
          : course.descriptionComplete,
        duration: duration ? duration : course.duration,
        instructor: instructor ? instructor : course.instructor,
        description: description ? description : course.description,
        price: price,
      },
      {
        where: {
          name: nameDB,
        },
      }
    );
    if (category) {
      let categoryArr = category.map((el: string) => {
        return el.split(" ").join("-").toLowerCase();
      });
      let categoryDB = await Category.findAll({
        where: { name: categoryArr },
      });
      categoryDB.forEach((el: any) => {
        course.addCategory(el);
      });
    };
    return res.status(200).send(`The course ${name} has been updated`);
  } catch (err) {
    return res.status(404).send(err);
  }
}
