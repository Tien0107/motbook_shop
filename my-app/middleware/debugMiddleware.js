// debugMiddleware.js
const debugMiddleware = (req, res, next) => {
	console.log('\n----- DEBUG REQUEST -----');
	console.log(`[${new Date().toISOString()}]`);

	// Log request details
	console.log(`${req.method} ${req.url}`);
	console.log('Headers:', JSON.stringify(req.headers, null, 2));

	// Log body if present
	if (req.body && Object.keys(req.body).length > 0) {
		console.log('Body:', JSON.stringify(req.body, null, 2));
	}

	// Log query parameters if present
	if (req.query && Object.keys(req.query).length > 0) {
		console.log('Query:', JSON.stringify(req.query, null, 2));
	}

	// Record start time
	const startTime = Date.now();

	// Store original methods
	const originalSend = res.send;
	const originalJson = res.json;
	const originalEnd = res.end;

	// Function to log the response details
	const logResponse = data => {
		const responseTime = Date.now() - startTime;

		console.log('\n----- DEBUG RESPONSE -----');
		console.log(`Status: ${res.statusCode}`);
		console.log(`Time: ${responseTime}ms`);

		// Log response data
		if (data) {
			if (typeof data === 'object' && !Buffer.isBuffer(data)) {
				console.log('Body:', JSON.stringify(data, null, 2));
			} else if (typeof data === 'string') {
				// Try parsing as JSON first
				try {
					const jsonData = JSON.parse(data);
					console.log('Body:', JSON.stringify(jsonData, null, 2));
				} catch (e) {
					// If not JSON, log as string (truncated if very long)
					const truncated =
						data.length > 1000
							? `${data.substring(0, 1000)}... (truncated)`
							: data;
					console.log('Body:', truncated);
				}
			} else if (Buffer.isBuffer(data)) {
				console.log('Body: [Buffer data]');
			}
		}
		console.log('-------------------------\n');
	};

	// Override response methods
	res.send = function(data) {
		logResponse(data);
		return originalSend.apply(res, arguments);
	};

	res.json = function(data) {
		logResponse(data);
		return originalJson.apply(res, arguments);
	};

	res.end = function(data) {
		if (data) {
			logResponse(data);
		}
		return originalEnd.apply(res, arguments);
	};

	// Continue with request handling
	next();
};

module.exports = debugMiddleware;
