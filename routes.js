const express = require("express");
const router = new express.Router();


router.get("/", (req, res) => {
  return res.json({ items: items });
});

router.get("/:name", (req, res) => {
    const name = req.params.name;
    const item = items.find(i => i.name === name);

    if (!item) {
        return res.status(404).json({ error: "Item not found"});
    }
    return res.status(200).json(item);
});

router.post("/", (req, res) => {
  const newItem = req.body;

  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

module.exports = router;
