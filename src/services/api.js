export async function getCategories() {
  // Implemente aqui o código
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const data = await fetch(url);
  const dataJSON = await data.json();
  return dataJSON;
}

export async function getProductsFromCategoryAndQuery(categoryID, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryID}&q=${query}`;
  const data = await fetch(url);
  const dataJson = await data.json();
  return dataJson;
}

export async function getProductsFromCategory(categoryID) {
  const url = `https://api.mercadolibre.com/sites/MLA/search?category=${categoryID}`;
  const data = await fetch(url);
  const dataJson = await data.json();
  return dataJson;
}

export async function getProductById(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const data = await fetch(url);
  const dataJson = await data.json();
  return dataJson;
}
