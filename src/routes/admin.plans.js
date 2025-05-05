const express = require('express');
const router = express.Router();
const {isLoggedIn, isAdmin} = require('../lib/auth');
const { readAdminSidebar, readRoutes } = require('../lib/helpers');
const {createSubscription, createPlan} = require('../lib/stripe.plans');
const {createSession} = require('../lib/payment.controller');
const {getTypeSubscriptions, getIDStripeSubscriptions, getAllPlans} = require('../lib/admin.functions');

CURRENT_TAB = "Planes";

router.get('/', isLoggedIn, isAdmin, async (req, res) => {
    let adminSidebar = readAdminSidebar('./admin-sidebar.json', CURRENT_TAB);
    const typeSubscriptions = await getTypeSubscriptions();
    const plans = await getAllPlans();
    console.log(plans)
    res.render('links/admin-plans', {adminNav: true, adminSidebar, typeSubscriptions, plans});
});

router.get('/add-plan/:id_plan', isLoggedIn, isAdmin, async (req, res) => {
    //const sub_response = await createSubscription("Virtual", 2);
    //const price_response = await createPrice(sub_response.id, 2000, 3);

    //res.send(await createSession(req.user.id_stripe, price_response.id));
    const id_plan = req.params.id_plan;
    let adminSidebar = readAdminSidebar('./admin-sidebar.json', CURRENT_TAB);
    res.render("links/admin-plans_add-plan", {adminNav: true, adminSidebar, id_plan, })
});

router.post('/add-plan', isLoggedIn, isAdmin, async (req, res) => {
    const body = req.body;
    const stripe_id = await getIDStripeSubscriptions(body.type_plan);
    await createPlan(stripe_id[0].id_product, body.price, body.duration, body.description, body.type_plan)
    res.redirect('/admin-plans');
});


router.post('/add-subscription/', async (req, res) => {
    const {name_subscription} = req.body;
    await createSubscription(name_subscription);
    res.redirect('/admin-plans');
});

module.exports = router;