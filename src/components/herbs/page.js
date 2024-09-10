import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const ProductCard = ({ id, title, image, discount, isNew, redirectLink }) => (
  <div className={styles.singleProduct}>
    <div className={`${styles.part1} ${styles[`product${id}`]}`}>
      {discount && <span className={styles.discount}>{discount}% off</span>}
      {isNew && <span className={styles.new}>new</span>}
      {image && (
        <div className={styles.productImage}>
          <Image src={image} alt={title} width={200} height={200} layout="responsive" />
        </div>
      )}
      <ul>
        <li><a href="#"><i className="fas fa-shopping-cart"></i></a></li>
        <li><a href="#"><i className="fas fa-heart"></i></a></li>
        <li><a href="#"><i className="fas fa-eye"></i></a></li>
      </ul>
    </div>
    <div className={styles.part2}>
      <h3 className={styles.productTitle}>{title}</h3>
      {redirectLink && (
        <Link href={redirectLink} className={styles.redirectLink}>
          View Product
        </Link>
      )}
    </div>
  </div>
);

const ProductGrid = () => {
  const products = [
    { id: 1, title: "Mint", image: "/mint.jpg", redirectLink: "/mint" },
    { id: 2, title: "Leather Handbag", image: "/lily.jpg", discount: 15, redirectLink: "/products/leather-handbag" },
    { id: 3, title: "Wireless Earbuds", image: "/moroccan.jpg", redirectLink: "/products/wireless-earbuds" },
    { id: 4, title: "Smart Fitness Tracker", image: "/oregano.jpg", isNew: true, redirectLink: "/products/fitness-tracker" },
    // Add more products as needed
  ];

  return (
    <section className={styles.sectionProducts}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Top Herbs</h3>
          <h2></h2>
        </div>
        <div className={styles.row}>
          {products.map((product) => (
            <div key={product.id} className={styles.col}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;