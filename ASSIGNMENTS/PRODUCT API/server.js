const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const productsFile = path.join(__dirname, 'products.json');

app.use(express.json());

async function readProducts() {
  const data = await fs.readFile(productsFile, 'utf8');
  return JSON.parse(data);
}

async function writeProducts(products) {
  await fs.writeFile(productsFile, `${JSON.stringify(products, null, 2)}\n`);
}

function validateProduct(body) {
  const { name, price, category, stock } = body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    return 'name is required and must be a non-empty string';
  }
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    return 'price is required and must be a non-negative number';
  }
  if (!category || typeof category !== 'string' || !category.trim()) {
    return 'category is required and must be a non-empty string';
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return 'stock is required and must be a non-negative integer';
  }
  return null;
}

function findProduct(products, id) {
  return products.find((product) => product.id === Number(id));
}

app.get('/', (req, res) => {
  res.json({ message: 'Products API is running', products: '/api/products' });
});

app.get('/api/products', async (req, res, next) => {
  try {
    const products = await readProducts();
    res.json({ count: products.length, data: products });
  } catch (error) {
    next(error);
  }
});

app.get('/api/products/:id', async (req, res, next) => {
  try {
    const products = await readProducts();
    const product = findProduct(products, req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

app.post('/api/products', async (req, res, next) => {
  try {
    const validationError = validateProduct(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const products = await readProducts();
    const product = {
      id: products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1,
      name: req.body.name.trim(),
      price: req.body.price,
      category: req.body.category.trim(),
      stock: req.body.stock,
    };
    products.push(product);
    await writeProducts(products);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

app.put('/api/products/:id', async (req, res, next) => {
  try {
    const validationError = validateProduct(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const products = await readProducts();
    const product = findProduct(products, req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    Object.assign(product, {
      name: req.body.name.trim(),
      price: req.body.price,
      category: req.body.category.trim(),
      stock: req.body.stock,
    });
    await writeProducts(products);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/products/:id', async (req, res, next) => {
  try {
    const products = await readProducts();
    const productIndex = products.findIndex((product) => product.id === Number(req.params.id));
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const [deletedProduct] = products.splice(productIndex, 1);
    await writeProducts(products);
    res.json({ message: 'Product deleted successfully', data: deletedProduct });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Products API listening at http://localhost:${PORT}`);
});