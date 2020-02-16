const mongoose = require('mongoose')
const express = require('express')

const fs = require('fs')
const multer = require('multer')
const sharp = require('sharp')
const imagemagick = require('imagemagick')

module.exports = function(router) {
    router.post('/', (req, res) => {
        res.json(req.body)
    })

    router.post('/emit', (req, res) => {
        console.log('/dev/emit')
        var io = req.app.get('socketio')
        io.emit('paper-ack', 'CatFat')
    })

    // MARK: - Upload
    router.post('/upload/photo/:id', (req, res) => {
        console.log('/upload/photo/' + req.params.id)
      
        // var groupKey = req.params.id
      
        
        var storageUpload = multer.diskStorage({
          destination: function (req, file, cb) {
            var groupKey = req.params.id;
              var path = `./uploads/${groupKey}/`;
              cb(null, path)
          },
          filename: function (req, file, cb) {
            var fileObj = {
              "image/png": ".png",
              "image/jpeg": ".jpeg",
              "image/jpg": ".jpg",
              "image/gif": ".gif",
              "video/quicktime": ".mov",
              "video/mp4": ".mp4"
            };
            if (fileObj[file.mimetype] == undefined) {
              cb(new Error("file format not valid"));
            } else {
              cb(null, file.fieldname + '-' + Date.now() + fileObj[file.mimetype])
            }
          }
        });
        var upload = multer({
          storage: storageUpload,
          limits: {
            fileSize: 50000000
          },
          onFileSizeLimit: function(file) {
            console.log('cat errror');
            cb(new Error("file size is limited"));
          },
        });
        var uploadField = upload.array('file', 2);
        var groupKey = req.params.id
        var path = `./uploads/${groupKey}`
    
        
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
        uploadField(req, res, function(err) {
            if (err instanceof multer.MulterError) {
            var response = errorStatusCode(404, err)
            res.status(404).json(response)
            return
            } else {
                var cc = req.body.groupKey
                console.log(cc)
                imagemagick.identify(req.files[0].path, function(err, features) {
                    if (err) {
                        var response =errorStatusCode(404, err)
                        res.status(404).json(response)
                    }
                    var width = features.width
                    var height = features.height
                    var response = {
                    statusCode: 200,
                    file: req.files,
                    size: {
                        width: width,
                        height: height
                    },
                    isThumbnail: false
                    }
                    res.status(200).json(response)
                })
            }
        })
    })
}