"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const app = Express();
app.get('/', (req, res) => {
    return res.send('Hello world.');
});
app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});
exports.default = app;
//# sourceMappingURL=index.js.map