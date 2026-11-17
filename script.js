/* =========================================================
   KYAH ADAMS PORTFOLIO — MAIN JAVASCRIPT
   ========================================================= */


/* ---------------------------------------------------------
   MOBILE NAVIGATION
   --------------------------------------------------------- */

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav-links");


menuButton?.addEventListener("click", () => {

  const isOpen = nav.classList.toggle("open");

  document.body.classList.toggle(
    "menu-open",
    isOpen
  );

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});


/* Close mobile menu after clicking a link */

document
  .querySelectorAll(".nav-links a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      nav?.classList.remove("open");

      document.body.classList.remove(
        "menu-open"
      );

      menuButton?.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });



/* =========================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.08
    }

  );


revealElements.forEach((element) => {

  revealObserver.observe(element);

});



/* =========================================================
   AUTO UPDATE FOOTER YEAR
   ========================================================= */

const year =
  document.getElementById("year");


if (year) {

  year.textContent =
    new Date().getFullYear();

}



/* =========================================================
   SCROLL PROGRESS BAR
   ========================================================= */

const progressBar =
  document.querySelector(
    ".scroll-progress"
  );


function updateScrollProgress() {

  if (!progressBar) return;


  const documentHeight =
    document.documentElement.scrollHeight;


  const windowHeight =
    window.innerHeight;


  const scrollableHeight =
    documentHeight - windowHeight;


  const scrollPosition =
    window.scrollY;


  const percentage =
    scrollableHeight > 0
      ? (
          scrollPosition /
          scrollableHeight
        ) * 100
      : 0;


  progressBar.style.width =
    `${Math.min(
      100,
      Math.max(
        0,
        percentage
      )
    )}%`;

}


window.addEventListener(
  "scroll",
  updateScrollProgress,
  {
    passive: true
  }
);


updateScrollProgress();



/* =========================================================
   SUBTLE 3D CARD TILT
   ========================================================= */


/*
   Only activate the effect when:

   1. The user has a mouse / trackpad.
   2. Reduced-motion accessibility mode
      is NOT enabled.
*/


const supportsPointer =
  window.matchMedia(
    "(pointer: fine)"
  ).matches;


const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


const enableTilt =
  supportsPointer &&
  !prefersReducedMotion;



if (enableTilt) {

  const tiltCards =
    document.querySelectorAll(
      "[data-tilt]"
    );


  tiltCards.forEach((card) => {


    card.addEventListener(
      "mousemove",
      (event) => {


        const bounds =
          card.getBoundingClientRect();


        const mouseX =
          event.clientX -
          bounds.left;


        const mouseY =
          event.clientY -
          bounds.top;


        /*
           Convert mouse coordinates
           into values from roughly:

           -0.5 → 0.5
        */


        const x =
          mouseX /
          bounds.width -
          0.5;


        const y =
          mouseY /
          bounds.height -
          0.5;


        /*
           Keep the movement subtle.

           This should feel polished,
           not like a gaming website.
        */


        const rotateX =
          y * -3;


        const rotateY =
          x * 4;


        card.style.transform =
          `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-2px)
          `;

      }

    );



    /* Reset when mouse leaves */

    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }

    );


  });

}



/* =========================================================
   ACTIVE NAV SECTION
   ========================================================= */


/*
   Highlights the navigation link
   for the section currently visible.
*/


const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const navLinks =
  document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );


const sectionObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }


        const sectionID =
          entry.target.id;


        navLinks.forEach(
          (link) => {

            link.classList.remove(
              "active"
            );


            if (
              link.getAttribute("href") ===
              `#${sectionID}`
            ) {

              link.classList.add(
                "active"
              );

            }

          }

        );

      });

    },

    {

      rootMargin:
        "-35% 0px -55% 0px"

    }

  );


sections.forEach(
  (section) => {

    sectionObserver.observe(
      section
    );

  }

);



/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */


/*
   Native CSS smooth-scroll already works,
   but this gives us slightly more control
   and accounts for the fixed navigation.
*/


document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {


        const href =
          link.getAttribute(
            "href"
          );


        /*
           Ignore empty "#" links.
        */


        if (
          !href ||
          href === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            href
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        const headerOffset =
          82;


        const targetPosition =
          target
            .getBoundingClientRect()
            .top +
          window.scrollY -
          headerOffset;


        window.scrollTo({

          top:
            targetPosition,

          behavior:
            prefersReducedMotion
              ? "auto"
              : "smooth"

        });

      }

    );

  });



/* =========================================================
   HERO CONSTELLATION PARALLAX
   ========================================================= */


/*
   Slight mouse movement inside the
   constellation.

   Very small effect so it stays
   professional.
*/


const constellation =
  document.querySelector(
    ".constellation"
  );


const constellationCard =
  document.querySelector(
    ".constellation-card"
  );


if (
  constellation &&
  constellationCard &&
  enableTilt
) {


  constellationCard.addEventListener(
    "mousemove",
    (event) => {


      const bounds =
        constellationCard
          .getBoundingClientRect();


      const x =
        (
          event.clientX -
          bounds.left
        ) /
        bounds.width -
        0.5;


      const y =
        (
          event.clientY -
          bounds.top
        ) /
        bounds.height -
        0.5;


      constellation.style.transform =
        `
        translate(
          ${x * 7}px,
          ${y * 7}px
        )
        `;

    }

  );


  constellationCard.addEventListener(
    "mouseleave",
    () => {

      constellation.style.transform =
        "";

    }

  );

}



/* =========================================================
   OPTIONAL KEYBOARD ESCAPE FOR MOBILE MENU
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {


    if (
      event.key !== "Escape"
    ) {

      return;

    }


    nav?.classList.remove(
      "open"
    );


    document.body.classList.remove(
      "menu-open"
    );


    menuButton?.setAttribute(
      "aria-expanded",
      "false"
    );

  }

);
