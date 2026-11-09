
import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

import {
  MdLaptop,
  MdCardGiftcard,
  MdFaceRetouchingNatural,
  MdChair,
  MdChildCare,
  MdCategory,
  MdShoppingBasket,
  MdLocalGroceryStore,
  MdFastfood,
  MdBakeryDining,
  MdLocalDrink,
  MdCoffee,
  MdCleaningServices,
  MdPets,
  MdMedicalServices,
  MdLocalPharmacy,
  MdKitchen,
  MdCheckroom,
  MdPhoneAndroid,
  MdSportsSoccer,
  MdToys,
  MdMenuBook,
  MdBreakfastDining,
  MdIcecream,
  MdSpa,
  MdEgg,
  MdSetMeal,
  MdGrass,
  MdHome,
  MdLightbulb,
  MdFace,
} from "react-icons/md";

import {
  FaAppleAlt,
  FaCarrot,
  FaCookieBite,
  FaBaby,
  FaWineBottle,
  FaSoap,
  FaFish,
  FaDog,
  FaDrumstickBite,
  FaSeedling,
  FaGift,
} from "react-icons/fa";

import "../styles/MobileCategoryNavbar.css";

const getCategoryIcon = (categoryName = "") => {
  const name = categoryName.toLowerCase();

  // Electronics
  if (/electronic|laptop|computer|mobile|phone|accessor/.test(name))
    return <MdLaptop />;

  // Beauty and personal care
  if (/beauty|skin|makeup|cosmetic/.test(name))
    return <MdFaceRetouchingNatural />;

  if (/personal care|hair|face|grooming/.test(name))
    return <MdFace />;

  // Gifts
  if (/gift|gifting|hamper/.test(name))
    return <MdCardGiftcard />;

  // Home and decor
  if (/decor|furniture|home|household/.test(name))
    return <MdChair />;

  if (/kitchen|cookware|utensil/.test(name))
    return <MdKitchen />;

  if (/light|bulb/.test(name))
    return <MdLightbulb />;

  // Kids and baby
  if (/kid|baby|child|infant|diaper/.test(name))
    return <MdChildCare />;

  if (/toy|game/.test(name))
    return <MdToys />;

  // Fruits and vegetables
  if (/fruit|banana|apple/.test(name))
    return <FaAppleAlt />;

  if (/vegetable|veggie/.test(name))
    return <FaCarrot />;

  if (/grocery|staple|atta|rice|dal|grain|pulses/.test(name))
    return <MdLocalGroceryStore />;

  // Dairy and eggs
  if (/dairy|milk|cheese|butter|yogurt/.test(name))
    return <MdLocalDrink />;

  if (/egg/.test(name))
    return <MdEgg />;

  // Food and snacks
  if (/snack|chips|biscuit|cookie/.test(name))
    return <FaCookieBite />;

  if (/food|meal|ready to eat/.test(name))
    return <MdFastfood />;

  if (/bakery|bread|cake/.test(name))
    return <MdBakeryDining />;

  if (/sweet|chocolate|ice cream|dessert/.test(name))
    return <MdIcecream />;

  if (/breakfast|cereal|oats/.test(name))
    return <MdBreakfastDining />;

  // Drinks
  if (/drink|beverage|juice|soft drink|water/.test(name))
    return <FaWineBottle />;

  if (/tea|coffee/.test(name))
    return <MdCoffee />;

  // Meat and seafood
  if (/chicken|meat|poultry/.test(name))
    return <FaDrumstickBite />;

  if (/fish|seafood/.test(name))
    return <FaFish />;

  // Cleaning and household
  if (/clean|detergent|washing/.test(name))
    return <MdCleaningServices />;

  if (/soap|shampoo|sanitizer/.test(name))
    return <FaSoap />;

  // Health and medicine
  if (/medicine|medical|health|pharmacy|syrup/.test(name))
    return <MdMedicalServices />;

  // Pets
  if (/pet|dog|cat|animal/.test(name))
    return <FaDog />;

  // Fashion
  if (/fashion|clothing|apparel|shirt|dress|wear/.test(name))
    return <MdCheckroom />;

  // Sports
  if (/sport|fitness|gym/.test(name))
    return <MdSportsSoccer />;

  // Books and stationery
  if (/book|stationery|pen|paper/.test(name))
    return <MdMenuBook />;

  // Gardening and organic products
  if (/garden|plant|organic/.test(name))
    return <FaSeedling />;

  // Default
  return <MdCategory />;
};

const MobileCategoryNavbar = () => {
  const { products, loading, error } = useProducts();

  const productList = Array.isArray(products)
    ? products
    : products?.products || [];

  const categories = productList.filter(
    (product, index, array) =>
      product.category &&
      index === array.findIndex(
        item => item.category === product.category
      )
  );

  if (loading) {
    return <div className="category-scroller">Loading...</div>;
  }

  if (error) {
    return <div className="category-scroller">{error}</div>;
  }

  return (
    <div className="category-scroller">

      <Link to="/" className="category-item">
        <div className="category-icon">
          <MdShoppingBasket />
        </div>
        <span>All</span>
      </Link>

      {categories.slice(1,10).map((category) => (
        <Link
          key={category._id || category.id || category.category}
          to={`/category/${encodeURIComponent(category.category)}`}
          className="category-item"
        >
          <div className="category-icon">
            {getCategoryIcon(category.category)}
          </div>

<span>{category.category?.split(" ")[0]}</span>        </Link>
      ))}

    </div>
  );
};

export default MobileCategoryNavbar;
