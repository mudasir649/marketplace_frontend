const addInvertedComma = (price: Number) => {
    let priceString = price.toLocaleString();

    priceString = priceString.replace(',', "'");

    return priceString;

}

export default addInvertedComma;