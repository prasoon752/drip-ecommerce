// Static product data (replace with MongoDB model if needed)
const products = [
  { id:1, brand:'H&M', name:'Slim Fit Chinos', price:1199, old:2499, disc:52, rating:4.3, reviews:1204, emoji:'👖', cat:'All', sizes:['28','30','32','34'], isNew:false, isSale:true, isTop:false },
  { id:2, brand:'Zara', name:'Floral Wrap Dress', price:2799, old:4999, disc:44, rating:4.6, reviews:893, emoji:'👗', cat:'Women', sizes:['XS','S','M','L'], isNew:true, isSale:true, isTop:true },
  { id:3, brand:'Fabindia', name:'Cotton Kurta', price:1499, old:2299, disc:35, rating:4.5, reviews:2341, emoji:'👘', cat:'Ethnic', sizes:['S','M','L','XL'], isNew:false, isSale:true, isTop:true },
  { id:4, brand:'Puma', name:'Track Jacket', price:2199, old:3999, disc:45, rating:4.2, reviews:567, emoji:'🧥', cat:'Sports', sizes:['S','M','L','XL','XXL'], isNew:true, isSale:true, isTop:false },
  { id:5, brand:'Roadster', name:'Oversized Hoodie', price:999, old:1999, disc:50, rating:4.4, reviews:3210, emoji:'🩳', cat:'Streetwear', sizes:['S','M','L','XL'], isNew:false, isSale:true, isTop:true },
  { id:6, brand:'W', name:'Georgette Saree', price:3299, old:5499, disc:40, rating:4.7, reviews:445, emoji:'🥻', cat:'Ethnic', sizes:['Free Size'], isNew:true, isSale:false, isTop:true },
  { id:7, brand:'Dennis Lingo', name:'Oxford Shirt', price:849, old:1699, disc:50, rating:4.1, reviews:980, emoji:'👔', cat:'All', sizes:['S','M','L','XL'], isNew:false, isSale:true, isTop:false },
  { id:8, brand:'Biba', name:'Palazzo Set', price:1899, old:2999, disc:37, rating:4.5, reviews:1567, emoji:'🩱', cat:'Women', sizes:['XS','S','M','L','XL'], isNew:true, isSale:false, isTop:true },
  { id:9, brand:'Nike', name:'Dri-FIT Tee', price:1499, old:2495, disc:40, rating:4.6, reviews:4321, emoji:'👕', cat:'Sports', sizes:['S','M','L','XL','XXL'], isNew:false, isSale:true, isTop:true },
  { id:10, brand:"Levi's", name:'511 Slim Jeans', price:2799, old:3999, disc:30, rating:4.8, reviews:8901, emoji:'🩲', cat:'All', sizes:['28','30','32','34','36'], isNew:false, isSale:false, isTop:true },
  { id:11, brand:'Mango', name:'Linen Blazer', price:4499, old:7999, disc:44, rating:4.5, reviews:234, emoji:'🥼', cat:'Women', sizes:['XS','S','M','L'], isNew:true, isSale:true, isTop:false },
  { id:12, brand:'Allen Solly', name:'Polo T-Shirt', price:699, old:1299, disc:46, rating:4.3, reviews:1876, emoji:'🎽', cat:'All', sizes:['S','M','L','XL'], isNew:false, isSale:true, isTop:false },
];

// @GET /api/products
const getProducts = (req, res) => {
  const { cat, search, sort } = req.query;
  let result = [...products];

  if (cat && cat !== 'All') result = result.filter(p => p.cat === cat);
  if (search) result = result.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === 'low') result.sort((a, b) => a.price - b.price);
  if (sort === 'high') result.sort((a, b) => b.price - a.price);
  if (sort === 'disc') result.sort((a, b) => b.disc - a.disc);
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

  res.json({ success: true, count: result.length, products: result });
};

// @GET /api/products/:id
const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
};

module.exports = { getProducts, getProductById };
