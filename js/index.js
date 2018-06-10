$(() => {
    this.fullPage()
    this.initSomeHeight()
    this.animateAnchor()
    this.initCarousel()
    this.swiper()
    this.popupOut()
    this.initCarouselTransit()
    this.initCarouselTeams()
    if (viewport().width >= 992) {
        this.initCarSlide()
    }
    this.initTimer()
    if (viewport().width < 992) {
        this.initTabs()
        this.initMobileMenu()
    }
})

$(window).resize(() => {
    this.fullPage()
    this.initSomeHeight()
    this.swiper()
    $('#car-rally').css({ left: 0 });
    if (viewport().width < 992) {
        this.initTabs()
        this.initMobileMenu()
    }
})

function initMobileMenu() {
    $('[data-open-menu]').on('click', function() {
        $('.menu-mobile-nav').fadeIn(300)
    })
    $('[data-close-menu]').on('click', function() {
        $('.menu-mobile-nav').fadeOut(300)
    })
}

function initSomeHeight() {
    if (viewport().width < 768) {
        sameHeight(false)
    } else {
        sameHeight(true)
    }
}

function fullPage() {
    if (viewport().width >= 992) {
        let heightHeader = $('header').outerHeight()
        $('.full-page').height(viewport().height - heightHeader - 30)
    } else {
        $('.full-page').height('auto')
    }
}

function initCarousel() {
    let owl = $('.carousel-testimonials')
    owl.owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        items: 1,
        mouseDrag: false
    })

    $('.cars-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        items: 1,
        autoplay: true,
        autoplayTimeout: 4000,
        mouseDrag: false,
        dots: false
    })
}

window.onscroll = function() {
    header()
};

function initCarouselTransit() {
    let owl = $('.carousel-transit')
    owl.owlCarousel({
        loop: false,
        margin: 30,
        nav: true,
        items: 2,
        dotsEach: true,
        mouseDrag: false
    })

    let owl_mobile = $('.carousel-transit-mobile')
    owl_mobile.owlCarousel({
        loop: false,
        margin: 30,
        nav: true,
        dotsEach: true,
        items: 1,
        mouseDrag: false
    })
}



