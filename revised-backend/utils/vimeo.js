const { Vimeo } = require("@vimeo/vimeo");

const client = new Vimeo(
  process.env.CLIENT_ID_VIMEO,
  process.env.CLIENT_ID_SECRET,
  process.env.ACCESS_TOKEN_VIMEO
);

const uploadOnVimeo = (filePath, title) => {
  return new Promise((resolve, reject) => {
    client.upload(
      filePath,
      { name: title, description: "Uploaded via Node.js" },
      (uri) => resolve(`https://vimeo.com${uri}`),
      (bytesUploaded, bytesTotal) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(`${percentage}% uploaded`);
      },
      (error) => reject(error)
    );
  });
};

module.exports = uploadOnVimeo;
