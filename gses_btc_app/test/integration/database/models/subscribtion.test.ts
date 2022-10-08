import Subscribtion from "../../../../src/database/models/subscribtion.model";
import { writeFile } from "fs/promises";
import { resolve } from "path";

describe("Testing subscribtion.model.ts", () => {
  const email = "test@test.io";
  const clearFileSystemDB = async () => {
    await writeFile(
      resolve(__dirname, "../../../../src/database/data/subscribtions.json"),
      "[]\n",
      { encoding: "utf-8" }
    );
  };

  afterEach(async () => {
    await clearFileSystemDB();
  });

  test("Does this Subscribtion model really saves the email", async () => {
    const subscribtion = await new Subscribtion(email).save();
    const candidate = await Subscribtion.findOneByEmail(email);

    expect(candidate).not.toBeNull();
    expect(candidate).toEqual(subscribtion);
  });

  test("Is the primary key in my file system really unique", async () => {
    const subscribtion = await new Subscribtion(email).save();
    for (let i = 0; i < 10; i++) {
      await new Subscribtion(email).save();
    }

    const id = subscribtion._id;
    const candidate = await Subscribtion.findById(id);

    expect(subscribtion).toEqual(candidate);
  });

  test("Is it possible to update a subscribtion with .save() method", async () => {
    const subscribtion = await new Subscribtion(email).save();
    subscribtion.email = "Gmail@gmail.com";
    await subscribtion.save();

    const id = subscribtion._id;
    const candidate = await Subscribtion.findById(id);

    expect(subscribtion).toEqual(candidate);
  });
});
