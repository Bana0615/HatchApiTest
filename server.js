const express = require("express");
const app = express();
const port = 3002;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for key-value pairs
const keyValueStore = {};

// Example Call: curl http://localhost:3000/api/kv/anotherKey
// GET request to retrieve a value by key
app.get("/api/kv/:key", (req, res) => {
  const key = req.params.key;
  if (keyValueStore.hasOwnProperty(key)) {
    res.json({ key: key, value: keyValueStore[key] });
  } else {
    res.status(404).json({ error: "Key not found" });
  }
});

// Example Call: curl -X POST -H "Content-Type: application/json" -d '{"key": "anotherKey", "value": 123}' http://localhost:3000/api/kv
// POST request to store or update a key-value pair
app.post("/api/kv", (req, res) => {
  const { key, value } = req.body;

  if (!key || !value) {
    return res
      .status(400)
      .json({ error: "Missing 'key' or 'value' in the request body" });
  }

  keyValueStore[key] = value;
  res.status(201).json({
    message: `Stored key '${key}' with value '${value}'`,
    data: { key: key, value: value },
  });
});

// Example Call: curl -X DELETE http://localhost:3002/api/kv/anotherKey
// Delete request to store or update a key-value pair
app.delete("/api/kv/:key", (req, res) => {
  const keyToDelete = req.params.key;

  if (keyValueStore.hasOwnProperty(keyToDelete)) {
    delete keyValueStore[keyToDelete];
    res.json({
      message: `Deleted key '${keyToDelete}'`,
      data: { key: keyToDelete },
    });
  } else {
    res.status(404).json({ error: "Key not found" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
