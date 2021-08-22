const admin = (req, res, next) => {

    if (!process.env.REQUIRE_AUTH) return next();

    if (!req.user.isAdmin) {
        res.status(403)
        throw new Error('Access denied.');
    }
    next();
}

export default admin;