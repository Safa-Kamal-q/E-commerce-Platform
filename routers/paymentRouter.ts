// import { Router } from 'express';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_KEY as string, {
//     apiVersion: '2023-08-16',
//     typescript: true,
// });

// export default function users() {
//     const router = Router();

//     router
//         .get('/', (req, res, next) => {
//             res.json({
//                 id: 1,
//                 firstname: 'Matt',
//                 lastname: 'Morgan',
//             });
//         })
//         .post('/customer', async (req, res, next) => {
//             const model = req.body;

//             try {
//                 const p = await stripe.customers.create({
//                     email: model.email,
//                     name: `${model.firstname} ${model.lastname}`,
//                     metadata: {
//                         firstname: model.firstname,
//                         lastname: model.lastname,
//                     },
//                 });

//                 res.send({
//                     success: true,
//                     customer: p.id,
//                 });
//             } catch(e) {
//                 res.status(500).send({ success: false, error: (<Error>e)?.message });
//             }
//         })
//         .post('/setupintent', async (req, res, next) => {
//             const model = req.body;
//             const options: Stripe.SetupIntentCreateParams = {
//                 automatic_payment_methods: {
//                     enabled: true,
//                 },
//             };

//             if (!!model.customer) {
//                 options.customer = model.customer;
//             }

//             try {
//                 const s = await stripe.setupIntents.create(options);

//                 res.send({
//                     success: true,
//                     clientSecret: s?.client_secret,
//                 });
//             } catch(e) {
//                 res.status(500).send({ success: false, error: (<Error>e)?.message });
//             }
//         })
//         .post('/finishsetup', async (req, res, next) => {
//             const model = req.body;

//             try {
//                 if (!model.setupintent) {
//                     throw new Error('Setup intent not found');
//                 }

//                 const si = await stripe.setupIntents.retrieve(model.setupintent);

//                 if (!si?.payment_method) {
//                     throw new Error('Payment method not found');
//                 }

//                 // attach
//                 // if (!si.customer) {
//                 //     await stripe.paymentMethods.attach(<string>si.payment_method, {
//                 //         customer: user.stripeid,
//                 //     })
//                 // } else {

//                 // }

//                 // await stripe.customers.update(<string>si.customer, {
//                 //     invoice_settings: {
//                 //         default_payment_method: <string>si.payment_method,
//                 //     },
//                 // });

//                 res.send({
//                     success: true,
//                 });
//             } catch(e) {
//                 res.status(500).send({ success: false, error: (<Error>e)?.message });
//             }
//         })
//         .post('/paymentintent', async (req, res, next) => {
//             const model = req.body;

//             try {
//                 const p = await stripe.paymentIntents.create({
//                     amount: model.amount,
//                     currency: model.currency || 'USD',
//                     automatic_payment_methods: {
//                         enabled: true,
//                     },
//                 });

//                 res.send({
//                     success: true,
//                     clientSecret: p?.client_secret,
//                 });
//             } catch(e) {
//                 res.status(500).send({ success: false, error: (<Error>e)?.message });
//             }
//         });

//     return router;
// }