import { baseURL } from "../Constrant";

// export const signUp = async (payload) => {
//   try {
//     const response = await fetch(`${baseURL}/signup`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });
//     return response;
//   } catch (error) {
//     console.error("Error :", error.message);
//   }
// };

// export const logIn = async (payload) => {
//   try {
//     const response = await fetch(`${baseURL}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });
//     const data = await response.json();
//     return { status: response.status, ok: response.ok, data };
//     // return response;
//   } catch (error) {
//     console.log("Error: ", error.message);
//   }
// };

// export const getProducts = async (token) => {
//   try {
//     const response = await fetch(`${baseURL}/products`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       console.log("error:", response.status);
//       return null;
//     }
//     const data = await response.json();
//     console.log(data, "jsggsfgjsgfs");
//     return data;
//   } catch (error) {
//     console.log("Error fetching products:", error.message);
//     return null;
//   }
// };


// export const getProductById = async (id, token) => {
//   try {
//     const response = await fetch(`${baseURL}/products/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       console.log("Error", response.status);
//     }
//     const data = await response.json;
//     return data;
//   } catch (error) {
//     console.log("Error fetching product: ", error.message);
//   }
// };
