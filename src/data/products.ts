// Page 3 content. Replace each {{placeholder}} when you share the product details.
// Add `image: "/products/name.jpg"` to a product to replace the 3D can with a photo.
export type Product = {
  id: string;
  name: string;
  brand: string;
  tone: "navy" | "aqua" | "white" | "deep";
  image?: string;
  how: string;
  where: string;
  usage: string;
};

export const products: Product[] = [
  {
    id: "product-1",
    name: "{{Product 1 name}}",
    brand: "{{Brand}}",
    tone: "navy",
    how: "{{How this product works and how it is applied, step by step}}",
    where: "{{Where it can be used, for example terrace, bathroom, tank}}",
    usage: "{{Coverage, coats, curing time and expected life}}",
  },
  {
    id: "product-2",
    name: "{{Product 2 name}}",
    brand: "{{Brand}}",
    tone: "aqua",
    how: "{{How this product works and how it is applied, step by step}}",
    where: "{{Where it can be used}}",
    usage: "{{Coverage, coats, curing time and expected life}}",
  },
  {
    id: "product-3",
    name: "{{Product 3 name}}",
    brand: "{{Brand}}",
    tone: "white",
    how: "{{How this product works and how it is applied, step by step}}",
    where: "{{Where it can be used}}",
    usage: "{{Coverage, coats, curing time and expected life}}",
  },
  {
    id: "product-4",
    name: "{{Product 4 name}}",
    brand: "{{Brand}}",
    tone: "deep",
    how: "{{How this product works and how it is applied, step by step}}",
    where: "{{Where it can be used}}",
    usage: "{{Coverage, coats, curing time and expected life}}",
  },
];
