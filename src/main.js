const mapsUrl = "https://maps.app.goo.gl/a2Mc9kDhw94SKvTw9";
const mapEmbedUrl =
  "https://maps.google.com/maps?q=Goudsbloemlaan%20148%2C%202565%20CW%20Den%20Haag&t=&z=15&ie=UTF8&iwloc=&output=embed";
const instagramUrl = "https://www.instagram.com/cise_hairstudio/";

const images = {
  hero:
    "https://cisehairstudio.nl/cdn/shop/files/For_men_who_move_different._2.png?v=1773660614&width=2200",
  wall:
    "https://cisehairstudio.nl/cdn/shop/files/GOUDSBLOE_b87da214-a68c-4515-8e55-1c64e3b7dc1b.png?v=1772750077&width=1200",
  portrait:
    "https://cisehairstudio.nl/cdn/shop/files/Welcome_to_Cise_Hairstudio_a_modern_men_s_hairstudio_located_at_Goudsbloemlaan_148._Founded_by_Stef_Cise_was_built_from_a_passion_for_the_craft_and_the_vision_of_creating_a_place_wher_bafc938c-14ce-4a33-be39-e322ac762637.png?v=1773657437&width=1200",
  wide:
    "https://cisehairstudio.nl/cdn/shop/files/Welcome_to_Cise_Hairstudio_a_modern_men_s_hairstudio_located_at_Goudsbloemlaan_148._Founded_by_Stef_Cise_was_built_from_a_passion_for_the_craft_and_the_vision_of_creating_a_place_wher_9f0b41d5-ce97-479d-b560-303e03bbecf8.png?v=1773657305&width=1600",
};

const services = [
  { id: "haircut", nl: "Haircut", en: "Haircut", price: "€30", time: "30 min" },
  {
    id: "haircut-beard",
    nl: "Haircut + beard trim",
    en: "Haircut + beard trim",
    price: "€40",
    time: "45 min",
  },
  { id: "beard", nl: "Beard trim", en: "Beard trim", price: "€15", time: "20 min" },
  {
    id: "student",
    nl: "Student discount",
    en: "Student discount",
    price: "€25",
    time: "30 min",
  },
  { id: "kids", nl: "Kids cut", en: "Kids cut", price: "€25", time: "30 min" },
];

const videoItems = [
  {
    title: "Fresh fade detail",
    sourceUrl: "https://www.instagram.com/p/DWyn2i9DGlN/",
    embedUrl: "https://www.instagram.com/p/DWyn2i9DGlN/embed/",
    poster:
      "https://scontent-ams2-1.cdninstagram.com/v/t51.71878-15/658981123_1580410946383812_7851573586691354500_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=_uxLlydXxNgQ7kNvwEGsL9N&_nc_oc=AdpotK8V9A-BxfqrxfvXM2gkXXb5vDOGDZgvATORXCid51wZSU3fJXxvTncjGB5XECSR1o-u-gbohCjS_3YLymTh&_nc_zt=23&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_gid=vG8qA5-zOwzX6Ir9rBty7g&_nc_ss=7a20f&oh=00_Af3lwd_kf0lR_3LM48obT74dophBv8dKaq2fe2LlEvqZZw&oe=69E7AACA",
    src: "",
  },
  {
    title: "Clean finish",
    sourceUrl: "https://www.instagram.com/p/DWgjZKADaZQ/",
    embedUrl: "https://www.instagram.com/p/DWgjZKADaZQ/embed/",
    poster:
      "https://scontent-ams2-1.cdninstagram.com/v/t51.71878-15/657885435_1484248060070609_8683292635570728406_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=M2CJRmzKyYkQ7kNvwFcSziQ&_nc_oc=AdoA6rVu39ZfUQRBbjOGZLXoGYCBSLaefCxiGVkB4LNdpWV0j_SlUGXlBlREIg7lYqe1C9rh2hKxR3GpsaEXu44-&_nc_zt=23&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_gid=2iEmKUTRE7Peie4AjaEH_w&_nc_ss=7a20f&oh=00_Af0Hgp4y4bt0clWkPpPoCcT8lggRDD1WQHoDdHzQe_yqfQ&oe=69E7C779",
    src: "",
  },
  {
    title: "Studio moment",
    sourceUrl: "https://www.instagram.com/p/DWB-OEvDSBW/",
    embedUrl: "https://www.instagram.com/p/DWB-OEvDSBW/embed/",
    poster:
      "https://scontent-ams2-1.cdninstagram.com/v/t51.82787-15/654017629_17886606567454776_5693770299227210629_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=ZsOCVQPbK0oQ7kNvwH8ICxk&_nc_oc=AdoKu-0J7FeYsy6WRuduss0TI04Or5wSj0TBWv2rtte5EFikykrvSxEXsD6MIdLIWW2nF0G8qlpwWGHhXadP0WnE&_nc_zt=23&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_gid=rn52g1CYfYUWmnO-szz_Iw&_nc_ss=7a20f&oh=00_Af0otfTJ8WpPO_8G4Yc-cpXO4QyybKxHpQCXEQ0NrauuCQ&oe=69E7C551",
    src: "",
  },
];

