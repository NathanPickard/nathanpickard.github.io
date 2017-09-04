var express = require('express');
var _ = require('lodash');
var moment = require('moment');
var path = require('path');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var config = require('config.json');
var pageService = require('services/page.service');
var postService = require('services/post.service');
var redirectService = require('services/redirect.service');
var slugify = require('helpers/slugify');
var pager = require('helpers/pager');

var basePath = path.resolve('../client/blog');
var indexPath = basePath + '/index';
var metaTitleSuffix = " | MEANie - The MEAN Stack Blog";
var oneWeekSeconds = 60 * 60 * 24 * 7;
var oneWeekMilliseconds = oneWeekSeconds * 1000;

router.use('/_dist', express.static(basePath + '/_dist'));
router.use('/_content', express.static(basePath + '/_content', { maxAge: oneWeekMilliseconds }));


router.use(function (req, res, next) {
    var host = req.get('host');
    var url = req.url.toLowerCase();

    
    redirectService.getByFrom(url)
        .then(function (redirect) {
            if (redirect) {
                
                return res.redirect(301, redirect.to);
            } 

            next();
        })
        .catch(function (err) {
            vm.error = err;
            res.render(indexPath, vm);
        });
});


router.use(function (req, res, next) {
    var vm = req.vm = {};

    vm.loggedIn = !!req.session.token;
    vm.domain = req.protocol + '://' + req.get('host');
    vm.url = vm.domain + req.path;
    vm.googleAnalyticsAccount = config.googleAnalyticsAccount;

    postService.getAll()
        .then(function (posts) {
            
            vm.posts = vm.loggedIn ? posts : _.filter(posts, { 'publish': true });

            
            vm.posts.forEach(function (post) {
                post.url = '/post/' + moment(post.publishDate).format('YYYY/MM/DD') + '/' + post.slug;
                post.publishDateFormatted = moment(post.publishDate).format('MMMM DD YYYY');
            });

            loadYears();
            loadTags();

            next();
        })
        .catch(function (err) {
            vm.error = err;
            res.render(indexPath, vm);
        });

    
    function loadYears() {
        vm.years = [];

        
        var dates = _.pluck(vm.posts, 'publishDate');

        
        _.each(dates, function (dateString) {
            var date = moment(dateString);

            var year = _.findWhere(vm.years, { value: date.format('YYYY') });
            if (!year) {
                year = { value: date.format('YYYY'), months: [] };
                vm.years.push(year);
            }

            var month = _.findWhere(year.months, { value: date.format('MM') });
            if (!month) {
                month = { value: date.format('MM'), name: moment(date).format('MMMM'), postCount: 1 };
                year.months.push(month);
            } else {
                month.postCount += 1;
            }
        });
    }

    function loadTags() {
        
        vm.tags = _.chain(vm.posts)
            .pluck('tags')
            .flatten()
            .uniq()
            .sort()
            .filter(function (el) { return el; })
            .map(function (tag) {
                return { text: tag, slug: slugify(tag) };
            })
            .value();
    }
});


router.get('/', function (req, res, next) {
    var vm = req.vm;

    var currentPage = req.query.page || 1;
    vm.pager = pager(vm.posts.length, currentPage);
    vm.posts = vm.posts.slice(vm.pager.startIndex, vm.pager.endIndex + 1);

    render('home/index.view.html', req, res);
});


router.get('/post', function (req, res, next) {
    var vm = req.vm;

    if (!req.query.id) return res.status(404).send('Not found');

    
    var post = _.find(vm.posts, function (p) {
        return p._id.toString() === req.query.id;
    });

    if (!post) return res.status(404).send('Not found');

    
    var postUrl = '/post/' + moment(post.publishDate).format('YYYY/MM/DD') + '/' + post.slug;
    return res.redirect(301, postUrl);
});


