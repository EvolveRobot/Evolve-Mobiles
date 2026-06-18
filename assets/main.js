(function () {
  const data = window.NOVA_DATA;
  if (!data) return;

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const money = (value) => `Rs. ${Number(value).toLocaleString("en-IN")}`;
  const websiteCreationMessage =
    "Can i know more about Website creation for Mobile shops?";

  function whatsappUrl(message) {
    return `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function setWhatsappMessage(message) {
    const finalMessage = message || data.defaultWhatsappMessage;
    qsa("[data-whatsapp-link]").forEach((link) => {
      link.href = whatsappUrl(finalMessage);
      link.target = "_blank";
      link.rel = "noopener";
    });
    qsa(".floating-whatsapp").forEach((link) => {
      link.href = whatsappUrl(websiteCreationMessage);
      link.target = "_blank";
      link.rel = "noopener";
    });
  }

  function productMessage(product, variantLabel) {
    const variant = variantLabel ? ` ${variantLabel}` : "";
    return `Hi Evolve Mobiles, I'm interested in ${product.name}${variant}. Please share best price and availability.`;
  }

  function productCard(product) {
    return `
      <article class="card product-card">
        <a class="product-media" href="product.html?slug=${product.slug}" aria-label="View ${product.name}">
          <span class="badge">${product.badge}</span>
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
        <div class="product-body">
          <div>
            <p class="eyebrow">${product.brand}</p>
            <h3>${product.name}</h3>
          </div>
          <div class="product-meta">
            <span>${product.ram}</span>
            <span>${product.storage}</span>
            <span>${product.color}</span>
          </div>
          <div class="price-row">
            <span class="price">${money(product.price)}</span>
            <span class="mrp">${money(product.mrp)}</span>
          </div>
          <p>${product.stock}</p>
          <div class="product-actions">
            <a class="btn btn-outline" href="product.html?slug=${product.slug}">View</a>
            <a class="btn btn-primary" href="${whatsappUrl(productMessage(product))}" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </article>
    `;
  }

  function brandImage(brandName) {
    const product = data.products.find((item) => item.brand === brandName);
    return product ? product.image : data.products[0].image;
  }

  function serviceImage(serviceTitle) {
    const images = {
      "Display Replacement":
        "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=900&q=80",
      "Battery Service":
        "https://images.unsplash.com/photo-1603539444875-76e7684265f6?auto=format&fit=crop&w=900&q=80",
      "Camera Repair":
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      "Back Glass Repair":
        "https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=900&q=80",
      "Software Support":
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
      "Accessory Setup":
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"
    };
    return images[serviceTitle] || images["Software Support"];
  }

  function offerCard(offer) {
    return `
      <article class="card offer-card">
        <span class="badge">${offer.tag}</span>
        <strong>${offer.title}</strong>
        <p>${offer.summary}</p>
        <div class="offer-value">${offer.value}</div>
      </article>
    `;
  }

  function serviceCard(service) {
    return `
      <article class="card service-card">
        <div class="card-thumb">
          <img src="${serviceImage(service.title)}" alt="${service.title}" loading="lazy">
        </div>
        <strong>${service.title}</strong>
        <p>${service.time}</p>
        <a class="btn btn-outline" href="${whatsappUrl(`Hi Evolve Mobiles, I want to book ${service.issue}. Please share available slots.`)}" target="_blank" rel="noopener">Book on WhatsApp</a>
      </article>
    `;
  }

  function storeCard(store) {
    return `
      <article class="card store-card">
        <strong>${store.name}</strong>
        <p>${store.address}</p>
        <p>${store.hours}</p>
        <div class="actions">
          <a class="btn btn-outline" href="tel:${store.phone.replace(/[^0-9]/g, "")}">Call</a>
          <a class="btn btn-primary" href="${whatsappUrl(`Hi Evolve Mobiles, I want directions and stock availability at ${store.name}.`)}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </article>
    `;
  }

  function initMenu() {
    const toggle = qs("[data-menu-toggle]");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    qsa(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initActiveNav() {
    const current = location.pathname.split("/").pop() || "index.html";
    qsa(".nav-links a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const target = href.split("/").pop();
      if (
        target === current ||
        (current === "product.html" && target === "phones.html") ||
        (current === "" && target === "index.html")
      ) {
        link.classList.add("is-active");
      }
    });
  }

  function initHome() {
    const featured = qs("[data-featured-products]");
    const brands = qs("[data-brands]");
    const offers = qs("[data-home-offers]");
    const services = qs("[data-home-services]");

    if (featured) {
      featured.innerHTML = data.products
        .filter((product) => product.featured)
        .slice(0, 4)
        .map(productCard)
        .join("");
    }

    if (brands) {
      brands.innerHTML = data.brands
        .map(
          (brand) => `
            <a class="card brand-tile" href="phones.html?brand=${brand.slug}">
              <div class="card-thumb">
                <img src="${brandImage(brand.name)}" alt="${brand.name} phones" loading="lazy">
              </div>
              <strong>${brand.name}</strong>
              <p>${brand.offer}</p>
            </a>
          `
        )
        .join("");
    }

    if (offers) {
      offers.innerHTML = data.offers.map(offerCard).join("");
    }

    if (services) {
      services.innerHTML = data.services.slice(0, 3).map(serviceCard).join("");
    }
  }

  function initCatalogue() {
    const grid = qs("[data-products-grid]");
    if (!grid) return;

    setWhatsappMessage(
      "Hi Evolve Mobiles, I'm browsing the phone catalogue. Please share today's best prices and availability."
    );

    const status = qs("[data-catalogue-status]");
    const searchInput = qs("[data-search]");
    const priceSelect = qs("[data-price]");
    const ramSelect = qs("[data-ram]");
    const sortSelect = qs("[data-sort]");
    const brandButtons = qsa("[data-brand-filter]");
    const params = new URLSearchParams(location.search);
    let activeBrand = params.get("brand") || "all";

    function render() {
      const query = (searchInput.value || "").trim().toLowerCase();
      const price = priceSelect.value;
      const ram = ramSelect.value;
      const sort = sortSelect.value;

      let products = data.products.filter((product) => {
        const matchesBrand =
          activeBrand === "all" || product.brand.toLowerCase() === activeBrand;
        const matchesQuery =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.storage.toLowerCase().includes(query);
        const matchesPrice =
          price === "all" ||
          (price === "under-50000" && product.price < 50000) ||
          (price === "50000-100000" && product.price >= 50000 && product.price <= 100000) ||
          (price === "above-100000" && product.price > 100000);
        const matchesRam = ram === "all" || product.ram === ram;
        return matchesBrand && matchesQuery && matchesPrice && matchesRam;
      });

      products = products.sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "discount") return b.mrp - b.price - (a.mrp - a.price);
        return Number(b.featured) - Number(a.featured);
      });

      status.textContent = `${products.length} phones matched`;
      grid.innerHTML = products.length
        ? products.map(productCard).join("")
        : '<div class="empty-state">No phones matched. Try clearing one filter.</div>';
    }

    brandButtons.forEach((button) => {
      const brand = button.dataset.brandFilter;
      button.classList.toggle("is-active", brand === activeBrand);
      button.addEventListener("click", () => {
        activeBrand = brand;
        brandButtons.forEach((item) => {
          item.classList.toggle("is-active", item.dataset.brandFilter === activeBrand);
        });
        render();
      });
    });

    [searchInput, priceSelect, ramSelect, sortSelect].forEach((control) => {
      control.addEventListener("input", render);
      control.addEventListener("change", render);
    });

    render();
  }

  function initProductDetail() {
    const mount = qs("[data-product-detail]");
    if (!mount) return;

    const params = new URLSearchParams(location.search);
    const slug = params.get("slug") || data.products[0].slug;
    const product = data.products.find((item) => item.slug === slug) || data.products[0];
    let selectedVariant = product.variants[0];

    document.title = `${product.name} | Evolve Mobiles Chennai`;
    const description = qs('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        `${product.name} price, variants, EMI and WhatsApp availability at Evolve Mobiles Chennai.`
      );
    }

    function renderPanel() {
      const monthly = Math.ceil(selectedVariant.price / 12);
      mount.innerHTML = `
        <div>
          <div class="gallery-main">
            <img src="${product.gallery[0]}" alt="${product.name}">
          </div>
          <div class="thumb-row">
            ${product.gallery
              .map(
                (image) => `
                  <div class="thumb">
                    <img src="${image}" alt="${product.name}">
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
        <aside class="card detail-panel">
          <p class="eyebrow">${product.brand}</p>
          <h1>${product.name}</h1>
          <div class="product-meta" style="margin-top: 14px;">
            <span>${product.rating} rated</span>
            <span>${product.stock}</span>
            <span>${product.color}</span>
          </div>
          <div class="price-row" style="margin-top: 20px;">
            <span class="price">${money(selectedVariant.price)}</span>
            <span class="mrp">${money(product.mrp)}</span>
          </div>
          <div class="variant-row">
            ${product.variants
              .map(
                (variant) => `
                  <button class="variant ${variant.label === selectedVariant.label ? "is-active" : ""}" data-variant="${variant.label}">
                    ${variant.label}
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="estimate-box">
            <p>Estimated EMI from</p>
            <strong>${money(monthly)} / month</strong>
          </div>
          <div class="actions">
            <a class="btn btn-primary" data-whatsapp-link href="${whatsappUrl(productMessage(product, selectedVariant.label))}">Ask best price</a>
            <a class="btn btn-outline" href="exchange.html">Check exchange</a>
          </div>
        </aside>
      `;

      qsa("[data-variant]", mount).forEach((button) => {
        button.addEventListener("click", () => {
          selectedVariant =
            product.variants.find((variant) => variant.label === button.dataset.variant) ||
            product.variants[0];
          renderPanel();
        });
      });

      setWhatsappMessage(productMessage(product, selectedVariant.label));
    }

    renderPanel();

    const specs = qs("[data-product-specs]");
    if (specs) {
      specs.innerHTML = Object.entries(product.specs)
        .map(([key, value]) => `<div class="spec-row"><dt>${key}</dt><dd>${value}</dd></div>`)
        .join("");
    }

    const related = qs("[data-related-products]");
    if (related) {
      related.innerHTML = data.products
        .filter((item) => item.brand === product.brand && item.slug !== product.slug)
        .concat(data.products.filter((item) => item.slug !== product.slug))
        .slice(0, 4)
        .map(productCard)
        .join("");
    }
  }

  function initOffers() {
    const offers = qs("[data-offers]");
    const timer = qs("[data-deal-timer]");

    if (!offers && !timer) return;

    setWhatsappMessage(
      "Hi Evolve Mobiles, I want to know today's best mobile phone offers."
    );

    if (offers) offers.innerHTML = data.offers.map(offerCard).join("");
    if (!timer) return;

    function tick() {
      const now = new Date();
      const end = new Date(now);
      end.setHours(21, 30, 0, 0);
      if (end <= now) end.setDate(end.getDate() + 1);
      const diff = end - now;
      const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      timer.textContent = `${hours}:${minutes}:${seconds}`;
    }

    tick();
    setInterval(tick, 1000);
  }

  function initExchange() {
    const form = qs("[data-exchange-form]");
    if (!form) return;

    const brand = qs("[data-exchange-brand]");
    const age = qs("[data-exchange-age]");
    const condition = qs("[data-exchange-condition]");
    const result = qs("[data-exchange-result]");
    const cta = qs("[data-exchange-whatsapp]");

    function calculate() {
      const base = {
        apple: 52000,
        samsung: 42000,
        oneplus: 24000,
        vivo: 18000,
        oppo: 18000,
        xiaomi: 16000,
        other: 10000
      }[brand.value];
      const ageFactor = { new: 1, one: 0.78, two: 0.55, older: 0.34 }[age.value];
      const conditionFactor = { excellent: 1, good: 0.82, fair: 0.62, damaged: 0.35 }[condition.value];
      const estimate = Math.round((base * ageFactor * conditionFactor) / 500) * 500;
      const label = brand.options[brand.selectedIndex].text;
      const message = `Hi Evolve Mobiles, I want an exchange estimate for my ${label} phone. Age: ${age.options[age.selectedIndex].text}. Condition: ${condition.options[condition.selectedIndex].text}.`;

      result.textContent = money(estimate);
      cta.href = whatsappUrl(message);
      setWhatsappMessage(message);
    }

    [brand, age, condition].forEach((control) => control.addEventListener("change", calculate));
    calculate();
  }

  function initService() {
    const mount = qs("[data-services]");
    if (!mount) return;

    setWhatsappMessage(
      "Hi Evolve Mobiles, I want to book a phone service appointment. Please share available slots."
    );

    mount.innerHTML = data.services.map(serviceCard).join("");
    qsa("[data-service-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        const issue = button.dataset.serviceChoice;
        setWhatsappMessage(`Hi Evolve Mobiles, I want to book ${issue}. Please share available slots.`);
      });
    });
  }

  function initStores() {
    const stores = qs("[data-stores]");
    if (stores) stores.innerHTML = data.stores.map(storeCard).join("");
    if (stores) {
      setWhatsappMessage(
        "Hi Evolve Mobiles, I want to check store availability and directions for a Chennai branch."
      );
    }
  }

  setWhatsappMessage(data.defaultWhatsappMessage);
  initMenu();
  initActiveNav();
  initHome();
  initCatalogue();
  initProductDetail();
  initOffers();
  initExchange();
  initService();
  initStores();
})();
