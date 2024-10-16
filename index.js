// // in the comparising to the node js . express help the server to run the code easliy and understand the code easily .
// // express js is the package avaiable by the help of that package we can write the server code which arre related to the http.
// // rounting means the url like  /   /   / 
// // npm means the package manager in the node js . people can install whatever the package they want installed in the node modules 

// // const express = require("express");
// // const app = express ();

// // // middleware  is the function  which always run first tthen the route will run . and the code written in the middleware excute the first .
// // // in the req there i the data of a person who try to run the server 
// //  // the respond which the server give to the user that is sored in the res . 
// //  // next when you have to move on to the next one in middleware 

// // app.use (function(req, res, next ) {
// // console.log("middleware working ")
// // next();
// // });

// // // rountig / / 
// // app.get("/", function(req , res) {
// //    res.send("hello world ");
// // });


// // app.get("/profile", function(req , res) {
// //    res.send("hello from profile  ");
// // });





// //  // dyamic routing  meas such route which one part  again and again same some part are changed  for eg facebook/ profile / saman , facebook/profile/sworup  for that you can make a dynamic route 
// //  app.get("/profile/:username ", function(req , res) {
// //    res.send("hello from profile  ");
// // });

// // app.listen(3000);


// const express = require("express");
// const app = express();
// app.use(express.json());

// let students = [];
// let currentId = 1;

// app.use(function (req, res, next) {
//     console.log("working");
//     next();
// });

// app.get("/students", function (req, res) {
//     res.send(students);
// });

// app.post("/students", (req, res) => {
//     const { firstName, lastName, rollNumber } = req.body;
//     const newStudent = {
//         id: currentId++,
//         firstName,
//         lastName,
//         rollNumber,
//     };
//     students.push(newStudent);
//     res.json(newStudent);
// });

// app.get("/students/:id", function (req, res) {
//     const studentId = parseInt(req.params.id);
//     const student = students.find(s => s.id === studentId);
//     if (!student) {
//         return res.status(404).json({ message: 'Student not found' });
//     }
//     res.json(student);
// });

// app.put("/students/:id", (req, res) => {
//     const studentId = parseInt(req.params.id);
//     const studentIndex = students.findIndex(s => s.id === studentId);
//     if (studentIndex === -1) {
//         return res.status(404).json({ message: 'Student not found' });
//     }
//     const { firstName, lastName, rollNumber } = req.body;
//     students[studentIndex] = { id: studentId, firstName, lastName, rollNumber };
//     res.json(students[studentIndex]);
// });

// app.delete("/students/:id", (req, res) => {
//     const studentId = parseInt(req.params.id);
//     const studentIndex = students.findIndex(s => s.id === studentId);
//     if (studentIndex === -1) {
//         return res.status(404).json({ message: 'Student not found' });
//     }
//     students.splice(studentIndex, 1);
//     res.json({ message: 'Student deleted successfully' });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());

let cart = [];

const createPackages = (cart) => {
    let packages = [];
    let currentPackage = [];
    let currentWeight = 0;

    cart.forEach((product) => {
        let productWeight = product.weight * product.quantity;

        if (currentWeight + productWeight <= 100000) {
            currentPackage.push(product);
            currentWeight += productWeight;
        } else {
            packages.push(currentPackage);
            currentPackage = [product];
            currentWeight = productWeight;
        }
    });

    if (currentPackage.length) {
        packages.push(currentPackage);
    }

    return packages;
};

router.post('/add-to-cart', (req, res) => {
    const { productName, weight, quantity, price } = req.body;

    if (!productName || !weight || !quantity || !price) {
        return res.status(400).json({ message: 'Missing product details' });
    }

    cart.push({ productName, weight, quantity, price });
    return res.status(200).json({ message: 'Product added to cart', cart });
});

router.get('/cart', (req, res) => {
    return res.status(200).json(cart);
});

router.get('/create-packages', (req, res) => {
    const packages = createPackages(cart);
    return res.status(200).json({ message: 'Packages created', packages });
});

router.post('/clear-cart', (req, res) => {
    cart = [];
    return res.status(200).json({ message: 'Cart cleared' });
});

app.use('/cart', router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
