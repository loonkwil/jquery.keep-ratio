/**
 * A jQuery plugin for keeping the aspect ratio
 * https://github.com/loonkwil/jquery.keep-ratio
 *
 * Date: Sept 14 2014
 */
(function(window) {
    'use strict';

    var $ = window.jQuery;
    var raf = window.requestAnimationFrame;

    /**
     * @type {{ratio: number, calculate: string}}
     */
    var defaultOptions = { ratio: 4 / 3, calculate: 'height' };

    /**
     * @param {jQuery} $el
     * @param {{ratio: number, calculate: string}} options
     * @param {boolean=} forceRendering
     * @return {jQuery}
     */
    var resize = function($el, options, forceRendering) {
        var resizeFunction;
        if (options.calculate === 'height') {
            var width = $el.width();
            resizeFunction = function() {
                $el.height(Math.round(width / options.ratio));
            };
        } else {
            var height = $el.height();
            resizeFunction = function() {
                $el.width(Math.round(height * options.ratio));
            };
        }

        if (forceRendering) {
            resizeFunction();
        } else {
            raf(resizeFunction);
        }

        return $el;
    };

    /**
     * @param {jQuery} $els
     * @param {{ratio: number, calculate: string}} options
     * @param {boolean=} forceRendering
     * @return {jQuery}
     */
    var resizeAll = function($els, options, forceRendering) {
        return $els.each(function() {
            resize($(this), options, forceRendering);
        });
    };


    /**
     * @param {{ratio: number, calculate: string}} options
     * @return {jQuery}
     */
    $.fn.keepRatio = function(options) {
        options = $.extend({}, defaultOptions, options);

        var $boxes = $(this);

        $(window).on('resize', function() {
            resizeAll($boxes, options);
        });

        return resizeAll($boxes, options, true);
    };
}(window));