const testimonials = [
  {
    name: "Max Vermeulen",
    text: "Beste kapper voor jong en oud.",
    meta: "Google review",
    avatar: "M",
    color: "#6f8f7a",
  },
  {
    name: "Senna Piacenza",
    text: "Hele goede mannenkapper, lekkere koffie en een jonge eigenaar.",
    meta: "Google review",
    avatar: "S",
    color: "#a8744f",
  },
  {
    name: "Mick",
    text: "Een betere kapper ga je niet vinden.",
    meta: "Google review",
    avatar: "M",
    color: "#7b6f9b",
  },
  {
    name: "Concept visitor",
    text: "Diensten, prijs en afspraak zitten eindelijk in een duidelijke flow.",
    meta: "Qovre concept",
    avatar: "Q",
    color: "#8f765c",
  },
];

const copy = {
  nl: {
    nav: ["Services", "Boeken", "Locatie"],
    lang: "EN",
    themeDark: "Dark",
    themeLight: "Licht",
    heroKicker: "Men's hairstudio in Den Haag",
    title: "Fresh cuts. Direct geregeld.",
    lead:
      "Kies je service, prik je voorkeurstijd en verstuur je aanvraag zonder gedoe. Gebouwd voor mobiel, gemaakt om snel te boeken.",
    primary: "Afspraak aanvragen",
    secondary: "WhatsApp aanvraag",
    statRating: "5,0 Google",
    statArea: "Goudsbloemlaan 148",
    statHours: "09:00 - 18:00",
    note: "Concept demo. Geen telefoon of e-mailgegevens gebruikt.",
    sectionServices: "Services & prijzen",
    servicesText:
      "Geen losse prijsvragen. De bezoeker ziet meteen wat hij nodig heeft en gaat door naar de aanvraag.",
    bookTitle: "Boek je cut",
    bookText:
      "Deze flow kan later gekoppeld worden aan Fresha, WhatsApp of een eigen admin panel. In de demo blijft alles binnen de site.",
    choose: "Kies",
    selected: "Gekozen",
    name: "Naam",
    service: "Service",
    date: "Datum",
    time: "Tijd",
    noteLabel: "Opmerking",
    submit: "Aanvraag klaarzetten",
    whatsappTitle: "Bericht voor WhatsApp",
    whatsappEmpty: "Kies een service en vul je voorkeur in.",
    whatsappAction: "WhatsApp openen",
    whatsappMuted: "Nummer wordt pas toegevoegd na akkoord van de eigenaar.",
    whyTitle: "Waarom dit beter verkoopt",
    whyItems: [
      ["Minder twijfel", "Prijs, locatie en actie staan meteen zichtbaar."],
      ["Eigen flow", "Niet direct wegsturen naar een extern boekingsscherm."],
      ["Snelle opvolging", "WhatsApp-tekst staat klaar voor bevestiging."],
    ],
    locationTitle: "Kom langs in Den Haag",
    address: "Goudsbloemlaan 148, 2565 CW Den Haag",
    hours: "Maandag - Zondag · 09:00 - 18:00",
    route: "Route bekijken",
    instagram: "@cise_hairstudio",
    footer: "Concept by Qovre",
  },
  en: {
    nav: ["Services", "Booking", "Location"],
    lang: "NL",
    themeDark: "Dark",
    themeLight: "Light",
    heroKicker: "Men's hairstudio in The Hague",
    title: "Fresh cuts. Booked fast.",
    lead:
      "Pick your service, add a preferred time and prepare your request without friction. Built mobile-first, designed for quick booking.",
    primary: "Request appointment",
    secondary: "WhatsApp request",
    statRating: "5.0 Google",
    statArea: "Goudsbloemlaan 148",
    statHours: "09:00 - 18:00",
    note: "Concept demo. No phone or email details used.",
    sectionServices: "Services & pricing",
    servicesText:
      "No back-and-forth about prices. Visitors see what they need and move into the request flow.",
    bookTitle: "Book your cut",
    bookText:
      "This flow can later connect to Fresha, WhatsApp or a private admin panel. In this demo everything stays inside the site.",
    choose: "Choose",
    selected: "Selected",
    name: "Name",
    service: "Service",
    date: "Date",
    time: "Time",
    noteLabel: "Note",
    submit: "Prepare request",
    whatsappTitle: "WhatsApp message",
    whatsappEmpty: "Choose a service and add your preferred time.",
    whatsappAction: "Open WhatsApp",
    whatsappMuted: "Number is only added after owner approval.",
    whyTitle: "Why this sells better",
    whyItems: [
      ["Less doubt", "Price, location and action are instantly visible."],
      ["Own flow", "Visitors are not sent away immediately."],
      ["Fast follow-up", "The WhatsApp text is ready for confirmation."],
    ],
    locationTitle: "Visit in The Hague",
    address: "Goudsbloemlaan 148, 2565 CW The Hague",
    hours: "Monday - Sunday · 09:00 - 18:00",
    route: "View route",
    instagram: "@cise_hairstudio",
    footer: "Concept by Qovre",
  },
};

