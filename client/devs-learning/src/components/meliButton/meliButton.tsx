import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooksRedux";

const BACK = process.env.REACT_APP_BASE_URL;

export default function () {
  let button = true;

  const { cart } = useAppSelector((state) => state.courses);

  useEffect(() => {
    if (button) {
      const fetchCheckout = async () => {
        const res = await axios.post(`${BACK}/pay`, cart);

        const data = await res.data;

        if (data.global) {
          const script = document.createElement("script"); // Here we create the empty script tag
          script.type = "text/javascript"; // The type of the script
          script.src = "https://sdk.mercadopago.com/js/v2"; // The link where the script is hosted
          script.setAttribute("data-preference-id", data.global); // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
          document.body.appendChild(script); // Here we append it to the body of our page

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore

          // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response
          const mp = new window.MercadoPago(process.env.REACT_APP_MELI, {
            locale: "es-AR",
          });

          mp.checkout({
            preference: {
              id: data.global,
            },
            render: {
              container: ".cho-container",
              label: "Pagar",
            },
          });
        }
      };

      fetchCheckout();
      button = false;
    }
  }, [cart]);

  return <div className="cho-container"></div>;
}
