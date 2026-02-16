
import serverless from 'serverless-http';
import app from '../index';
import { connectDatabase } from '../config/database';

// Connect to database outside the handler to reuse connection
// But we should also ensure connection inside handler for cold starts if needed
// The connectDatabase function in config/database.ts handles connection logic

// We need to wrap the handler to ensure DB connection
const handler = serverless(app);

export const netlifyHandler = async (event: any, context: any) => {
    // Ensure database is connected
    await connectDatabase();

    // Return the handler response
    return handler(event, context);
};

// Netlify Functions expect a named export 'handler' or default export
// If using 'netlify-lambda' old style, it was different.
// Modern Netlify Functions (Node 18+) support standard exports.
// But let's stick to the standard 'handler' export for AWS Lambda compatibility which Netlify uses.
export { netlifyHandler as handler };
