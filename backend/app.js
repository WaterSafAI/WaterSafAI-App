const express = require('express');
const morgan = require('morgan');
const haversine = require('haversine-distance');
const { db, auth } = require('./firebase');

// TODO: Put this in constants.js and import it here 
const analysisLookup = {
    "Total Coliform Bacteria": {
        units: "#/100ml",
        description: "Indicator of microbial contamination in water."
    },
    "Nitrate-Nitrogen": {
        units: "mg/l",
        description: "High levels can cause health issues, especially in infants."
    },
    "pH": {
        units: "units",
        description: "Measures acidity/alkalinity of water. Ideal range is 6.5-8.5."
    },
    "Iron": {
        units: "mg/l",
        description: "High levels can cause taste and staining issues."
    },
    "Hardness as CaCo3": {
        units: "mg/l",
        description: "Causes scale buildup in pipes and poor soap/detergent performance."
    },
    "Sulfate Sulfur": {
        units: "mg/l",
        description: "High levels can cause taste and odor issues."
    },
    "Chlorine": {
        units: "mg/l",
        description: "Used for disinfection, but high levels can cause taste and odor issues."
    },
    "Specific Conductance": {
        units: "umhos/cc",
        description: "Measures water’s ability to conduct electricity, often linked to total dissolved solids."
    }
    // Add other analysis types here as necessary.
};


// Init express
const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Token authentication middleware
app.use(async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.uid = decodedToken.uid;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
    }
});

// Home
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// TODO: Abstract all firebase operations to a separate module

////////////////////
// User endpoints //
////////////////////


////////////
// Create //
////////////

// This is currently handled on the frontend


//////////
// Read //
//////////

/**
 * @route GET /users
 * @description Retrieves a list of all users from the Firestore database.
 * @access Public
 * @returns {Object[]} users - An array of user objects.
 * @returns {string} users[].id - The unique identifier of the user.
 * @returns {Object} users[].data - The data associated with the user.
 * @throws {500} - If an error occurs during fetching data from Firestore.
 */
app.get('/users', async (req, res) => {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(users);
    } catch (error) {
        console.error('Error fetching users: ', error);
        res.status(500).send('Error fetching users');
    }
});

/**
 * @route GET /users/:id
 * @description Retrieves a user from the Firestore database by their unique ID.
 * @access Public
 * @param {string} id - The unique identifier of the user, obtained from the URL parameter.
 * @returns {Object} user - The retrieved user object.
 * @returns {string} user.id - The unique identifier of the user.
 * @returns {Object} user.data - The data associated with the user.
 * @throws {404} - If no user is found with the given ID.
 * @throws {500} - If an error occurs during fetching the user from Firestore.
 */
app.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userRef = db.doc(`users/${userId}`);
        const docSnapshot = await userRef.get();

        if (docSnapshot.exists) {
            const userData = { id: docSnapshot.id, ...docSnapshot.data() };
            res.json(userData);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
});


////////////
// Update //
////////////

/**
 * @route PATCH /users/:id
 * @description Updates the specified fields of a user in the Firestore database.
 * @access Public
 * @param {string} id - The unique identifier of the user, obtained from the URL parameter.
 * @body {Object} data - Partial data object containing the fields to be updated.
 * @returns {204} - Successfully updated the user data.
 * @throws {404} - If no user is found with the given ID.
 * @throws {500} - If an error occurs during the update operation.
 */
app.patch('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const userRef = db.doc(`users/${userId}`);

        await userRef.update(userData);

        res.status(204).send();
    } catch (error) {
        console.error(`Error updating user ${userId}: ${error}`);

        // Check if the error is related to the user not being found
        if (error.code === 'not-found') {
            res.status(404).send('User not found');
        } else {
            res.status(500).send('Error updating user');
        }
    }
});


////////////
// Delete //
////////////

/**
 * @route DELETE /users/:id
 * @description Deletes a user from the Firestore database by their unique ID.
 * @access Public
 * @param {string} id - The unique identifier of the user, obtained from the URL parameter.
 * @returns {200} - Successfully deleted the user.
 * @throws {404} - If no user is found with the given ID.
 * @throws {500} - If an error occurs during the deletion operation.
 */
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userRef = db.doc(`users/${userId}`);

        await userRef.delete();

        res.status(200).send('User successfully deleted');
    } catch (error) {
        console.error("Error deleting user:", error);

        // Check if the error is related to the user not being found
        if (error.code === 'not-found') {
            res.status(404).send('User not found');
        } else {
            res.status(500).send('Error deleting user');
        }
    }
});


/////////////////////////////////
// User test results endpoints //
/////////////////////////////////

async function getUserInfo(userId) {
    const userDoc = await db.doc(`users/${userId}`).get();
    if (!userDoc.exists) {
        throw new Error('User not found');
    }
    return userDoc.data();
}


////////////
// Create //
////////////

/**
 * @route POST /results
 * @description Adds a test result document to a subcollection under a user's document in Firestore.
 * @access Public or Private (depending on your requirements)
 * @body {Object} payload - The test results to be stored.
 * @body {string} payload.result1 - Description of result1.
 * @body {string} payload.result2 - Description of result2.
 * @body {string} payload.result3 - Description of result3.
 * @returns {Object} The newly added test result document along with a success message.
 * @throws {500} If an error occurs during the database operation.
 */
