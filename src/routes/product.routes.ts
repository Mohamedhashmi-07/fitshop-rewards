import { Router, Request, Response } from 'express';
import { loadDb } from '../config/database';

const router = Router();

// GET /api/categories
router.get('/categories', (req: Request, res: Response) => {
  const db = loadDb();
  const categories = (db.categories || []).map(cat => ({
    ...cat,
    itemCount: (db.products || []).filter(p => p.category === cat.id).length,
  }));
  res.json(categories);
});

// GET /api/brands
router.get('/brands', (req: Request, res: Response) => {
  const db = loadDb();
  const brands = (db.brands || []).map(b => ({
    ...b,
    productCount: (db.products || []).filter(p => p.brandId === b.id).length,
  }));
  res.json(brands);
});

// GET /api/brands/:id
router.get('/brands/:id', (req: Request, res: Response) => {
  const db = loadDb();
  const brandId = req.params.id;
  const brand = (db.brands || []).find(b => b.id === brandId);

  if (!brand) {
    return res.status(404).json({ error: 'Brand not found' });
  }

  const products = (db.products || []).filter(p => p.brandId === brandId);
  res.json({ brand, products });
});

// GET /api/offers
router.get('/offers', (req: Request, res: Response) => {
  const db = loadDb();
  res.json(db.fitnessOffers || []);
});

// GET /api/products
router.get('/products', (req: Request, res: Response) => {
  const db = loadDb();
  let products = [...(db.products || [])];

  const { category, brand, activity, hasOffer, minPrice, maxPrice, search, sort } = req.query;

  // Filter: Category
  if (category && category !== 'all') {
    products = products.filter(p => p.category === category);
  }

  // Filter: Brand
  if (brand && brand !== 'all') {
    products = products.filter(p => p.brandId === brand);
  }

  // Filter: Activity
  if (activity && activity !== 'all') {
    products = products.filter(
      p => (p.activityType || '').toUpperCase() === (activity as string).toUpperCase()
    );
  }

  // Filter: Has Fitness Offer
  if (hasOffer === 'true') {
    products = products.filter(p => (p.fitnessDiscountPercent || 0) > 0);
  }

  // Filter: Min Price
  if (minPrice) {
    const min = parseFloat(minPrice as string);
    if (!isNaN(min)) {
      products = products.filter(p => (p.originalPrice || 0) >= min);
    }
  }

  // Filter: Max Price
  if (maxPrice) {
    const max = parseFloat(maxPrice as string);
    if (!isNaN(max)) {
      products = products.filter(p => (p.originalPrice || 0) <= max);
    }
  }

  // Search Filter
  if (search) {
    const q = (search as string).toLowerCase().trim();
    products = products.filter(
      p =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.brandName || '').toLowerCase().includes(q) ||
        (p.categoryName || '').toLowerCase().includes(q) ||
        (p.subcategory || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
    );
  }

  // Sorting
  const sortBy = (sort as string) || 'recommended';
  if (sortBy === 'price-asc') {
    products.sort((a, b) => (a.originalPrice || 0) - (b.originalPrice || 0));
  } else if (sortBy === 'price-desc') {
    products.sort((a, b) => (b.originalPrice || 0) - (a.originalPrice || 0));
  } else if (sortBy === 'rating') {
    products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'discount') {
    products.sort((a, b) => (b.fitnessDiscountPercent || 0) - (a.fitnessDiscountPercent || 0));
  } else if (sortBy === 'newest') {
    products.reverse();
  }

  res.json(products);
});

// GET /api/products/:id
router.get('/products/:id', (req: Request, res: Response) => {
  const db = loadDb();
  const prodId = req.params.id;
  const product = (db.products || []).find(p => p.id === prodId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const availableOfferIds = product.availableOfferIds || [product.offerId || 'off-run20'];
  const availableOffers = (db.fitnessOffers || []).filter(o => availableOfferIds.includes(o.id));
  const reviews = (db.reviews || []).filter(r => r.productId === prodId);

  res.json({
    product,
    availableOffers,
    reviews,
  });
});

export default router;
