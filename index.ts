require("dotenv").config();
const app = require("./server/app.ts");
const port = process.env.PORT || 3000  ;
app.listen(port, () => {
    console.log(`Server Running here 👉 http://localhost:${port}`);
})