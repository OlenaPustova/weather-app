export const quoteMarkup = (data) => {
  return `
  <div class="quote">
  <div class="quote">
            <p>${data[0].quote}</p>
            <span>${data[0].author}</span>
        <div>
        </div>
        `;
};

// export const quote = async () => {
//   return await fetch(`https://api.goprogram.ai/inspiration`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

const API_KEY_QUOTE = "EJBafdUi+x2+pNqCOjgZzA==woNvmojm3KCWpzch";
const options = {
  method: "GET",
  headers: { "X-Api-Key": API_KEY_QUOTE },
};

export const quote = async () => {
  return await fetch(
    `https://api.api-ninjas.com/v1/quotes?category=inspirational`,
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
