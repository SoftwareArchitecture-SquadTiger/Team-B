// import { initiateLogin, handleHashResponse, handleUserDataResponse } from './auth.service.js';
// import { createCharity } from './charity.service.js';
// import { createAndEncryptToken } from './token.service.js';
// import { produceRegisterSuccess, produceLoginSuccess } from './events/producer.js';

// let pendingTokenRequests = {}; 
// // For finalizeTokenCreation scenario: correlationId -> { payload, keyMaterial, resolve/reject }

// // Example: handleRegisterRequest
// // msg might look like: { userType: 'charity', data: { name: '...', email: '...', password: '...', tax_code: '...' } }
// // This will trigger a charity creation flow via `createCharity`.
// // After creation, produce a register-success event or handle logic as needed.
// export async function handleRegisterRequest(msg) {
//   const { userType, data } = msg;
//   try {
//     if (userType === 'charity') {
//       // Example: we might have a publicKey for encryption, depends on your architecture
//       const publicKey = data.publicKey; // Or retrieve from your configuration
//       const charity = await createCharity(data, publicKey);
//       // Produce a success event
//       await produceRegisterSuccess({ email: charity.email, userType: 'charity', charityId: charity.charity_id });
//       console.log(`Register request processed for charity: ${charity.email}`);
//     } else {
//       // Handle other user types (donor, admin) similarly
//       // For now, just log error if not implemented
//       console.error(`Registration for userType '${userType}' is not implemented yet.`);
//     }
//   } catch (err) {
//     console.error('Error in handleRegisterRequest:', err);
//     // Produce a register-failed event or handle error scenario
//   }
// }

// // Example: handleLoginRequest
// // msg might look like: { email: '...', password: '...', userType: 'charity' }
// // This initiates the login process, which is async and involves multiple steps (hash-request, hash-response, etc.)
// export async function handleLoginRequest(msg) {
//   const { email, password, userType } = msg;
//   try {
//     // initiateLogin will produce hash-request and rely on hash-response and user-data-response handlers
//     await initiateLogin(email, password, userType);
//     // Actual success event will be produced once the full login flow completes (in handleUserDataResponse)
//   } catch (err) {
//     console.error('Error in handleLoginRequest:', err);
//     // Produce a login-failed event if needed
//   }
// }

// // finalizeTokenCreation
// // This is typically called when we receive a `key-response` message containing keyMaterial necessary to finalize token creation.
// // The flow is: 
// // 1. Some part of the code initiated a token creation that required keys (publicKey/privateKey).
// // 2. A correlationId was stored in `pendingTokenRequests`.
// // 3. The key-response message arrives here.
// // 4. We use the keyMaterial and original payload to call `createAndEncryptToken` and then produce a token event.
// export async function  finalizeTokenCreation(msg) {
//   // msg = { correlationId, keyMaterial }
//   const { correlationId, keyMaterial } = msg;
//   const pending = pendingTokenRequests[correlationId];
//   if (!pending) {
//     console.error(`No pending token creation request for correlationId: ${correlationId}`);
//     return;
//   }

//   const { payload, userEmail, userType, userData } = pending;
//   delete pendingTokenRequests[correlationId];

//   try {
//     const jwe = await createAndEncryptToken(payload, keyMaterial.publicKey);
//     // Once JWE is created, produce a login-success or some token delivery event.
//     // If this was for login, we have userEmail, userType, userData available.
//     await produceLoginSuccess({ email: userEmail, userType, userData, token: jwe });
//     console.log(`Token creation finalized for ${userEmail}`);
//   } catch (err) {
//     console.error('Error in finalizeTokenCreation:', err);
//     // Produce a token-creation-failed event if needed
//   }
// }

// // Handlers for hash-response, user-data-response, and encrypt-response might also be here.
// // They would call handleHashResponse, handleUserDataResponse, etc. from authService/charityService.
// export async function onHashResponse(msg) {
//   await handleHashResponse(msg);
// }

// export async function onUserDataResponse(msg) {
//   await handleUserDataResponse(msg);
//   // handleUserDataResponse from authService typically calls createAndEncryptToken and produces final events.
// }

// // If your finalize token creation depends on key-response (like previously mentioned):
// export async function onKeyResponse(msg) {
//   // msg = { correlationId, keyMaterial }
//   await finalizeTokenCreation(msg);
// }