app.post('/results/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const payload = req.body;

        // Get the user's company name from the database (and location TODO!!)
        const userInfo = await getUserInfo(userId);

        // Transform the results payload into the required data array structure
        let data = Object.entries(payload.results).map(([analysis, result]) => ({
            analysis: analysis,
            result: result.toString(),
            units: analysisLookup[analysis].units,
            description: analysisLookup[analysis].description,
        }));

        // TODO: get the user's location from the database and use for city, county, state or store that in DB

        // Construct the document to be added to the database
        const document = {
            companyName: userInfo.companyName,
            city: 'Orlando', // Assuming these are constant
            county: 'Orange County', // Assuming these are constant
            state: 'FL', // Assuming these are constant
            testDate: payload.testDate,
            data: data
        };

        // Add the document to the 'results' collection in the database
        const resultsRef = db.collection('results');
        const result = await resultsRef.add(document);

        // Respond with the added document's ID and other info
        res.status(201).json({
            id: result.id,
            ...document,
            message: 'Test result added successfully.',
        });
    } catch (error) {
        console.error('Error saving test results: ', error);
        res.status(500).send('Error saving test results');
    }
});


//////////
// PFAS //
//////////

app.get('/pfas', async (req, res) => {
    try {
        const pfasRef = db.collection('pfas');
        const snapshot = await pfasRef.get();
        const pfas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(pfas);
    } catch (error) {
        console.error('Error fetching pfas: ', error);
        res.status(500).send('Error fetching pfas');
    }
});

////////////////
// Violations //
////////////////

app.get('/violations', async (req, res) => {
    try {
        const violationsRef = db.collection('violations');
        const snapshot = await violationsRef.get();
        const violations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(violations);
    } catch (error) {
        console.error('Error fetching violations: ', error);
        res.status(500).send('Error fetching violations');
    }
});

/////////////
// Results //
/////////////
app.get('/results', async (req, res) => {
    try {
        const resultsRef = db.collection('results');
        const snapshot = await resultsRef.get();
        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(results);
    } catch (error) {
        console.error('Error fetching results: ', error);
        res.status(500).send('Error fetching results');
    }
});

/////////////
// Samples //
/////////////
app.get('/samples', async (req, res) => {
    try {
        const lat = parseFloat(req.query.lat);
        const long = parseFloat(req.query.long);
        const radius = 10; // miles
        const samplesRef = db.collection('samples');
        const snapshot = await samplesRef.get();
        
        // Haversine formula expects a point object {latitude, longitude}
        const inputPoint = { latitude: lat, longitude: long };

        let samplesWithinRadius = [];
        let chemicalSums = {
            Chloramines: 0,
            Conductivity: 0,
            Hardness: 0,
            Organic_carbon: 0,
            Potability: 0,
            Solids: 0,
            Sulfate: 0,
            Trihalomethanes: 0,
            Turbidity: 0,
            pH: 0,
        };
        let chemicalCounts = {
            Chloramines: 0,
            Conductivity: 0,
            Hardness: 0,
            Organic_carbon: 0,
            Potability: 0,
            Solids: 0,
            Sulfate: 0,
            Trihalomethanes: 0,
            Turbidity: 0,
            pH: 0,
        };

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const samplePoint = { latitude: data.latitude, longitude: data.longitude };
            const distanceInMeters = haversine(inputPoint, samplePoint);
            const distanceInMiles = distanceInMeters / 1609.34; // Convert meters to miles

            if (distanceInMiles <= radius) {
                samplesWithinRadius.push(data);
                // Sum up the chemicals
                Object.keys(chemicalSums).forEach(key => {
                    if (data[key] !== undefined) {
                        chemicalSums[key] += data[key];
                        chemicalCounts[key] += 1;
                    }
                });
            }
        });

        // Calculate averages
        let averages = {};
        Object.keys(chemicalSums).forEach(key => {
            averages[key] = chemicalCounts[key] > 0 ? chemicalSums[key] / chemicalCounts[key] : null;
        });

        res.json({ averages });
    } catch (error) {
        console.error('Error fetching samples: ', error);
        res.status(500).send('Error fetching samples');
    }
});

///////////////
// Solutions //
///////////////
app.get('/solutions', async (req, res) => {
    try {
        const solutionsRef = db.collection('solutions');
        const snapshot = await solutionsRef.get();
        const solutions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(solutions);
    } catch (error) {
        console.error('Error fetching solutions: ', error);
        res.status(500).send('Error fetching solutions');
    }
});

app.post('/solutions', async (req, res) => {
    try {
        const payload = req.body;
        const solutionsRef = db.collection('solutions');
        const result = await solutionsRef.add(payload);
        res.status(201).json({
            id: result.id,
            ...payload,
            message: 'Solution added successfully.',
        });
    } catch (error) {
        console.error('Error saving solution: ', error);
        res.status(500).send('Error saving solution');
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
