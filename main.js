const sharp = require('sharp');
const fs = require('fs');

// удаляет @3x.png и @2x.png
// переименовывает один в sprite.png (950*572)
// оптимизация png без потери качества

let spriteDir = "./sprites/";
let dirList = fs.readdirSync(spriteDir);
dirList.forEach(function (dir) {
    let dirPath = spriteDir + dir;
    console.log(`dirPath: ${dirPath}`);
    let fileList = fs.readdirSync(dirPath);
    fileList.forEach(function (file) {
        let filePath = dirPath + "/" + file;
        console.log(`filePath: ${filePath}`)
        let ext = filePath.match(/(\@([^@]*)$)|(\.([^.]*)$)/)[0]; // ищет либо "@**.png" либо  ".png"
        if (ext === "@3x.png" || ext === "@2x.png") {
            fs.unlinkSync(filePath);
        } else {
            let newName = "do_sprite" + ext;
            fs.renameSync(filePath, dirPath + "/" + newName);
            // Оптимизация compressionLevel = 8
            sharp(dirPath + "/" + newName).png({compressionLevel: 8}).toFile(dirPath + "/" + "sprite.png", function(err, info) {
                if (err) {
                    console.log(`err:  ${JSON.stringify(err, null, 4)}`);
                }
                // удаляем не оптимизированную копию с название "do_sprite.png"
                fs.unlinkSync(dirPath + "/" + newName);
            });
        }
    });
});
