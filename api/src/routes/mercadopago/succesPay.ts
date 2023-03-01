import { sendMail } from "../../utils/sendMail";

export async function successMail(req: any, res: any) {
  try {
    const { cart, email } = req.body;

    //email de compra exitosa

    let names = cart.map((item: any) => {
      return `<p>${item.name}</p>`;
    });

    let stringItems =
      "<h1>Thanks for your purchase</h1><p>The items purchased are:</p>";
    for (let i = 0; i < names.length; i++) {
      stringItems = stringItems + names[i];
    }

    sendMail({
      from: "simon__navarrete@hotmail.com",
      subject: "Successful purchase at Devslearning",
      text: "Thank you so much!",
      to: email,
      html: stringItems,
    });

    ///////////////////////////////////

    res.status(201).send(email);
  } catch {
    console.log("No se pudo enviar el correo");
  }
}
