const progressMiddleware = (req, res, next) => {
  let fileSize = 0;
  const contentLength = parseInt(req.headers["content-length"], 10);

  req.on("data", (chunk) => {
    fileSize += chunk.length;
    const percentComplete = Math.round((fileSize / contentLength) * 100);
    // Assuming you're using Server-Sent Events (SSE) for real-time updates
    res.write(`data: ${percentComplete}%\n\n`);
  });

  req.on("end", () => {
    res.end();
  });

  next();
};
module.exports = { progressMiddleware };
