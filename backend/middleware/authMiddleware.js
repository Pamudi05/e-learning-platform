import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'Token is missing' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.customer = decoded;
        next();
    });
};

export default verifyToken;
