// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { onRequest } = require("firebase-functions/v2/https");
const CryptoJS = require("crypto-js");
const axios = require('axios');
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const serviceAccount = require('../deoappcom-firebase-adminsdk-6yxfx-572219be77.json')



initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// exports.createredirectpaymentipaymu = onRequest(async (req, res) => {
//     let { product, qty, price, amount, returnUrl, notifyUrl, referenceId, buyerName, buyerPhone, buyerEmail, target, is_production, va, apikey } = req.body;
//     const db = getFirestore();


//     // let apikey; // development mode
//     // let va;
//     let url = 'https://my.ipaymu.com/api/v2/payment'; // production mode
//     if (target === "development") {
//         url = 'https://sandbox.ipaymu.com/api/v2/payment';
//     }

//     const body = {
//         "product": product, //array of strings
//         "qty": qty, //array of strings
//         "price": price, //array of strings
//         "amount": amount,
//         "returnUrl": returnUrl, //your thank you page url
//         "cancelUrl": "https://your-website.com/cancel-page", // your cancel page url
//         "notifyUrl": notifyUrl, // your callback url
//         "referenceId": referenceId, // your reference id or transaction id
//         "buyerName": buyerName, // optional
//         "buyerPhone": buyerPhone, // optional
//         "buyerEmail": buyerEmail, // optional
//     };


//     // generate signature
//     const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
//     const stringtosign = "POST:" + va + ":" + bodyEncrypt + ":" + apikey;
//     // console.log(stringtosign, "stringtosign")
//     const signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, apikey));


//     // request
//     const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url,
//         headers: {
//             'Content-Type': 'application/json',
//             'signature': signature,
//             'va': va,
//             'timestamp': Date.now()
//         },
//         data: body
//     };


//     const dataToFirestore = {
//         config,
//         referenceId,
//         createdAt: Date.now(),
//         ...body,
//     };
//     // return res.send(req.body)

//     axios(config)
//         .then((response) => {
//             //insert response API to dataToFirestore
//             dataToFirestore.response = response.data;


//             //save to PAYMENTS collection firestore
//             // db.collection('payments').doc(referenceId).set(dataToFirestore)
//             //     .then(() => console.log("set doc succrss"))
//             //     .catch((error) => console.log(error, "error adding document"))

//             //send API response
//             res.send(response.data);
//         })
//         .catch((error) => {
//             console.log(error)
//             res.send(error?.response?.data)
//         });
// });

// exports.callbacknotifipaymu = onRequest(async (req, res) => {
//     const bodyExample = {
//         "trx_id": 105839,
//         "sid": "c1405c49-3cca-4de7-8b32-f2d124c85086",
//         "total": "200000",
//         "fee": "1400",
//         "status_code": "1",
//         "status": "berhasil",
//         "via": "qris",
//         "channel": "QRIS",
//         "reference_id": "biawak12310983091"
//     };


//     const paymentDoc = await db.collection('payments').doc(referenceId).get();
//     console.log(paymentDoc, "ini paymentdoc anjing")


