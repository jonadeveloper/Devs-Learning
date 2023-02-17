const { mercadopago } = require("./mercadopago");

export async function payMeli(req: any, res: any) {
  try {
    const { id } = req.query;

    // Crea un objeto de preferencia
    let preference = {
      items: [
        {
          id: id,
          title: "Mi producto",
          unit_price: 100,
          quantity: 1,
        },
      ],
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response: any) {
        // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso

        return res.status(200).send(response.body.id);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}
