/**
 * @file Created by huanghaiping02 on 17/5/22.
 */
$(function () {
    $('.card-add').mouseover(function () {
        $(this).find('.card-add-line').css('border-bottom', '1px solid #ddd');
    });
    $('.card-add').mouseout(function () {
        $(this).find('.card-add-line').css('border-bottom', '0px');
    });
    $('#schema-view-nav').click(function () {
        $('.schema-view').toggle();
    });

});