//     if (req.body.status === "berhasil") {
//         try {
//             const dataEmail = {
//                 platform_name: "DBrand",
//                 sender_email: paymentDoc?.target === "ticket" ?
//                     "indonesiaspicingtheworld5@gmail.com" :
//                     paymentDoc?.target === "book" ?
//                         "bisabikinbrand1@gmail.com" :
//                         paymentDoc?.target === "book" ?
//                             "bisabikinbrand1@gmail.com" : "",
//                 recipient_email: paymentDoc?.buyerEmail,
//                 recipient_name: paymentDoc?.buyerName,
//                 cc: ['reinhart@importir.co', "indonesiaspicingtheworld5@gmail.com", "bisabikinbrand1@gmail.com"],
//                 subject: paymentDoc?.target === "ticket" ?
//                     "Konfirmasi Pembayaran Indonesia Spicing The World" :
//                     paymentDoc?.target === "book" ?
//                         "Konfirmasi Pembayaran Bisa Bikin Brand 1" :
//                         paymentDoc?.target === "book" ?
//                             "Konfirmasi Pembayaran Course Bisa Bikin Brand" : "",
//                 title: "INVOICE",
//                 message: `<p>Hallo ${paymentDoc?.buyerName}</p><p> / ${paymentDoc?.buyerEmail}</p>
//                 <p> Anda telah melakukan pendaftaran ${paymentDoc?.product},</p><p> 
//                 berikut informasi Anda: ${paymentDoc?.product}</p><p><br></p><p> 
//                 Data Anda Nama: ${paymentDoc?.buyerName}</p><p> Phone: ${paymentDoc?.buyerPhone}</p>
//                 <p> Email: ${paymentDoc?.buyerEmail}</p><p> Total Bayar: Rp.${paymentDoc?.amount}</p>
//                 <br>
//                 <h2>STATUS : SUKSES</h2>
//                 <br>
//                 `
//             };

//             const res = await axios.post("https://new-third-party.importir.com/api/email/send-message", dataEmail)
//             console.log({ res })



//         } catch (error) {
//             console.log(error.message, "error sending email")
//         };
//     }



//     res.send(req.body);
// });

// exports.singlesignon = onRequest(async (req, res) => {
//     const body = req.body;
//     let va = "1179002120001001";
//     let apikey = "8A34D5B7-F3AE-42DC-9FFC-7BC0BBD121E2";
//     const url = "https://my.ipaymu.com/api/v2/register"


//     const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
//     const stringtosign = "POST:" + va + ":" + bodyEncrypt + ":" + apikey;
//     console.log(stringtosign, "stringtosign")
//     const signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, apikey));

//     // request
//     const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url,
//         headers: {
//             'Content-Type': 'application/json',
//             'signature': signature,
//             'va': va,
//             'timestamp': Date.now()
//         },
//         data: body
//     };

//     try {
//         const result = await axios(config);
//         if (result !== undefined) {
//             return res.status(200).json({
//                 status: true,
//                 message: result.data
//             })
//         }
//     } catch (error) {
//         console.log(error.response.data, "error")
//         return res.status(500).json({
//             status: false,
//             message: "An error occurred while making the API request.",
//             error: error?.response?.data
//         });
//     }
// });

// exports.splitpayment = onRequest(async (req, res) => {
//     const body = req.body;
//     let url = "https://sandbox.ipaymu.com/api/v2/transferva";


//     const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
//     const stringtosign = "POST:" + body.va + ":" + bodyEncrypt + ":" + body.apikey;
//     console.log(stringtosign, "stringtosign")
//     const signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, body.apikey));


//     // request
//     const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url,
//         headers: {
//             'Content-Type': 'application/json',
//             'signature': signature,
//             'va': body.va,
//             'timestamp': Date.now()
//         },
//         data: body
//     };

//     try {
//         const result = await axios(config);
//         if (result !== undefined) {
//             console.log(result)
//             return res.status(200).json({
//                 status: true,
//                 message: result.data
//             })
//         }
//     } catch (error) {
//         console.error("API request error:", error);
//         return res.status(500).json({
//             status: false,
//             // error: "An error occurred while making the API request.",
//             message: error
//         });
//     }
// });

exports.getprovinces = onRequest(async (req, res) => {
    const body = req.body;

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: "https://merchant-api-sandbox.shipper.id/v3/location/country/228/provinces",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "jwRkn95M5WaWM3MBSWdE89OEpZwIwDpKUaihZT2tdvSpZglNfXroUEz6jzaKkHDt",
        },
        data: body
    };

    try {
        const result = await axios(config);
        return res.status(200).send({
            status: true,
            data: result?.data?.data
        })
    } catch (error) {
        return res.json({
            status: false,
            error: error
        })
    }

});

