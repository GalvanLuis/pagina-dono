const {STRIPE_PRIVATE_KEY, STRIPE_KEY, STRIPE_IV, PHONE_KEY, PHONE_IV, EMAIL_KEY, EMAIL_IV} = require('../config')
const stripe = require('stripe')(STRIPE_PRIVATE_KEY);
const pool = require('../database/database');


const createSubscription = async (sub_name) => {
    const product = await stripe.products.create({
        name: sub_name,
        type: 'service',
    });
    await pool.query("INSERT INTO idTipoSuscripcion (id_product, nombre_suscripcion) VALUES (?, ?);", [product.id, sub_name]);
    return product;
};


const createPlan = async (id_product, price, duration, description, id_sub) => {   
    const prices = await stripe.prices.create({
        product: id_product,
        unit_amount: price, // Precio en centavos (ejemplo: 1000 = $10.00)
        currency: 'mxn',
        recurring: { interval: 'month', interval_count: duration },
        nickname: description
    });
     
    await pool.query("INSERT INTO Planes (id_precio, id_tipo_suscripcion, duracion_suscripcion, descripcion) VALUES (?, ?, ?, ?);", [prices.id, id_sub, duration, description]);
    return prices;
};

module.exports = {
    createSubscription,
    createPlan,
};