/*jslint browser: true*/
/*global $, jQuery, alert*/

(function ($) {
    'use strict';
    $('.item').on("click", function () {
        $(this).next().slideToggle(100);
        $('p').not($(this).next()).slideUp('fast');
    });
}(jQuery));