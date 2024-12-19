export const withErrorHandling = async (handler, data) => {
  try {
    return await handler(data);
  } catch (error) {
    console.error('Error processing action:', error.message);
    return {
      status: 'error',
      message: 'Failed to process action',
      error: error.message,
    };
  }
};
