document.addEventListener('DOMContentLoaded', run);

async function run() {
    const heroes = await getHeroes();

    heroes.forEach((hero) => {
      const htmlHero = createHeroTemplate(hero);
      appendHeroToHTML(htmlHero);
    });
}

async function getHeroes() {
  try {
    const response = await fetch('https://akabab.github.io/superhero-api/api/all.json');

    const heroes = await response.json();
    const tenFirstHeroes = heroes.filter((hero) => hero.biography.publisher === 'Marvel Comics');

    return tenFirstHeroes;
  } catch(e) {
    console.error('something went wrong', e);
  }
}

function createHeroTemplate(hero) {
  const template = `
    <div class="card">
      <h3>${hero.name}</h3>

      <div class="hero">
        <img src="${hero.images.sm}">

        <div class="hero-power-stats">
          <div class="attributes">
            <h4>intelligence</h4>
            <div>${hero.powerstats.intelligence}</div>
          </div>

          <div class="attributes">
            <h4>strength</h4>
            <div>${hero.powerstats.strength}</div>
          </div>

          <div class="attributes">
            <h4>speed</h4>
            <div>${hero.powerstats.speed}</div>
          </div>

          <div class="attributes">
            <h4>durability</h4>
            <div>${hero.powerstats.durability}</div>
          </div>

          <div class="attributes">
            <h4>power</h4>
            <div>${hero.powerstats.power}</div>
          </div>

          <div class="attributes">
            <h4>combat</h4>
            <div>${hero.powerstats.combat}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  return template;
}

function appendHeroToHTML(heroHTML) {
  const heroesContainer = document.getElementById('heroesContainer');
  heroesContainer.insertAdjacentHTML('beforeend', heroHTML);
}