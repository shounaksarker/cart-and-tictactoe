import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: "Apple iPhone 15 Pro",
    description: "The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system. Experience the future of mobile technology.",
    price: 999.99,
    category: "Electronics",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    tags: ["smartphone", "apple", "5G", "premium"],
    isActive: true,
  },
  {
    name: "Nike Air Max 270",
    description: "Inspired by two icons of big Air: the Air Max 180 and Air Max 93. The biggest heel Air unit yet delivers unrivaled comfort.",
    price: 150.00,
    category: "Sports",
    stock: 75,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    tags: ["sneakers", "nike", "running", "comfort"],
    isActive: true,
  },
  {
    name: "MacBook Pro 16-inch",
    description: "Supercharged by M3 Pro and M3 Max chips. Built for all the ways you work, create, and play. The most advanced Mac laptops ever.",
    price: 2499.00,
    category: "Electronics",
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    tags: ["laptop", "apple", "professional", "M3"],
    isActive: true,
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "The original blue jean since 1873. The 501 Original is the vintage blueprint of our first-ever pair of jeans.",
    price: 98.00,
    category: "Clothing",
    stock: 120,
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    tags: ["denim", "levis", "classic", "casual"],
    isActive: true,
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling with Auto Noise Canceling Optimizer. Crystal clear hands-free calling.",
    price: 399.99,
    category: "Electronics",
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    tags: ["headphones", "sony", "wireless", "noise-canceling"],
    isActive: true,
  },
  {
    name: "The Art of War",
    description: "Ancient Chinese military treatise by Sun Tzu. A timeless strategy guide that applies to business and life.",
    price: 12.99,
    category: "Books",
    stock: 200,
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
    tags: ["strategy", "philosophy", "classic", "business"],
    isActive: true,
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "7 appliances in 1: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker, and Warmer.",
    price: 99.95,
    category: "Home & Garden",
    stock: 80,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
    tags: ["kitchen", "cooking", "appliance", "convenience"],
    isActive: true,
  },
  {
    name: "LEGO Architecture Statue of Liberty",
    description: "Build and display this detailed LEGO Architecture Statue of Liberty model, featuring realistic details.",
    price: 119.99,
    category: "Toys",
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    tags: ["lego", "building", "architecture", "collectible"],
    isActive: true,
  },
  {
    name: "Fenty Beauty Foundation",
    description: "Pro Filt'r Soft Matte Longwear Foundation. 40 shades for all skin tones with full coverage.",
    price: 36.00,
    category: "Beauty",
    stock: 150,
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    tags: ["makeup", "foundation", "fenty", "inclusive"],
    isActive: true,
  },
  {
    name: "Tesla Model 3 Floor Mats",
    description: "All-weather floor mats designed specifically for Tesla Model 3. Premium materials with perfect fit.",
    price: 195.00,
    category: "Automotive",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500",
    tags: ["tesla", "accessories", "protection", "automotive"],
    isActive: true,
  },
  {
    name: "Organic Green Tea",
    description: "Premium organic green tea leaves sourced from high-altitude gardens. Rich in antioxidants and natural flavor.",
    price: 24.99,
    category: "Food",
    stock: 100,
    imageUrl: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=500",
    tags: ["tea", "organic", "healthy", "antioxidants"],
    isActive: true,
  },
  {
    name: "Fitbit Versa 4",
    description: "Health and fitness smartwatch with built-in GPS, 24/7 heart rate monitoring, and 6+ day battery life.",
    price: 249.95,
    category: "Health",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    tags: ["fitness", "smartwatch", "health", "tracker"],
    isActive: true,
  },
];

async function main() {
  console.log('Start seeding...');
  
  for (const product of sampleProducts) {
    const result = await prisma.product.create({
      data: product,
    });
    console.log(`Created product: ${result.name}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });