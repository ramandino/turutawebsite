var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.querySelector('.wrap').innerHTML = this.txt;

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid fff}";
    document.head.appendChild(css);


// Send email to the webhook
    var form = document.querySelector('.newsletter form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        var emailInput = form.querySelector('.email-input');
        var email = emailInput.value;

        fetch('https://hook.us1.make.com/l93rbrfhmwmvm6o7bw2fs3cswmbkt6cp',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ email: email })
        })
        .then(response => {
        if (response.ok) {
            console.log('Success:', response);
            location.reload(); // Reload the page on success
        // Optionally, show a success message to the user
        } else {
            return response.json().then(error => {
                console.error('Error:', error);
            // Optionally, show an error message to the user
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            // Optionally, show an error message to the user'
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
        const subscribeButtons = document.querySelectorAll('.subscribe-button');
    
        subscribeButtons.forEach(button => {
            button.addEventListener('click', function() {
                location.reload();
            });
        });
    });
};