const state = {
  lang: "nl",
  theme: "light",
  selectedService: services[0].id,
  activeTestimonial: 0,
};

const app = document.querySelector("#app");

render();

function render() {
  const t = copy[state.lang];
  const selected = getSelectedService();
  document.documentElement.lang = state.lang;
  document.documentElement.dataset.theme = state.theme;

  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#top" aria-label="Cisé Hairstudio">
        <span class="brand-main">Cisé</span>
        <span class="brand-sub">Hairstudio</span>
      </a>
      <nav class="nav-links" aria-label="Primary">
        <a href="#services">${t.nav[0]}</a>
        <a href="#booking">${t.nav[1]}</a>
        <a href="#location">${t.nav[2]}</a>
      </nav>
      <div class="control-dock" aria-label="Language and theme controls">
        <div class="toggle-group language-toggle ${state.lang === "en" ? "is-second" : "is-first"}" role="group" aria-label="Language">
          <span class="toggle-thumb" aria-hidden="true"></span>
          <button class="toggle-option" type="button" data-lang="nl" aria-pressed="${state.lang === "nl"}">NL</button>
          <button class="toggle-option" type="button" data-lang="en" aria-pressed="${state.lang === "en"}">EN</button>
        </div>
        <div class="toggle-group theme-toggle ${state.theme === "dark" ? "is-second" : "is-first"}" role="group" aria-label="Theme">
          <span class="toggle-thumb" aria-hidden="true"></span>
          <button class="toggle-option" type="button" data-theme-choice="light" aria-pressed="${state.theme === "light"}">Light</button>
          <button class="toggle-option" type="button" data-theme-choice="dark" aria-pressed="${state.theme === "dark"}">Night</button>
        </div>
      </div>
    </header>

    <section class="hero-section" id="top">
      <div class="hero-background">
        <img src="${images.wide}" alt="Cisé Hairstudio visual" />
      </div>
      <div class="hero-inner">
        <div class="hero-copy" data-reveal>
          <p class="eyebrow">${t.heroKicker}</p>
          <h1>${t.title}</h1>
          <p class="hero-lead">${t.lead}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#booking">${t.primary}</a>
            <a class="button button-ghost" href="#booking" data-whatsapp-jump>${t.secondary}</a>
          </div>
          <div class="stats-row">
            <span>${t.statRating}</span>
            <span>${t.statArea}</span>
            <span>${t.statHours}</span>
          </div>
          <p class="quiet-note">${t.note}</p>
        </div>
      </div>
      <a class="scroll-cue" href="#services" aria-label="Scroll to services"><span></span></a>
    </section>

    <section class="section services-layout" id="services" data-reveal>
      <div class="section-intro">
        <div>
          <p class="eyebrow">Menu</p>
          <h2>${t.sectionServices}</h2>
        </div>
        <p>${t.servicesText}</p>
      </div>
      <div class="service-menu">
        ${services
          .map(service => {
            const isSelected = service.id === state.selectedService;
            return `
              <button class="service-row ${isSelected ? "is-selected" : ""}" type="button" data-service="${service.id}" data-reveal>
                <span>
                  <strong>${service[state.lang]}</strong>
                  <small>${service.time}</small>
                </span>
                <span class="service-price">${service.price}</span>
                <span class="service-select">${isSelected ? t.selected : t.choose}</span>
              </button>
            `;
          })
          .join("")}
      </div>
    </section>

    <section class="section media-section" data-reveal>
      <div class="section-intro">
        <div>
          <p class="eyebrow">Work</p>
          <h2>Cut moments</h2>
        </div>
        <p>Een compacte reels-zone met vaste kaartmaten, zodat de bezoeker door het werk bladert zonder de flow te verliezen.</p>
      </div>
      <div class="reels-phone" aria-label="Cisé Instagram-style reel preview">
        <div class="reels-topbar">
          <span></span>
          <strong>cise_hairstudio</strong>
          <small>Reels</small>
        </div>
        <div class="video-grid">
        ${videoItems
          .map(
            (item, index) => `
              <article class="video-card" data-video-card>
                <div class="reel-header">
                  <span class="reel-avatar">C</span>
                  <div>
                    <strong>cise_hairstudio</strong>
                    <small>${item.title}</small>
                  </div>
                </div>
                <div class="video-frame">
                  <img class="video-poster" src="${item.poster}" alt="${item.title}" />
                  <div class="video-embed-slot" data-embed-slot></div>
                  <button class="video-play" type="button" data-video-index="${index}" data-embed-url="${item.embedUrl}" aria-label="Play ${item.title}">
                    <span></span>
                  </button>
                </div>
                <div class="reel-actions" aria-label="Reel actions">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="video-meta">
                  <strong>Fresh work, clean finish.</strong>
                  <small>Tik om in deze kaart te kijken</small>
                </div>
              </article>
            `,
          )
          .join("")}
        </div>
      </div>
    </section>

    <section class="section testimonials-section" data-reveal>
      <div class="section-intro">
        <div>
          <p class="eyebrow">Reviews</p>
          <h2>Wat klanten zeggen</h2>
        </div>
        <p>Google-style review cards met sterren, avatar en snelle scan. Rechts staat de route naar de studio.</p>
      </div>
      <div class="testimonial-shell">
        <div class="testimonial-list">
          ${testimonials
            .map(
              (item, index) => `
                <button class="testimonial-card ${index === state.activeTestimonial ? "is-active" : ""}" type="button" data-testimonial="${index}">
                  <span class="google-dot">G</span>
                  <span class="review-avatar" style="--avatar-color: ${item.color}">${item.avatar}</span>
                  <span class="review-meta">${item.meta} · 5,0</span>
                  <strong>${item.name}</strong>
                  <span class="review-stars" aria-label="5 stars">★★★★★</span>
                  <p>${item.text}</p>
                </button>
              `,
            )
            .join("")}
        </div>
        <a class="map-preview" href="${mapsUrl}" target="_blank" rel="noreferrer" aria-label="Open route to Cisé Hairstudio">
          <iframe src="${mapEmbedUrl}" title="Map to Cisé Hairstudio" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div>
            <span>Goudsbloemlaan 148</span>
            <p>Open route in Google Maps</p>
          </div>
        </a>
      </div>
    </section>

    <section class="section booking-layout" id="booking" data-reveal>
      <div class="booking-copy">
        <p class="eyebrow">Booking flow</p>
        <h2>${t.bookTitle}</h2>
        <p>${t.bookText}</p>
        <div class="why-stack">
          ${t.whyItems
            .map(
              ([title, text]) => `
                <article>
                  <strong>${title}</strong>
                  <p>${text}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>

      <div class="booking-card" data-reveal>
        <div class="booking-head">
          <span>Nieuwe aanvraag</span>
          <strong>${selected[state.lang]} · ${selected.price}</strong>
        </div>
        <div class="booking-stage" aria-hidden="true">
          <span>01 service</span>
          <span>02 tijd</span>
          <span>03 bevestig</span>
        </div>
        <form class="appointment-form" data-appointment-form>
          <label class="field">${t.name}<input name="name" autocomplete="name" placeholder="Stef" /></label>
          <label class="field">${t.service}
            <select name="service">
              ${services
                .map(
                  service =>
                    `<option value="${service[state.lang]}" ${service.id === state.selectedService ? "selected" : ""}>${service[state.lang]} · ${service.price}</option>`,
                )
                .join("")}
            </select>
          </label>
          <div class="form-pair">
            <label class="field">${t.date}<input name="date" type="date" /></label>
            <label class="field">${t.time}<input name="time" type="time" /></label>
          </div>
          <label class="field field-wide">${t.noteLabel}<textarea name="note" rows="3" placeholder="Na werk als het kan."></textarea></label>
          <button class="button button-primary" type="submit">${t.submit}</button>
        </form>
        <div class="whatsapp-panel">
          <div>
            <p class="eyebrow">${t.whatsappTitle}</p>
            <pre data-preview>${t.whatsappEmpty}</pre>
          </div>
          <button class="button whatsapp-button" type="button" data-action="fake-whatsapp">${t.whatsappAction}</button>
          <p class="quiet-note">${t.whatsappMuted}</p>
        </div>
      </div>
    </section>

    <section class="section location-layout" id="location" data-reveal>
      <div>
        <p class="eyebrow">Location</p>
        <h2>${t.locationTitle}</h2>
      </div>
      <div class="location-card">
        <strong>Cisé Hairstudio</strong>
        <p>${t.address}</p>
        <p>${t.hours}</p>
        <a href="${instagramUrl}" target="_blank" rel="noreferrer">${t.instagram}</a>
        <a class="button button-ghost" href="${mapsUrl}" target="_blank" rel="noreferrer">${t.route}</a>
      </div>
    </section>

    <footer class="site-footer">
      <span>Cisé Hairstudio concept</span>
      <small>${t.footer}</small>
    </footer>
  `;

  bindEvents();
  initRevealMotion();
}

function bindEvents() {
  document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang || "nl";
      render();
    });
  });

  document.querySelectorAll("[data-theme-choice]").forEach(button => {
    button.addEventListener("click", () => {
      state.theme = button.dataset.themeChoice || "light";
      render();
    });
  });

  document.querySelectorAll("[data-service]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedService = button.dataset.service;
      render();
      document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelector("[data-appointment-form]")?.addEventListener("submit", event => {
    event.preventDefault();
    const message = buildWhatsAppPreview(new FormData(event.currentTarget), state.lang);
    document.querySelector("[data-preview]").textContent = message;
  });

  document.querySelector("[data-action='fake-whatsapp']")?.addEventListener("click", () => {
    document.querySelector("[data-appointment-form]")?.requestSubmit();
  });

  bindTestimonials();
  bindVideoPlayers();
}

