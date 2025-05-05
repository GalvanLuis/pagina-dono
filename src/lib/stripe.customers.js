const {STRIPE_PRIVATE_KEY, STRIPE_KEY, STRIPE_IV, PHONE_KEY, PHONE_IV, EMAIL_KEY, EMAIL_IV} = require('../config')
const stripe = require('stripe')(STRIPE_PRIVATE_KEY);

const createCustomer = async (stripe_data) => {
    return await stripe.customers.create(stripe_data);
};

const updateCustomer = async (id_stripe, stripe_data) =>{
    return await stripe.customers.update(id_stripe, stripe_data);
};

const deleteCustomer = async (id_stripe) => {
    return await stripe.customers.del(id_stripe);
};

module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer
}