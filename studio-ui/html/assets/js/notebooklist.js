/**
 * @file Created by huanghaiping02 on 17/5/18.
 */
$(function () {
    $('.notebook-card').mouseover(function () {
        $(this).find('.notebook-card-close').css('visibility', 'visible');
    });
    $('.notebook-card').mouseout(function () {
        $(this).find('.notebook-card-close').css('visibility', 'hidden');
    });
    $('.notebook-card-close').click(function () {
        $(this).parents('.notebook-card').hide('fast', function () {
            $(this).remove();
        });
    });
});