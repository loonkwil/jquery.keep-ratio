/**
 * A jQuery plugin for keeping the aspect ratio
 * https://github.com/loonkwil/jquery.keep-ratio
 *
 * Date: Dec 6 2013
 */
(function(window, undefined) {
  "use strict";

  var $ = window.jQuery;

  /**
   * @type {{ratio: number, calculate: string}}
   */
  var defaultOptions = { ratio: 4/3, calculate: 'height', delay: null };

  /**
   * @param {jQuery} $el
   * @param {{ratio: number, calculate: string}} options
   * @return {jQuery}
   */
  var resize = function($el, options) {
    if( options.calculate === 'height' ) {
      var width = $el.width();
      $el.height(Math.round( width / options.ratio ));
    }
    else {
      var height = $el.height();
      $el.width(Math.round( height * options.ratio ));
    }

    return $el;
  };

  /**
   * @param {jQuery} $el
   * @param {{ratio: number, calculate: string}} options
   * @return {jQuery}
   */
  var resizeAll = function($els, options) {
    return $els.each(function() {
      resize($(this), options);
    });
  };


  /**
   * @param {{ratio: number, calculate: string}} options
   * @return {jQuery}
   */
  $.fn.keepRatio = function(options) {
    options = $.extend({}, defaultOptions, options);

    var $boxes = this;

    var resizeTick = null;
    $(window).on('resize', function() {
      if( !options.delay ) {
        resizeAll($boxes, options);
        return;
      }

      if( resizeTick !== null ) {
        return;
      }

      resizeTick = window.setTimeout(function() {
        resizeAll($boxes, options);
        resizeTick = null;
      }, options.delay);
    });

    return resizeAll($boxes, options);
  };
}(window));
