// Start dev-api on a different port (3002) without changing existing scripts
process.env.PORT = process.env.PORT || '3002';
// Import the server which reads process.env.PORT
import('./server.js').then(m => {
  console.log('dev-api start wrapper set PORT=' + process.env.PORT);
}).catch(err => {
  console.error('Failed to start dev-api wrapper:', err);
  process.exit(1);
});
