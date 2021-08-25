const admin = (req, res, next) => {

    if (!process.env.REQUIRE_AUTH) return next();

    if (!req.user.isAdmin || !req.user) {
        res.status(403)
        throw new Error('Access denied.');
    }
    next();
}

export default admin;