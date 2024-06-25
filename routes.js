const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");
const ExpressError = require("./expressError");

router.get("/", (req, res) => {
  return res.json({ items: items });
});

router.get("/:name", (req, res, next) => {
  try {
    const name = req.params.name;
    const item = items.find((i) => i.name === name);

    if (!item) {
      throw new ExpressError("Item not found", 404);
    }
    return res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res) => {
  const newItem = req.body;

  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

module.exports = router;

router.patch("/:name", async (req, res, next) => {
  try {
    const oldName = req.params.name;
    const newName = req.body.name;
    const newPrice = req.body.price;

    let item = items.find((i) => i.name === oldName);

    if (!item) {
      throw new ExpressError("Item not found", 404);
    }
    if (newName) {
      item.name = newName;
    }
    if (newPrice) {
      item.price = newPrice;
    }
    return res.json({ updated: item });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:name", (req, res) => {
  const idx = items.findIndex((i) => i.name === req.params.name);
  if (idx === -1) {
    throw new ExpressError("Item not found", 404);
  }
  items.splice(idx, 1);
  return res.status(200).json({ message: "Deleted" });
});

module.exports = router;
