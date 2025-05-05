const {STRIPE_PRIVATE_KEY, STRIPE_KEY, STRIPE_IV} = require('../config')
const stripe = require('stripe')(STRIPE_PRIVATE_KEY);
const {decryptData} = require("../lib/helpers");
const {getIdSripe} = require("../lib/user.functions");


// const createSession = async (req, res) => {
  // try {
  //     const session = await stripe.checkout.sessions.create({
  //       payment_method_types: ['card'],
  //       line_items: [
  //         {
  //           price: 'price_1NOlYNC1Ls1T41Oo56xQnGB9', // ID del precio de tu suscripción
  //           quantity: 1,
  //         },
  //       ],
  //       mode: 'subscription',
  //       success_url: 'http://localhost:4000/succes',
  //       cancel_url: 'http://localhost:4000/plans',
  //       customer: decryptData(STRIPE_KEY, STRIPE_IV, await getIdSripe(req.user.id_usuario))
  //     });
  //     return res.json(session);
  // } catch (error) {
  //     console.error('Error al crear la sesión de pago:', error);
  // }
const createSession = async (id_stripe, id_price) =>{
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: id_price, // ID del precio de tu suscripción
            quantity: 1,
          },
        ],
        success_url: 'http://localhost:4000/succes',
        cancel_url: 'http://localhost:4000/plans',
        customer: id_stripe
      });
      return session;
  } catch (error) {
      console.error('Error al crear la sesión de pago:', error);
  }
};

module.exports = {createSession}