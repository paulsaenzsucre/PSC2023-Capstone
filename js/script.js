let speakers;

async function fetchJSON() {
  const response = await fetch('data/speakers.json');
  const json = await response.json();
  return json;
}

async function fillSpeakers() {
  const main = document.getElementById('main-cont');
  if (main !== null) {
    speakers = await fetchJSON();

    const tree = document.createDocumentFragment();

    const speakSection = document.createElement('section');
    speakSection.setAttribute('class', 'speakers');
    speakSection.setAttribute('id', 'speakers-cont');

    const h = document.createElement('h2');
    h.setAttribute('class', 'sec-title');
    h.appendChild(document.createTextNode('Featured Speakers'));

    speakSection.appendChild(h);

    const speakCardCont = document.createElement('div');
    speakCardCont.setAttribute('class', 'speak-card-cont');

    speakers.forEach((speaker) => {
      const speakerInfo = document.createElement('div');
      speakerInfo.setAttribute('class', 'speak-card-info');
      let p = document.createElement('p');
      p.setAttribute('class', 'speak-card-title');
      p.appendChild(document.createTextNode(speaker.name));
      speakerInfo.appendChild(p);

      p = document.createElement('p');
      p.setAttribute('class', 'speak-card-subtitle');
      p.appendChild(document.createTextNode(speaker.subtitle));
      speakerInfo.appendChild(p);

      p = document.createElement('p');
      p.setAttribute('class', 'speak-card-desc');
      p.appendChild(document.createTextNode(speaker.description));
      speakerInfo.appendChild(p);

      const speakerImg = document.createElement('img');
      speakerImg.setAttribute('class', 'speak-card-img');
      speakerImg.setAttribute('src', speaker.image);
      speakerImg.setAttribute('alt', speaker.imgDescription);

      const speakCard = document.createElement('div');
      speakCard.setAttribute('class', 'speak-card flex-cont');
      speakCard.appendChild(speakerImg);
      speakCard.appendChild(speakerInfo);

      speakCardCont.appendChild(speakCard);
    });

    speakSection.appendChild(speakCardCont);

    tree.appendChild(speakSection);
    const partner = document.getElementById('partner-cont');
    main.insertBefore(tree, partner);
  }
}

const myMediaQuery = window.matchMedia('(max-width: 48rem)');

myMediaQuery.addEventListener('change', () => {
  const blockScroll = document.getElementById('menu-bar').classList.contains('show-menu');
  if (myMediaQuery.matches && blockScroll) document.getElementById('content').classList.add('scroll-lock');
  else document.getElementById('content').classList.remove('scroll-lock');
});

function showMenu() {
  document.getElementById('nav-bar').classList.toggle('mob-menu');
  let img = document.getElementById('hmbgr-btn');
  img.classList.toggle('hidden');
  img = document.getElementById('close-btn');
  img.classList.toggle('hidden');
  document.getElementById('menu-bar').classList.toggle('show-menu');
  document.getElementById('content').classList.add('scroll-lock');
}

function hideMenu() {
  document.getElementById('nav-bar').classList.toggle('mob-menu');
  let img = document.getElementById('close-btn');
  img.classList.toggle('hidden');
  img = document.getElementById('hmbgr-btn');
  img.classList.toggle('hidden');
  document.getElementById('menu-bar').classList.toggle('show-menu');
  document.getElementById('content').classList.remove('scroll-lock');
}

function fillAnchors() {
  Array.from(document.getElementsByClassName('menu-item')).forEach(
    (element) => {
      element.addEventListener('click', hideMenu);
    },
  );
}

/** * Show mobile menu ** */
document.getElementById('hmbgr-btn').addEventListener('click', showMenu);

document.getElementById('close-btn').addEventListener('click', hideMenu);
document.addEventListener('DOMContentLoaded', fillSpeakers);
document.addEventListener('DOMContentLoaded', fillAnchors);