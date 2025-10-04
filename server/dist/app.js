"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const logger_1 = __importDefault(require("./config/logger"));
// Import routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bankRoutes_1 = __importDefault(require("./routes/bankRoutes"));
const secondPartyRoutes_1 = __importDefault(require("./routes/secondPartyRoutes"));
const accountHolderRoutes_1 = __importDefault(require("./routes/accountHolderRoutes"));
const checkingAccountRoutes_1 = __importDefault(require("./routes/checkingAccountRoutes"));
const fixedDepositRoutes_1 = __importDefault(require("./routes/fixedDepositRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
// Import middleware
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const fixedDepositRoutes_2 = __importDefault(require("./routes/fixedDepositRoutes"));
const checkingAccountRoutes_2 = __importDefault(require("./routes/checkingAccountRoutes"));
const transactionRoutes_2 = __importDefault(require("./routes/transactionRoutes"));
// Load environment variables
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: `${process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:3000'}`,
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log("Headers:", req.headers);
    console.log("Query:", req.query);
    console.log("Body:", req.body);
    next();
});
// API routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/banks', bankRoutes_1.default);
app.use('/api/second-parties', secondPartyRoutes_1.default);
app.use('/api/account-holders', accountHolderRoutes_1.default);
app.use('/api/checking-accounts', checkingAccountRoutes_1.default);
app.use('/api/fixed-deposits', fixedDepositRoutes_1.default);
app.use('/api/transactions', transactionRoutes_1.default);
app.use('/api/checking-account', checkingAccountRoutes_2.default);
app.use('/api/term-deposit', fixedDepositRoutes_2.default);
app.use('/api/account-holder/transactions', transactionRoutes_2.default);
// 404 handler
app.use(notFound_1.notFound);
// Error handler
app.use(errorHandler_1.errorHandler);
// Database connection and server start
const PORT = process.env.PORT || 5000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await sequelize.authenticate();
        // logger.info('Database connection established successfully');
        // // Sync database (use { force: true } only in development to reset database)
        // await sequelize.sync({ alter: true });
        // logger.info('Database synchronized');
        app.listen(PORT, () => {
            logger_1.default.info(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error('Unable to connect to the database:', error);
        process.exit(1);
    }
});
startServer();
exports.default = app;
