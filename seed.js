const { db, User, Tool } = require("./server/db");

const seed = async () => {
  try {
    await db.sync({ force: true });
    await User.create({
      email: "cody@email.com",
      password: "12345",
      imageUrl: "/cody.png"
    });
    await Tool.create({
      toolType: "Circular Saw",
      userId: 1
    });
    console.log(`
      Seed success!
    `);
    db.close();
  } catch (err) {
    console.error(`
      Oh noes!
    `);
    console.error(err.stack);
    db.close();
  }
};

seed();
