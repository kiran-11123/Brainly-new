"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const Authentication_routes_1 = __importDefault(require("./routes/Authentication_routes"));
const contents_1 = __importDefault(require("./routes/contents"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
(0, db_1.default)();
app.use("/api/v1/users", Authentication_routes_1.default);
app.use("/api/v1/data", contents_1.default);
app.listen(3000, () => {
    console.log("Server Connected...");
});
