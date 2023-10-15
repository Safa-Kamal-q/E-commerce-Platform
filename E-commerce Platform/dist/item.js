// interface FashionItem {
//     id: number;
//     name: string;
//     price: number;
//     imgurl: string;
//   }
export {};
//   interface FashionCategory {
//     [category: string]: FashionItem[];
//   }
//   interface ECommerceItems {
//     "Men's Fashion"?: FashionCategory;
//     "Women's Fashion"?: FashionCategory;
//     "Kids' Fashion"?: FashionCategory;
//   }
//   // Example data based on your JSON structure
//   const items: ECommerceItems = {
//     "Men's Fashion": {
//       "Men's Clothing": [
//         {
//           id: 1,
//           name: "Clothing Item 1",
//           price: 29.99,
//           imgurl: "image1.jpg",
//         },
//         {
//           id: 2,
//           name: "Clothing Item 2",
//           price: 39.99,
//           imgurl: "image2.jpg",
//         },
//         // Add more clothing items here
//       ],
//       "Men's Shoes": [
//         {
//           id: 1,
//           name: "Shoes Item 1",
//           price: 49.99,
//           imgurl: "image3.jpg",
//         },
//         {
//           id: 2,
//           name: "Shoes Item 2",
//           price: 59.99,
//           imgurl: "image4.jpg",
//         },
//         // Add more shoe items here
//       ],
//       // Add more categories as needed
//     },
//     "Women's Fashion": {
//       // Add women's fashion categories here
//     },
//     "Kids' Fashion": {
//       // Add kids' fashion categories here
//     },
//   };
//   // You can use 'items' to work with your e-commerce item data.
//   // Example usage:
//   // Accessing Men's Clothing items
//   const menClothingItems = items["Men's Fashion"]["Men's Clothing"];
//   console.log(menClothingItems);
//   // Accessing the name of the first Men's Clothing item
//   const firstMenClothingItemName = menClothingItems[0].name;
//   console.log("Name of the first Men's Clothing item: " + firstMenClothingItemName);
//# sourceMappingURL=item.js.map