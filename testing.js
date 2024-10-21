const products = [
  { barcode: "789011", name: "apple" },
  { barcode: "789012", name: "banana" },
  { barcode: "789013", name: "potato" },
  { barcode: "789014", name: "cherry" },
  { barcode: "789015", name: "cucumber" },
  { barcode: "789016", name: "orange" },
  { barcode: "789017", name: "cheese" }
];

const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');

searchBox.addEventListener('input', () => {
  const searchValue = searchBox.value.toLowerCase();
  const matchedProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchValue) || 
    product.barcode.includes(searchValue)
  );

  // Hide all products
  document.querySelectorAll('.product').forEach(product => {
    product.classList.add('non-active');
  });

  // Show matched products
  matchedProducts.forEach(product => {
    const productElement = document.getElementById(product.name);
    if (productElement) {
      productElement.classList.remove('non-active');
    }
  });

  // Determine if the search value is a name or a barcode
  let newUrl;
  if(searchValue === '') {
    // Empty search value, reset URL
    newUrl = `${window.location.origin}${window.location.pathname}`;
  } else if (/^\d+$/.test(searchValue)) {
    // Only numbers, treat as barcode
    newUrl = `${window.location.origin}${window.location.pathname}?barcode=${encodeURIComponent(searchValue)}`;
  } else {
    // Contains letters, treat as name
    newUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(searchValue)}`;
  }

  // Update URL
  window.history.pushState({ path: newUrl }, '', newUrl);
});