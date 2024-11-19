export const cartAdapter = (product) => {
    return {
      id: product.id,
      title: product.title,
      images: product.images,
      price: product.price,
      quantity: 1
    };
  };