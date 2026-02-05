import { baseURL } from "../Constrant";

export const checkoutSession = async (cartItems, token) => {
  try {
    const response = await fetch(`${baseURL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cartItems }),
    });
    if (!response.ok) {
      console.log(`Checkout failed: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error creating checkout session:", error.message);
  }
};
