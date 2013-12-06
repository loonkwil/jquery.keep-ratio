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
  var defaultOptions = { ratio: 4/3, calculate: 'height' };

  /**
   * @param {jQuery} $el
   * @param {{ratio: number, calculate: string}} options
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
      if( resizeTick !== null ) {
        return;
      }

      resizeTick = window.setTimeout(function() {
        $boxes.each(function() {
          resize($(this), options);
        });

        resizeTick = null;
      }, 100);
    });

    return $boxes.each(function() {
      resize($(this), options);
    });
  };
}(window));