function header() {
    var header = document.getElementById("header");
    var sticky = header.offsetTop;

    if (window.pageYOffset != 0) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

function initCarouselTeams() {
    let owl = $('.carousel-teams .owl-carousel')
    owl.owlCarousel({
        loop: false,
        nav: true,
        responsive: {
            0: {
                items: 1,
                margin: 0
            },
            768: {
                items: 2,
                margin: 60
            },
            992: {
                items: 3,
                margin: 40
            },
            1200: {
                items: 4,
                margin: 30
            }
        },
        mouseDrag: false
    })
}

function sameHeight(status, forceBoxClass) {
    let sameHeightBox = $('.same-height')

    if (forceBoxClass !== undefined) {
        sameHeightBox = $(forceBoxClass)
    }

    sameHeightBox.each(function() {
        let sameHeightElement = $('.changed-element', $(this))
        let sameHeightElementMinHeight = $('.changed-element-min-height', $(this))

        if (sameHeightElement.length > 1) {
            if (status === true) {
                let maxHeight = -1
                sameHeightElement.removeAttr('style')
                sameHeightElement.each(function() {
                    if ($(this).height() > maxHeight) {
                        maxHeight = $(this).height()
                    }
                }).height(maxHeight)
                sameHeightElementMinHeight.css({
                    minHeight: maxHeight
                })
            } else {
                sameHeightElement.removeAttr('style')
                sameHeightElementMinHeight.removeAttr('style')
            }
        }
    })
}

function viewport() {
    let e = window,
        a = 'inner'
    if (!('innerWidth' in window)) {
        a = 'client'
        e = document.documentElement || document.body
    }
    return { width: e[a + 'Width'], height: e[a + 'Height'] }

}

function initCarSlide() {
    $('.car-slide .item .text').on('mouseover', function() {
        let current_pos_wrap = $('.car-slide').offset().left
        let current_pos = $(this).parent().offset().left - current_pos_wrap - 35

        $('.car-slide .item').removeClass('active')
        $(this).parent().addClass('active')

        $('#car-rally').css({ left: current_pos });
    })
}

function initTimer() {
    let countDownDate = new Date($('.timer').data('timer')).getTime()
    setInterval(() => {
        let now = new Date().getTime()
        let distance = countDownDate - now

        let days = Math.floor(distance / (1000 * 60 * 60 * 24))
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = Math.floor((distance % (1000 * 60)) / 1000)

        $('#day').html(days)
        $('#hour').html(hours)
        $('#min').html(minutes)
        $('#sec').html(seconds)
    }, 1000);
}

function initTabs() {
    $('.tabs-content .tab-c').hide()
    $('.tabs-content .tab-c[data-tab-c="' + $('.tabs .tab:first').data('tab') + '"]').show()

    $('.tabs .tab').on('click', function() {
        $('.tabs .tab').removeClass('active')
        $(this).addClass('active')

        $('.tabs-content .tab-c').hide()
        $('.tabs-content .tab-c[data-tab-c="' + $(this).data('tab') + '"]').show()
    })
}

if (viewport().width < 992) {
    let didScroll;
    let lastScrollTop = 0;
    let delta = 5;
    let navbarHeight = $('header').outerHeight();

    $(window).scroll(function(event) {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled()
            didScroll = false
        }
    }, 250);

    function hasScrolled() {
        let st = $(this).scrollTop()

        if (Math.abs(lastScrollTop - st) <= delta) {
            return
        }

        if (st > lastScrollTop && st > navbarHeight) {
            $('header').removeClass('nav-down').addClass('nav-up')
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down')
            }
        }

        lastScrollTop = st;
    }
}


function swiper() {
    var swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: true,
        },
    });

    var w = $('.swiper-scrollbar-drag').width();
    var wEl = $('.number-slides').width();
    var tStart = $('.swiper-scrollbar-drag').position()


    var startPosition = tStart.left + (w / 2) - wEl + 45;
    $('.number-slides').css({
        '-webkit-transform': 'translate3d(' + startPosition + 'px, -5px, 0)',
        '-moz-transform': 'translate3d(' + startPosition + 'px, -5px, 0)',
        '-ms-transform': 'translate3d(' + startPosition + 'px, -5px, 0)',
        '-o-transform': 'translate3d(' + startPosition + 'px, -5px, 0)',
        'transform': 'translate3d(' + startPosition + 'px, -5px, 0)'
    });

    swiper.on('slideChange', function() {
        $('.js-current').text((swiper.activeIndex + 1));

    });

    swiper.on('slideNextTransitionEnd', function() {
        var t = $('.swiper-scrollbar-drag').position();
        console.log(t.left);
        console.log(w);
        var numberPosition = t.left + (w / 2) + 45 - wEl;
        $('.number-slides').css({
            '-webkit-transform': 'translate3d(' + numberPosition + 'px, -5px, 0)',
            '-moz-transform': 'translate3d(' + numberPosition + 'px, -5px, 0)',
            '-ms-transform': 'translate3d(' + numberPosition + 'px, -5px, 0)',
            '-o-transform': 'translate3d(' + numberPosition + 'px, -5px, 0)',
            'transform': 'translate3d(' + numberPosition + 'px, -5px, 0)'
        });
    });



    // swiper.on('slideChangeTransitionStart', function() {
    //     if (swiper.activeIndex == swiper.slides.length) {
    //         $('.js-current').text('1');
    //     }
    // });

    $('.js-all').text(swiper.slides.length);
}


function animateAnchor() {
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);

                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable

                        };
                    });
                }
            }
        });
}

function popupOut() {
    $('.popup-area').hover(function() {
        $('#createdModal-2').modal('show');
    })
}