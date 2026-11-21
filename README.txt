VANTA - car brand and dealership website (static HTML, CSS, JS)
================================================================

Open index.html in a browser. No build step, no dependencies. The only font is Roboto, loaded from Google Fonts.
Design: black, white, charcoal and gold; pill buttons, big rounded panels, floating pill navigation, Roboto only.

PAGES (17)
  index.html          Home: hero with search bar, car filter, popular cars, top picks, dimensions, find the right car, specifications, services, customer reviews (placeholders), gallery, FAQ, request-a-call form, footer
  models.html         The Halo range, full comparison table
  configurator.html   Build your Halo: model, paint, wheels, interior, packs. Live total, monthly estimate, shareable link, request form
  inventory.html      Stock and orders with the same car filter (model, paint, wheels, interior, showroom, availability, max price, sort)
  technology.html     Battery and charging curve, drivetrain, aerodynamics, cabin, safety
  ownership.html      Finance calculator, warranty and service plans, charging, FAQ
  showrooms.html      Three locations with hours, directions and a contact form
  test-drive.html     Test drive booking with date and time slots (Sundays closed)
  about.html          Story, evolution timeline and principles
  journal.html + 4 articles
  privacy.html, terms.html, 404.html

WHERE TO EDIT
  js/data.js          Models, prices (KES), paint, wheels, interiors, packs and the stock list. Every page that shows prices reads from here.
  css/site.css        All styles. Colours and sizes are variables at the top.
  Filter and cards    js/site.js builds the filter options and car cards from js/data.js.
  Copy                Plain HTML in each page.

BEFORE YOU LAUNCH
  1. Photos: the three images and the film you supplied are low resolution (about 735 px wide). Replace assets/hero-forest.mp4 (736 x 414, so it softens on large screens), assets/rear34.jpg, side.jpg, silhouette.jpg and hero.mp4 with high-resolution files. The four frameN.jpg files are stills taken from hero.mp4.
  2. Configurator colours: the studio light changes with the paint, but the car in the picture stays black until you add a render per colour.
  3. Forms (booking, contact, build request, newsletter) validate and show a confirmation, and keep entries in the visitor's own browser only. Connect them to your backend (for example Supabase) so entries reach you.
  4. Placeholders to replace: phone numbers (+254 700 000 00X), emails (@vanta.example), addresses, prices, specifications, and the privacy and terms text.
  5. All specifications and company statements are sample content for a fictional brand.

Palette: white page, light-grey cards, black buttons, gold accents; footer is charcoal.
Top picks and "Find the right car" use the 11 supplied car photos (assets/car-*.jpg). Names, specs and KES prices on those cards are placeholders.

Navigation: Home, Inventory (dropdown: All Vehicles, SUVs, Sedans, Hatchbacks, Pickup Trucks, Luxury Cars, Electric & Hybrid, Recently Added), Sell / Trade-In, Financing, Services, About Us, Contact Us. New and used cars are merged into Inventory.
Palette: #fff, #fafafa, #f1f1f1, #eee, #e5e5e5, #999, #666, #222, #111.
