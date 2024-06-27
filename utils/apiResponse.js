const successResponse = (res, data) => {
    return res.status(200).json({
        success: true,
        data,
    });
};

const errorResponse = (res, error) => {
    return res.status(400).json({
        success: false,
        error: error.message,
    });
};

module.exports = { successResponse, errorResponse };
