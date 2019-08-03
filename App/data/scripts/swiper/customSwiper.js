var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: '1',
    //parallax: true,
    spaceBetween: 100,

    pagination: {
        el: '.swiper-pagination',
        zoom: true,
        clickable: true,
        renderBullet: function (index, className)
        {
            return '<span class="' + className + '">' + document.getElementsByClassName("swiper-slide")[index].getAttribute("data-page-title") + '</span>';
        }
    }
})

var inputElements = document.getElementsByTagName("input");
for (const elem of inputElements)
{
    elem.onfocus = () => {
        mySwiper.allowTouchMove = false;
    };

    elem.onblur = () => {
        mySwiper.allowTouchMove = true;
    }
}