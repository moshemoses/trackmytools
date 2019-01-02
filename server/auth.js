const router = require("express").Router();
const { User } = require("./db");
module.exports = router;

const userNotFound = next => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
};

//routes all /auth/google
router.use("/google", require("./oauth"));

router.get("/me", (req, res, next) => {
  res.json(req.user || {});
});

router.put("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    });
    if (user) {
      req.login(user, err => (err ? next(err) : res.json(user)));
    } else {
      const err = new Error("Incorrect email or password!");
      err.status = 401;
      throw err;
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/logout", async (req, res, next) => {
  await req.logout();
  await req.session.destroy();
  await console.log("checking for user id here", req.user);
  res.status(204).end();
});
