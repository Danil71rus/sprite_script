//из такого названия папки "ito-avantelnsk-sprite_2020-12-03" в такое "avantelnsk"
// var newName = dir.split("-")[1]; берет название между первым и вторым знаком "-"
const sharp = require('sharp');
const fs = require('fs');
let dirPath = "C:/Users/DonSt/Downloads/temp";
let fileList = fs.readdirSync(dirPath);
fileList.forEach(function (file) {
    let filePath = dirPath + "/" + file,
        newFilePath = dirPath + "/" + "new_" + file;
    console.log(`filePath: ${filePath}`)
    // Оптимизация compressionLevel = 8
    sharp(filePath).png({compressionLevel: 8}).toFile(newFilePath, function(err, info) {
        if (err) {
            console.log(`err:  ${JSON.stringify(err, null, 4)}`);
        }
        // удаляем не оптимизированный картинку
        fs.unlinkSync(filePath);
        // оптимезированный переименовываем в старое название
        fs.renameSync(newFilePath, filePath);
    });
});
