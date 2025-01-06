const pendingRequests = new Map();

/**
 * @param {string} correlationId - Unique ID for the request
 * @param {Function} resolve - Promise resolve function
 * @param {number} timeoutId - Timeout ID to clear if resolved
 * @param {any} response - Response to pass to the resolve function
 */

export const addPendingRequest = (correlationId, resolve, timeoutId) => {
    pendingRequests.set(correlationId, { resolve, timeoutId });
};

export const resolvePendingRequest = (correlationId, response) => {
    if (pendingRequests.has(correlationId)) {
        const { resolve, timeoutId } = pendingRequests.get(correlationId);
        console.log(`Resolving pending request id: ${correlationId}...`);
        clearTimeout(timeoutId);
        resolve(response);
        console.log(`Request id: ${correlationId} resolved.`);
        pendingRequests.delete(correlationId); // Remove this pending request from the map
    }else{console.log(`Request id: ${correlationId} not found in pending requests.`);}
};

export const deletePendingRequest = (correlationId) => {
    pendingRequests.delete(correlationId);
};