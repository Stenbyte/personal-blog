function defaultController(controller) {
  return async (req, res, next) => {
    try {
      const result = await controller(req, res, next);

      if (result !== undefined) {
        res.status(200).json({ success: true, data: result });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = defaultController;
