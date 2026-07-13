const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createTicket = functions.database
.ref('/devices/{deviceId}')
.onUpdate(async (change, context) => {

  const before = change.before.val();
  const after = change.after.val();

  // detect new problem
  if (after.internet === false && before.internet === true) {

    const counterRef = admin.database().ref("ticket_counter");

    const result = await counterRef.transaction(current => (current || 0) + 1);

    const ticketNo = result.snapshot.val();

    await admin.database().ref(`tickets/ticket_${ticketNo}`).set({
      device_id: context.params.deviceId,
      issue: "No Internet",
      status: "OPEN",
      timestamp: Date.now()
    });

    // mark active issue
    await admin.database().ref(`devices/${context.params.deviceId}`).update({
      active_issue: true
    });
  }

});