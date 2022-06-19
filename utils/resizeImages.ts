import sharp from "sharp";
import fs from "fs";

const directory = "public/images";

fs.mkdirSync("public/images/sizes");

fs.readdirSync(directory).forEach((file) => {
  const fileName = file.split(".webp")[0];

  [
    { width: 480, height: 360 },
    { width: 1080, height: 820 },
  ].forEach(({ width, height }) => {
    sharp(`${directory}/${file}`)
      .resize(width, height)
      .toFile(`${directory}/sizes/${fileName}-${width}.webp`, (err) => {
        if (err) {
          // console.error(err);
        }
      });
  });
});