function bindTestimonials() {
  const cards = document.querySelectorAll("[data-testimonial]");

  cards.forEach(card => {
    const activate = () => {
      const index = Number(card.dataset.testimonial || 0);
      state.activeTestimonial = index;

      cards.forEach(nextCard => nextCard.classList.toggle("is-active", nextCard === card));
    };

    card.addEventListener("mouseenter", activate);
    card.addEventListener("focus", activate);
    card.addEventListener("click", activate);
  });
}

function bindVideoPlayers() {
  const cards = document.querySelectorAll("[data-video-card]");

  const closeOthers = activeCard => {
    cards.forEach(card => {
      if (card !== activeCard) {
        card.classList.remove("is-playing");
        const slot = card.querySelector("[data-embed-slot]");
        if (slot) slot.innerHTML = "";
      }
    });
  };

  document.querySelectorAll("[data-video-index]").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-video-card]");
      const slot = card?.querySelector("[data-embed-slot]");
      const embedUrl = button.dataset.embedUrl;

      if (!card || !slot || !embedUrl) {
        return;
      }

      if (card.classList.contains("is-playing")) {
        slot.innerHTML = "";
        card.classList.remove("is-playing");
        return;
      }

      closeOthers(card);
      const iframeUrl = embedUrl.includes("?") ? `${embedUrl}&hidecaption=1` : `${embedUrl}?hidecaption=1`;
      slot.innerHTML = `
        <iframe
          src="${iframeUrl}"
          title="Instagram video"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      `;
      card.classList.add("is-playing");
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            const slot = entry.target.querySelector("[data-embed-slot]");
            if (slot) slot.innerHTML = "";
            entry.target.classList.remove("is-playing");
          }
        });
      },
      { threshold: 0.2 },
    );

    cards.forEach(card => observer.observe(card));
  }
}

function initRevealMotion() {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  revealItems.forEach(item => observer.observe(item));
}

function getSelectedService() {
  return services.find(service => service.id === state.selectedService) || services[0];
}

function buildWhatsAppPreview(formData, lang) {
  const fallback = lang === "nl" ? "Niet ingevuld" : "Not filled";
  const intro =
    lang === "nl"
      ? "Hallo Cisé Hairstudio, ik wil graag een afspraak maken."
      : "Hello Cisé Hairstudio, I would like to request an appointment.";
  const labels =
    lang === "nl"
      ? ["Naam", "Service", "Voorkeursdatum", "Voorkeurstijd", "Opmerking"]
      : ["Name", "Service", "Preferred date", "Preferred time", "Note"];
  const values = ["name", "service", "date", "time", "note"].map(key =>
    String(formData.get(key) || fallback).trim(),
  );

  return `${intro}

${labels[0]}: ${values[0]}
${labels[1]}: ${values[1]}
${labels[2]}: ${values[2]}
${labels[3]}: ${values[3]}
${labels[4]}: ${values[4]}

${lang === "nl" ? "Is dit mogelijk?" : "Would this be possible?"}`;
}
