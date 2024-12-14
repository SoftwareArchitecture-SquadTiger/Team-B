import app from './app.js';
import "dotenv/config"

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

