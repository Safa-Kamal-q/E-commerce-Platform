import { SellerProfile } from '../../db/entities/SellerProfile.js';
const validateProduct = async (req, res, next) => {
    const errorList = [];
    const values = ["title", "description", "price", "quantity", "image", "sellerProfile"];
    const product = req.body;
    values.forEach(key => {
        if (!product[key]) {
            errorList.push(`${key} is require`);
        }
    });
    const existingSellerProfile = await SellerProfile.findOne({
        where: { id: product.sellerProfile },
    });
    if (product.sellerProfile && !existingSellerProfile) {
        errorList.push(`The entered seller profile id doesn't exist`);
    }
    if (errorList.length > 0) {
        res.status(400).send(errorList);
    }
    else {
        next();
    }
};
export { validateProduct };
//# sourceMappingURL=product.js.map