const router = require("express").Router();
const { User, Tool } = require("./db");
module.exports = router;

router.get("/allTools", async (req, res, next) => {
  try {
    const ourId = await req.user.id;
    console.log("working in here people", req.user.id);

    const response = await User.findOne({
      where: { id: ourId },
      include: [{ model: Tool }]
    });

    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post("/addTools", async (req, res, next) => {
  console.log(req.user.id);
  const ourId = await req.user.id;
  await Tool.create({
    toolType: req.body.toolType,
    specificIdentifyingDetails: req.body.identifyingDetails,
    manufacturer: req.body.manufacturer,
    approximateAge: parseInt(req.body.age),
    condition: req.body.condition,
    powered: req.body.powered,
    accessories: req.body.accessories,
    loanStatus: req.body.loanstatus,
    comments: req.body.comments,
    userId: ourId
  });
  res.send("check if tool added successfully");
});

router.delete("/removeTool", async (req, res, next) => {
  console.log(req.body.id);
  await Tool.destroy({ where: { id: req.body.id } });
  res.send("target destroyed");
});