router.get('/post/:year/:month/:day/:slug', function (req, res, next) {
    var vm = req.vm;

    postService.getByUrl(req.params.year, req.params.month, req.params.day, req.params.slug)
        .then(function (post) {
            if (!post) return res.status(404).send('Not found');

            post.url = '/post/' + moment(post.publishDate).format('YYYY/MM/DD') + '/' + post.slug;
            post.publishDateFormatted = moment(post.publishDate).format('MMMM DD YYYY');
            post.permalink = vm.domain + '/post?id=' + post._id;
            vm.post = post;

            
            vm.postTags = _.map(post.tags, function (tag) {
                return { text: tag, slug: slugify(tag) };
            });

            
            vm.metaTitle = vm.post.title + metaTitleSuffix;
            vm.metaDescription = vm.post.summary;

            render('posts/details.view.html', req, res);
        })
        .catch(function (err) {
            vm.error = err;
            res.render(indexPath, vm);
        });
});


router.get('/posts/tag/:tag', function (req, res, next) {
    var vm = req.vm;

    
    vm.posts = _.filter(vm.posts, function (post) {
        if (!post.tags)
            return false;

        
        var tagFound = false;
        _.each(post.tags, function (tag) {
            var tagSlug = slugify(tag);
            if (tagSlug === req.params.tag) {
                
                vm.tag = tag;
                tagFound = true;

                
                vm.metaTitle = 'Posts tagged "' + vm.tag + '"' + metaTitleSuffix;
                vm.metaDescription = 'Posts tagged "' + vm.tag + '"' + metaTitleSuffix;
            }
        });

        return tagFound;
    });

    
    if (!vm.posts.length)
        return res.redirect(301, '/');

    render('posts/tag.view.html', req, res);
});


router.get('/posts/:year/:month', function (req, res, next) {
    var vm = req.vm;

    vm.year = req.params.year;
    vm.monthName = moment(req.params.year + req.params.month + '01').format('MMMM');

    
    vm.posts = _.filter(vm.posts, function (post) {
        return moment(post.publishDate).format('YYYYMM') === req.params.year + req.params.month;
    });

    
    vm.metaTitle = 'Posts for ' + vm.monthName + ' ' + vm.year + metaTitleSuffix;
    vm.metaDescription = 'Posts for ' + vm.monthName + ' ' + vm.year + metaTitleSuffix;

    render('posts/month.view.html', req, res);
});


router.get('/page/:slug', function (req, res, next) {
    var vm = req.vm;

    pageService.getBySlug(req.params.slug)
        .then(function (page) {
            if (!page) return res.status(404).send('Not found');

            vm.page = page;

            
            vm.metaTitle = vm.page.title + metaTitleSuffix;
            vm.metaDescription = vm.page.description + metaTitleSuffix;

            render('pages/details.view.html', req, res);
        })
        .catch(function (err) {
            vm.error = err;
            res.render(indexPath, vm);
        });
});


router.get('/archive', function (req, res, next) {
    var vm = req.vm;

    
    vm.metaTitle = 'Archive' + metaTitleSuffix;
    vm.metaDescription = 'Archive' + metaTitleSuffix;

    render('archive/index.view.html', req, res);
});


router.get('/contact', function (req, res, next) {
    var vm = req.vm;

    
    vm.metaTitle = 'Contact Me' + metaTitleSuffix;
    vm.metaDescription = 'Contact Me' + metaTitleSuffix;

    render('contact/index.view.html', req, res);
});


router.get('/contact-thanks', function (req, res, next) {
    var vm = req.vm;


    vm.metaTitle = 'Contact Me' + metaTitleSuffix;
    vm.metaDescription = 'Contact Me' + metaTitleSuffix;

    render('contact/thanks.view.html', req, res);
});



module.exports = router;



function render(templateUrl, req, res) {
    var vm = req.vm;

    vm.xhr = req.xhr;
    vm.templateUrl = templateUrl;

    
    var renderPath = req.xhr ? basePath + '/' + vm.templateUrl : indexPath;
    return res.render(renderPath, vm);
}


function proxy(fileUrl, filePath, req, res) {
    
    fs.stat(filePath, function (err, stats) {
        if (err) {
            
            updateFileAndReturn();
        } else {
            
            if (moment().diff(stats.mtime, 'minutes') > 60) {
                updateFileAndReturn();
            } else {
                returnFile();
            }
        }
    });

    
    function updateFileAndReturn() {
        request(fileUrl, function (error, response, body) {
            fs.writeFileSync(filePath, body);
            returnFile();
        });
    }

    function returnFile() {
        res.set('Cache-Control', 'public, max-age=' + oneWeekSeconds);
        res.sendFile(filePath);
    }
}