const sharp = require('sharp')
const compressImages = require('compress-images')
const fileSystem = require('fs')

let path = process.argv[2]
let width = Number(process.argv[3])

function resize(inputPath, outputPath, width) {
    sharp(inputPath).resize({width: width}).
        toFile(outputPath , (error) => {
            if(error) {
                console.log(error);
            }
            else {
                console.log("resized image!");
                compress(outputPath, "./compressed/")
            }
        })
}

function compress(pathInput, outputPath) {

  compressImages(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
  function (error, completed, statistic) {
  console.log("-------------");
  console.log(error);
  console.log(completed);
  console.log(statistic);
  console.log("-------------");

  fileSystem.unlink(pathInput, (error) => {
    if(error) {
      console.log(error);
    }
    else{
      console.log(pathInput, " deleted");
    }
  })


}
);
 
}

resize(path, './temporary_directory/output_resize.jpg', width)

