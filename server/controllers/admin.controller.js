var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var slugify = require('helpers/slugify');
var fileExists = require('helpers/file-exists');

router.use('/', ensureAuthenticated);
router.post('/upload', getUpload().single('upload'), upload);
router.use('/', express.static('../client/admin'));

module.exports = router;

function upload(req, res, next) {
  res.status(200).send(
    '<script>window.parent.CKEDITOR.tools.callFunction(' + req.query.CKEditorFuncNum + ', "/_content/uploads/' + req.file.filename + '");</script>'
  );
}

function ensureAuthenticated(req, res, next) {
  if (!req.session.token) {
    return res.redirect('/login?returnUrl=' + encodeURIComponent('/admin' + req.path));
  }
  next();
}

function getUpload() {
  var uploadDir = '../client/blog/_content/uploads';

  var storage = multer.diskStorage({
    distination: uploadDir,
    fileName: function (req, file, cb) {
      var fileExtension = path.extname(file.originalname);
      var fileBase = path.basename(file.originalname, fileExtension);
      var fileSlug = slugify(fileBase) + fileExtension;

      var fileCounter = 0;
      while (fileExists(path.join(uploadDir, fileSlug))) {
        fileCounter += 1;
        fileSlug = slugify(fileBase) + '-' + fileCounter + fileExtension;
      }
      cb(null, fileSlug);
    }
  });
  var upload = multer({ storage: storage });

  return upload;
}