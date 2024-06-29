const path = require("path");
const multer = require("multer");
const { fileURLToPath } = require("url");
const { dirname } = require("path");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

let storage;
if (process.env.NODE_ENV === "development") {
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/temp"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
} else {
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("/tmp/"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
}

const upload = multer({
  storage: storage,
});

module.exports = { upload };
