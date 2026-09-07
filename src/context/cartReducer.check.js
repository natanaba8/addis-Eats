import assert from "node:assert/strict";
import { cartReducer } from "./cartReducer.js";

const item = { id: 1, name: "Doro wot", price: 120 };

assert.deepEqual(cartReducer([], { type: "add", item }), [item]);
assert.deepEqual(cartReducer([item], { type: "remove", id: item.id }), []);
assert.deepEqual(cartReducer([item], { type: "clear" }), []);

console.log("cartReducer add, remove, and clear cases passed");
