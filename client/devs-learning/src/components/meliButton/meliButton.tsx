import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooksRedux";

const BACK = process.env.REACT_APP_BASE_URL;

export const createMPButton = async (cart: any) => {
  if (cart.length > 0) {
    const res = await axios.post(`${BACK}/pay`, cart);

    const data = await res.data;

    ////limpiar
    let buttonOld = document.getElementById("button-old");

    let miContainer = buttonOld?.parentNode;

    if (buttonOld) {
      miContainer?.removeChild(buttonOld);
    }

    let choContainer = document.getElementById("cho-container");
    while (choContainer?.firstChild) {
      choContainer.removeChild(choContainer.firstChild);
    }

    /////////////////////////////////////////////

    if (data.global) {
      const script = document.createElement("script"); // Here we create the empty script tag
      script.type = "text/javascript"; // The type of the script
      script.src = "https://sdk.mercadopago.com/js/v2"; // The link where the script is hosted
      script.setAttribute("data-preference-id", data.global); // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
      script.setAttribute("id", "button-old");
      document.body.appendChild(script); // Here we append it to the body of our page

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response
      const mp = await new window.MercadoPago(process.env.REACT_APP_MELI, {
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
  }
};

export default function () {
  return <div id="cho-container" className="cho-container"></div>;
}
