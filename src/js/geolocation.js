const API_KEY = "a6b603fe00254d1a83e3331d1e227ef5";

export async function success(lat = 46.45, lon = 30.69) {
  return await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}&language=en`
  )
    .then((res) => res.json())
    .then(Object.entries)
    .then((res) => res[3])
    .then((res) => res[1])
    .then((res) => {
      return res;
    });
}
