export const wrapAsync = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      console.log("ERROR HANDLING");
      res.status(500).json({ error: error.message, errorMes: "Error" });
    }
  };
};
