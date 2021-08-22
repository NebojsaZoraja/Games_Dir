import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    if (!process.env.REQUIRE_AUTH) return next();

    let token = req.header('x-auth-token');
    if (!token) {
        res.status(401);
        throw new Error('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400);
        throw new Error('Invalid token');
    }
};

export default auth;
