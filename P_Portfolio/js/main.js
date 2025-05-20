jQuery(document).ready(function($) {
    "use strict";
    
    // Preloader
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });
    
    // Navbar Scroll Effect
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
    
    // Smooth Scrolling
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });
    
    // Active Navigation on Scroll
    $(window).on('scroll', function() {
        var scrollDistance = $(window).scrollTop();
        
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('.navbar-nav .nav-link.active').removeClass('active');
                $('.navbar-nav .nav-link').eq(i).addClass('active');
            }
        });
    }).scroll();
    
    // Back to Top Button
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });
    
    $('.back-to-top').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
    
    // Portfolio Filter
    $('.portfolio-filter button').on('click', function() {
        $('.portfolio-filter button').removeClass('active');
        $(this).addClass('active');
        
        var filterValue = $(this).attr('data-filter');
        $('.portfolio-items').isotope({ filter: filterValue });
    });
    
    // Portfolio Isotope
    $(window).on('load', function() {
        $('.portfolio-items').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
    });
    
    // Portfolio Magnific Popup
    $('.portfolio-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out'
        }
    });
    
    // Testimonial Slider
    $('.testimonial-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: false
    });
    
    // Contact Form
    $('#contactForm').validate({
        rules: {
            name: 'required',
            email: {
                required: true,
                email: true
            },
            message: 'required'
        },
        messages: {
            name: 'Please enter your name',
            email: {
                required: 'Please enter your email',
                email: 'Please enter a valid email address'
            },
            message: 'Please enter your message'
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                beforeSend: function() {
                    $(form).find('button[type="submit"]').attr('disabled', true).html('Sending...');
                },
                success: function(response) {
                    $(form).find('button[type="submit"]').html('Message Sent!');
                    setTimeout(function() {
                        $(form).find('button[type="submit"]').attr('disabled', false).html('Send Message');
                        $(form)[0].reset();
                    }, 3000);
                    
                    $('<div class="alert alert-success mt-3">Your message has been sent successfully. I will contact you soon.</div>')
                        .insertBefore(form)
                        .delay(5000)
                        .fadeOut('slow', function() {
                            $(this).remove();
                        });
                },
                error: function() {
                    $(form).find('button[type="submit"]').html('Error!');
                    setTimeout(function() {
                        $(form).find('button[type="submit"]').attr('disabled', false).html('Send Message');
                    }, 3000);
                    
                    $('<div class="alert alert-danger mt-3">Sorry, there was an error sending your message. Please try again later.</div>')
                        .insertBefore(form)
                        .delay(5000)
                        .fadeOut('slow', function() {
                            $(this).remove();
                        });
                }
            });
        }
    });
    
    // Animation on Scroll
    new WOW().init();
});