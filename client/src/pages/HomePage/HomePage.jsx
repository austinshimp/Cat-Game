import { useMemo } from "react";
import "./HomePage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

/*
  Temporary homepage data.

  Later, these cats can come from the MongoDB/Express API.
  For now, keeping the data here allows us to build the homepage
  without interfering with the teammate working on cat information.
*/
const cats = [
  {
    name: "Lion",
    slug: "lion",
    image: "/images/lion.jpg",
  },
  {
    name: "Tiger",
    slug: "tiger",
    image: "/images/tiger.jpg",
  },
  {
    name: "Jaguar",
    slug: "jaguar",
    image: "/images/jaguar.jpg",
  },
  {
    name: "Leopard",
    slug: "leopard",
    image: "/images/leopard.jpg",
  },
  {
    name: "Snow Leopard",
    slug: "snow-leopard",
    image: "/images/snow-leopard.jpg",
  },
  {
    name: "Cheetah",
    slug: "cheetah",
    image: "/images/cheetah.jpg",
  },
];

/*
  Creates a number based on the current date.
  This means the featured cats stay the same for the entire day,
  but change on another day.
*/
function getDailySeed() {
  const today = new Date();

  const dateString = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  let seed = 0;

  for (let i = 0; i < dateString.length; i++) {
    seed = (seed * 31 + dateString.charCodeAt(i)) >>> 0;
  }

  return seed;
}

/*
  Simple seeded random generator.
*/
function seededRandom(seed) {
  return function () {
    seed += 0x6d2b79f5;

    let value = seed;

    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/*
  Randomly chooses 3 featured cats based on the day.
*/
function getFeaturedCats() {
  const shuffledCats = [...cats];
  const random = seededRandom(getDailySeed());

  for (let i = shuffledCats.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(random() * (i + 1));

    [shuffledCats[i], shuffledCats[randomIndex]] = [
      shuffledCats[randomIndex],
      shuffledCats[i],
    ];
  }

  return shuffledCats.slice(0, 3);
}

function HomePage({ user = null, onSignOut = () => {} }) {
  const featuredCats = useMemo(() => getFeaturedCats(), []);

  return (
  <div className="home-page">

    <NavigationBar
    user={user}
    onSignOut={onSignOut}/>

    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-category">Big Cat Information & Trivia</p>

          <h1>
            Explore the world’s
            <br />
            <span>great cats.</span>
          </h1>

          <p className="hero-description">
            Discover the habitats, behavior, conservation status, and unique
            characteristics of some of the world’s most remarkable feline
            species. When you are ready, test what you have learned in the trivia game.
          </p>

          <div className="hero-buttons">
            <a href="/information" className="primary-button">
              Explore Big Cats
            </a>

            <a
              href={user ? "/trivia" : "/account?mode=login"}
              className="secondary-button"
            >
              Play Trivia
            </a>
          </div>

          {!user && (
            <p className="guest-option">
              Want to browse without an account?{" "}
              <a href="/information">Continue as a guest.</a>
            </p>
          )}
        </div>

    
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Explore the Species</p>
            <h2>Featured Cats</h2>
          </div>

          <a href="/information" className="view-all">
            View all cats
          </a>
        </div>

        <div className="featured-grid">
          {featuredCats.map((cat) => (
            <a
              key={cat.slug}
              href={`/cats/${cat.slug}`}
              className="cat-card"
            >
              <div className="cat-image">
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <div className="cat-image-placeholder">
                  Image coming soon
                </div>
              </div>

              <div className="cat-card-content">
                <h3>{cat.name}</h3>
                <span>Learn more</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  </div>
);
}

export default HomePage;