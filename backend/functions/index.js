/**
 * Firebase cloud functions
 */

import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
import * as geofire from "geofire-common";

const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

// Listens for new test results added to /messages/:documentId
// and saves a geohash of that location's coordinates
// to /messages/:documentId/geohash
exports.addGeoHash = onDocumentCreated("/testResults/{documentId}", (event) => {
    // Grab the current value of what was written to Firestore.
    const latitude = event.data.data().lat;
    const longitude = event.data.data().lng;

    // Access the parameter `{documentId}` with `event.params`
    logger.log("Generating GeoHash for testResult coordinates", event.params.documentId, `(${latitude}, ${longitude})`);

    const geohash = geofire.geohashForLocation([latitude, longitude]);

    return event.data.ref.set({geohash}, {merge: true});
});

/**
 * @Description returns closest test results to provided location
 * @param {Object} request - firebase function request containing auth and data
 * @body {Object} data - object containing location coordinates
 * @body {float} data.lat
 * @body {float} data.lng
 * @return {Object[]} array of 10 closest test results
* */
exports.findNearbyResults = onCall(async (request) => {

    const lat = request.data.lat;
    const long = request.data.lng;

    const center = [lat, long];
    const radiusInM = 10 * 1000; // sets a 10km search radius

    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b in bounds) {
        const query = getFirestore()
            .collection("testResults")
            .orderBy('geohash')
            .startAt(b[0])
            .endAt(b[1]);

        promises.push(query.get());
    }

    const snapshots = await Promise.all(promises);

    const matchingDocs = [];
    for (const snap of snapshots) {
        for (const doc of snap.docs) {
            const lat = doc.get('lat');
            const lng = doc.get('lng');

            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
                matchingDocs.push({
                    document: doc,
                    distance: distanceInM
                });
            }
        }
    }

    // sort documents based on distance
    matchingDocs.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
    // return the 10 closest results
    const closest = matchingDocs.slice(0, 10);

    return closest;
})