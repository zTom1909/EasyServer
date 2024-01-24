const fs = require("fs");
const path = require("path");
module.exports = () => {
  const logError = (error, crashType) => {
    const crashLogFilePath = path.join(__dirname, "../../../", "crash.log");
    const timestamp = new Date().toISOString();
    const errorMessage = `${timestamp} - ${error.stack || error}\n\n`;
    fs.writeFileSync(crashLogFilePath, errorMessage, (error) => {
      if (error)
        console.error(`Error while creating the crash log file: ${err.message}`);
      else console.log(`Error logged to ${crashLogFilePath}`);
    });
  };

  process.on("uncaughtException", async (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    logError(err, "Uncaught Exception");
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Promise Rejection:", reason);
    logError(reason, "Unhandled Promise Rejection");
  });
};
