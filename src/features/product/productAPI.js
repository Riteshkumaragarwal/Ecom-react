// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchProductsByFilter(filter, sort) {
  console.log('fil', filter)
  let queryParams = []
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryParams.push(`${key}=${lastCategoryValue}`)
    }
  }
  for (let key in sort) {
    queryParams.push(`${key}=${filter[key]}`)
  }
  const queryString = queryParams.join('&')
  return new Promise(async (resolve) => {
    console.log('q', queryString)
    const response = await fetch("http://localhost:8080/products?" + queryString);
    const data = await response.json();
    resolve({ data });
  });
}