exports.getcities = onRequest(async (req, res) => {
    const query = req.query;

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://merchant-api-sandbox.shipper.id/v3/location/province/${query.province_id}/cities`,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "jwRkn95M5WaWM3MBSWdE89OEpZwIwDpKUaihZT2tdvSpZglNfXroUEz6jzaKkHDt",
        }
    };

    try {
        const result = await axios(config);
        return res.status(200).send({
            status: true,
            data: result?.data?.data
        })
    } catch (error) {
        return res.json({
            status: false,
            error: error
        })
    }

});

exports.getsuburbs = onRequest(async (req, res) => {
    const query = req.query;
    console.log(query, "query")
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://merchant-api-sandbox.shipper.id/v3/location/city/${query.city_id}/suburbs`,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "jwRkn95M5WaWM3MBSWdE89OEpZwIwDpKUaihZT2tdvSpZglNfXroUEz6jzaKkHDt",
        }
    };

    try {
        const result = await axios(config);
        return res.status(200).send({
            status: true,
            data: result?.data?.data
        })
    } catch (error) {
        return res.json({
            status: false,
            error: error
        })
    }
});

exports.getareas = onRequest(async (req, res) => {
    const query = req.query;
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://merchant-api-sandbox.shipper.id/v3/location/suburb/${query.suburb_id}/areas`,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "jwRkn95M5WaWM3MBSWdE89OEpZwIwDpKUaihZT2tdvSpZglNfXroUEz6jzaKkHDt",
        }
    };

    try {
        const result = await axios(config);
        return res.status(200).send({
            status: true,
            data: result?.data?.data
        })
    } catch (error) {
        return res.json({
            status: false,
            error: error
        })
    }

});

exports.pricing = onRequest(async (req, res) => {
    const body = req.body;
    const query = req.query;
    // const url = `https://merchant-api-sandbox.shipper.id/v3/pricing/domestic/${query.rate_type}`;
    const url = `https://merchant-api-sandbox.shipper.id/v3/pricing/domestic`;


    const payload = {
        cod: body.cod,
        destination: body.destination,
        for_order: body.for_order,
        height: body.height,
        item_value: body.item_value,
        length: body.length,
        limit: body.limit,
        origin: body.origin,
        page: body.page,
        sort_by: body.sort_by,
        weight: body.weight,
        width: body.width
    };

    const config = {
        maxBodyLength: Infinity,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "jwRkn95M5WaWM3MBSWdE89OEpZwIwDpKUaihZT2tdvSpZglNfXroUEz6jzaKkHDt",
        },
        // data: payload
    };

    try {
        const result = await axios.post(url, payload, config);
        console.log(result)
        return res.status(200).send({
            status: true,
            data: result?.data?.data
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: false,
            error: error
        })
    }
});

exports.order = onRequest(async (req, res) => {
    const url = `https://merchant-api-sandbox.shipper.id/v3/order`;
    const body = req.body;

    const payload = {
        consignee: body.consignee,
        consigner: body.consigner,
        courier: body.courier,
        coverage: body.coverage,
        destination: body.destination,
        external_id: body.external_id,
        origin: body.origin,
        package: body.package,
        payment_type: body.payment_type
    };
    console.log(payload)
    // return res.send(payload)

    const config = {
        // method: 'post',
        // url: url,
        maxBodyLength: Infinity,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "jwRkn95M5WaWM3MBSWdE89OEpZwIwDpKUaihZT2tdvSpZglNfXroUEz6jzaKkHDt",
        },
        // data: payload
    };


    try {
        const result = await axios.post(url, payload, config);
        console.log(result);
        return res.status(200).send({
            status: true,
            data: result?.data?.data
        })

    } catch (error) {
        // console.log(error)
        return res.json({
            status: false,
            error: error,
            // message: error.message,
            // name: error.name,
            // code: error.code
        })
    }

});



