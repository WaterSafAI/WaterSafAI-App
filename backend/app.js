const express = require('express');
const morgan = require('morgan');
const { db, auth } = require('./firebase');

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

////////////
// Create //
////////////

/**
 * @route POST /results/:id
 * @description Adds a test result document to a subcollection under a user's document in Firestore.
 * @access Public or Private (depending on your requirements)
 * @param {string} id - The unique identifier of the user, obtained from the URL parameter.
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

        // Reference to the user's document
        const userRef = db.collection('users').doc(userId);

        // Reference to the 'testResults' subcollection in the user's document
        const resultsRef = userRef.collection('testResults');

        // Add the payload as a new document in the 'testResults' subcollection
        const result = await resultsRef.add(payload);

        res.status(201).json({
            id: result.id,
            ...payload,
            message: 'Test result added successfully.',
        });
    } catch (error) {
        console.error('Error saving test results: ', error);
        res.status(500).send('Error saving test results');
    }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
