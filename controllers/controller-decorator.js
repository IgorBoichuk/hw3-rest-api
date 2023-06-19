const controllerDecorator = (controllerFunc) => {
  const func = async (req, res, next) => {
    try {
      await controllerFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = { controllerDecorator };
