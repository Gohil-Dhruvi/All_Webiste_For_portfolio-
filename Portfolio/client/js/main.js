$(document).ready(function() {
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scrolling for navigation links
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

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });

    $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 500);
        return false;
    });

    // Portfolio filtering
    $('.portfolio-filter li').click(function() {
        $('.portfolio-filter li').removeClass('active');
        $(this).addClass('active');
        
        const filterValue = $(this).attr('data-filter');
        $('.portfolio-item').hide();
        $(filterValue).fadeIn(300);
    });

    // Load portfolio items dynamically
    loadPortfolioItems();
    
    // Load blog posts dynamically
    loadBlogPosts();
    
    // Contact form submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        submitContactForm();
    });
});

// Load portfolio items from API
function loadPortfolioItems() {
    $.ajax({
        url: '/api/portfolio',
        method: 'GET',
        success: function(response) {
            const portfolioContainer = $('.portfolio-container');
            portfolioContainer.empty();
            
            response.forEach(item => {
                const portfolioItem = `
                    <div class="col-lg-4 col-md-6 portfolio-item ${item.category}">
                        <div class="portfolio-wrap">
                            <img src="${item.image}" class="img-fluid" alt="${item.title}">
                            <div class="portfolio-info">
                                <h4>${item.title}</h4>
                                <p>${item.category}</p>
                                <div class="portfolio-links">
                                    <a href="${item.image}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${item.title}"><i class="fas fa-plus"></i></a>
                                    <a href="portfolio-details.html?id=${item._id}" title="More Details"><i class="fas fa-link"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                portfolioContainer.append(portfolioItem);
            });
        },
        error: function(error) {
            console.error('Error loading portfolio items:', error);
        }
    });
}

// Load blog posts from API
function loadBlogPosts() {
    $.ajax({
        url: '/api/blog',
        method: 'GET',
        success: function(response) {
            const blogContainer = $('.blog-container');
            blogContainer.empty();
            
            response.forEach(post => {
                const blogPost = `
                    <div class="col-md-4">
                        <div class="blog-card">
                            <div class="blog-img">
                                <img src="${post.image}" class="img-fluid" alt="${post.title}">
                            </div>
                            <div class="blog-content">
                                <div class="blog-meta">
                                    <span><i class="far fa-user"></i> ${post.author}</span>
                                    <span><i class="far fa-calendar-alt"></i> ${new Date(post.date).toLocaleDateString()}</span>
                                </div>
                                <h3><a href="blog-single.html?id=${post._id}">${post.title}</a></h3>
                                <p>${post.excerpt}</p>
                                <a href="blog-single.html?id=${post._id}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                `;
                blogContainer.append(blogPost);
            });
        },
        error: function(error) {
            console.error('Error loading blog posts:', error);
        }
    });
}

// Submit contact form
function submitContactForm() {
    const formData = {
        name: $('input[name="name"]').val(),
        email: $('input[name="email"]').val(),
        subject: $('input[name="subject"]').val(),
        message: $('textarea[name="message"]').val()
    };
    
    $.ajax({
        url: '/api/contact',
        method: 'POST',
        data: formData,
        success: function(response) {
            alert('Your message has been sent successfully!');
            $('#contactForm')[0].reset();
        },
        error: function(error) {
            alert('There was an error sending your message. Please try again later.');
            console.error('Error submitting contact form:', error);
        }
    });
}