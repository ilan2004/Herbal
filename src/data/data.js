// data/collections.js
export const collections = [
    {
      handle: 'summer-collection',
      title: 'Summer Collection',
      description: 'Our exclusive summer collection.',
      seo: {
        title: 'Summer Collection - My Store',
        description: 'Explore our exclusive summer collection of products.',
      },
      products: [
        { id: '1', title: 'Sunglasses', price: '29.99', image: 'sunglasses.jpg' },
        { id: '2', title: 'Beach Towel', price: '19.99', image: 'beach-towel.jpg' },
        // Add more products as needed
      ],
    },
    // Add more collections as needed
  ];
  export function getProducts({ sortKey, reverse, query }) {
    let allProducts = [];
    collections.forEach((collection) => {
      allProducts = [...allProducts, ...collection.products];
    });
  
    // Filter by query (e.g., search term)
    if (query) {
      allProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    // Sort the products
    if (sortKey === "price") {
      allProducts.sort((a, b) => (reverse ? b.price - a.price : a.price - b.price));
    }
  
    return allProducts;
  }