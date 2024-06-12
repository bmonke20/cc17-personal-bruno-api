const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/images");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();

    const filename = `${file.fieldname}-${unique}.${extension}}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
