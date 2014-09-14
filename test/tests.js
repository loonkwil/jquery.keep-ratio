(function(window) {
    'use strict';

    var $ = window.jQuery;
    var raf = window.requestAnimationFrame;
    var q = window.QUnit;

    var $calcWidth;
    var $calcHeight;
    var ratio = 4 / 3;

    q.testStart(function() {
        var $sections = $('section');
        $calcHeight = $sections.eq(0).find('div');
        $calcWidth = $sections.eq(1).find('div');

        $calcHeight.keepRatio({ ratio: ratio, calculate: 'height' });
        $calcWidth.keepRatio({ ratio: ratio, calculate: 'width' });
    });


    q.test('test initial dimension', function() {
        q.expect(2);

        q.stop();
        raf(function() {
            var h = $calcHeight.height();
            var w = $calcHeight.width();
            q.equal(h, Math.round(w / ratio));
            q.start();
        });

        q.stop();
        raf(function() {
            var h = $calcWidth.height();
            var w = $calcWidth.width();
            q.equal(w, Math.round(h * ratio));
            q.start();
        });
    });

    q.test('test dimension after resizing', function() {
        q.expect(2);

        (function() {
            var w = 30;
            $calcHeight.parent().width(w + 'px');
            $(window).trigger('resize');

            q.stop();
            raf(function() {
                var h = $calcHeight.height();
                q.equal(h, Math.round(w / ratio));
                q.start();
            });
        }());

        (function() {
            var h = 40;
            $calcWidth.parent().height(h + 'px');
            $(window).trigger('resize');

            q.stop();
            raf(function() {
                var w = $calcWidth.width();
                q.equal(w, Math.round(h * ratio));
                q.start();
            });
        }());
    });
}(window));
