/* Custom Cursor */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate the trailing ring
function animateCursor() {
  // Dot snaps immediately to cursor
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';

  // Ring lags behind with lerp
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll(
  'a, button, .project-card, .skill-item, .cs-phase, .contact-link-item, .badge'
);

hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorRing.classList.remove('hover');
  });
});


/* Dark / Light Mode Toggle */
const themeToggle = document.getElementById('themeToggle');
const htmlEl      = document.documentElement;

// Default: dark mode
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  htmlEl.setAttribute('data-theme', isDark ? 'dark' : 'light');
});


/* Navbar — Scroll Effect */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* Hamburger */ 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function(){
  navMenu.classList.toggle('active');
});

// Close the menu when a link is clicked
document.querySelectorAll('.nav-links li').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    navMenu.classList.remove('active');
  });
});


/* Scroll Reveal */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay based on order
        entry.target.style.transitionDelay = (index * 0.05) + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => revealObserver.observe(el));


/* Floating Badges — Auto Cycle */
const badges   = document.querySelectorAll('.badge');
let activeBadge = 0;

if (badges.length > 0) {
  setInterval(() => {
    badges.forEach((b) => b.classList.remove('active'));
    activeBadge = (activeBadge + 1) % badges.length;
    badges[activeBadge].classList.add('active');
  }, 2000);
}

/* Contact Form — EmailJS */
const sendBtn = document.getElementById('sendBtn');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const fromName  = document.getElementById('from_name').value.trim();
    const fromEmail = document.getElementById('from_email').value.trim();
    const message   = document.getElementById('message').value.trim();

    // Basic validation
    if (!fromName || !fromEmail || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }

    // Loading state
    sendBtn.textContent = 'Sending...';
    sendBtn.disabled = true;

    const templateParams = {
      from_name:  fromName,
      from_email: fromEmail,
      message:    message,
    };

    emailjs.send('service_ablhfgm', 'template_h5jme1s', templateParams)
      .then(() => {
        sendBtn.textContent = 'Message Sent ✓';
        sendBtn.style.opacity = '0.7';

        // Clear fields
        document.getElementById('from_name').value  = '';
        document.getElementById('from_email').value = '';
        document.getElementById('message').value    = '';

        // Reset button after 3 seconds
        setTimeout(() => {
          sendBtn.textContent  = 'Send Message →';
          sendBtn.style.opacity = '1';
          sendBtn.disabled = false;
        }, 3000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        sendBtn.textContent = 'Failed. Try Again.';
        sendBtn.disabled = false;
      });
  });
}


/*Smooth Active Nav Link Highlighting */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((a) => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));