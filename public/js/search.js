let sindex = 0;
let cycle = false;

const start = () => {
  const query = getParameterByName('q');
  if (query) search(query.replaceAll('+', '%2B'));

  document.getElementById('keywords').focus();

  window.setInterval(function() {
    updatetime();
  }, 200);
};

function handleKeyPress(e) {
  const key = e.keyCode || e.which;
  const text = document.getElementById('keywords').value.replaceAll('+', '%2B');
  const option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
  const subtext = text.substr(2 + option.length);
  if (key === 13) {
    // Search functions
    search(text);
  }
  if (key === 9) {
    // Tab Completion Functions
    e.preventDefault();
    e.stopPropagation();
    if (text[0] === ';') {
      const streamers = ['admiralbahroo', 'moonmoon_ow', 'witwix'];
      switch (option) {
        case 't':
          if (!subtext || cycle) {
            cycle = true;
            if (sindex > streamers.length - 1) sindex = 0;
            document.getElementById('keywords').value = `;t ${
              streamers[sindex++]
            }`;
            return;
          }
          for (const streamer of streamers) {
            if (subtext === streamer.substr(0, subtext.length)) {
              document.getElementById('keywords').value = `;t ${streamer}`;
              return;
            }
          }
          break;
        default:
          break;
      }
    }
  }
  if (key == 32) {
    // Space to go to search
    document.getElementById('keywords').focus();
  }
  sindex = 0;
  cycle = false;
}

function validURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'); // fragment locator
  return !!pattern.test(str);
}

function search(text) {
  const option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
  const subtext = text.substr(2 + option.length);
  if (text[0] === '/') {
    if (text.indexOf(' ') > -1) {
      switch (option) {
        case 'am':
          window.location = `https://www.allmusic.com/search/all/${subtext}`;
          break;
        case 'd':
          window.location = `https://www.google.com/search?q=${subtext}`;
          break;
        case 'g':
          window.location = `https://duckduckgo.com/?q=${subtext}`;
          break;
        case 'di':
          window.location = `https://www.discogs.com/search/?q=${subtext}`;
          break;
        case 'i':
          window.location = `https://www.imdb.com/find?q=${subtext}`;
          break;
        case 'm':
          window.location = `https://www.themoviedb.org/search?query=${subtext}`;
          break;
        case 'r':
          window.location = `https://www.reddit.com/search?q=${subtext}`;
          break;
        case 'q':
          window.location = `https://www.qwant.com/?q=${subtext}`;
          break;
        case 'so':
          window.location = `https://soundcloud.com/search?q=${subtext}`;
          break;
        case 's':
          window.location = `https://open.spotify.com/search/results/${subtext}`;
          break;
        case 't':
          window.location = `https://trakt.tv/search?query=${subtext}`;
          break;
        case 'tv':
          window.location = `https://www.thetvdb.com/search?q=${subtext}`;
          break;
        case 'y':
          window.location = `https://www.youtube.com/results?search_query=${subtext}`;
          break;
        default:
          break;
      }
    } else {
      const option = text.substr(1);
      switch (option) {
        case 'd':
          window.location = 'https://www.dukduckgo.com';
          break;
        case 'y':
          window.location = 'https://www.youtube.com';
          break;
        case 'r':
          window.location = 'https://reddit.com';
          break;
        case 's':
          window.location = 'https://open.spotify.com';
          break;
        default:
          break;
      }
    }
  } else if (validURL(text)) {
    if (text.includes('https://') || text.includes('http://')) {
      window.location = text;
    } else {
      window.location = `https://${text}`;
    }
  } else {
    window.location = `https://duckduckgo.com/?q=${text}`;
  }
}

String.prototype.replaceAll = function(search, replacement) {
  const target = this;
  return target.split(search).join(replacement);
};
