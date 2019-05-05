const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

// search states

const searchStates = async searchText => {
  const res = await fetch("data.json");
  const states = await res.json();

  // get matches to current text input

  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  const outputHtml = matchces => {
    if (matches.length > 0) {
      const html = matches
        .map(
          match => `
      <div class="card card-body mb-4">
        <h4>${match.name} (${match.abbr}) <span class='text-primary'>${
            match.capital
          }</span>  </h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small> 
      </div>
      `
        )
        .join(" ");

      matchList.innerHTML = html;
    }
  };
  outputHtml(matches);
};

search.addEventListener("input", () => searchStates(search.value));
