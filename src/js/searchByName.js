let currentPage = 1;
//Total pages for the current character
let totalPages;

function fetchCharacter() {
    const characterName = document.getElementById('characterName').value;

    if (!characterName || characterName === '') {
        alert("Please enter a character name.");
        return;
    }

    fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
        .then(response => response.json())
        .then(data => {
            if (data.results) {
                const character = data.results;

                //catch teh total pages to set an alert when last page is reach
                totalPages = data.info.pages;
                //reset current page in case there is more than one search
                currentPage = 1;
                //send data to display
                displayCharacterList(character);
            } else {
                alert("Character not found!");
            }
        })
        .catch(error => {
            console.error("Error fetching character:", error);
            alert("An error occurred while fetching the character.");
        });
}

function displayCharacterList(characters) {
    const characterList = document.getElementById('characterList');
    //create the html structure to replace with the fetch data
    //join to convert arrays to strings, and removes comas to render html properly
    characterList.innerHTML = characters.map(character => `
    <div
      <h2>${character.name}</h2>
      <p><strong>Species:</strong> ${character.species}</p>
      <p><strong>Gender:</strong> ${character.gender}</p>
      <p><strong>Status:</strong> ${character.status}</p>
      <img src="${character.image}" alt="${character.name}"/>
    </div>
  `).join('');
}

function fetchCharactersPage(page) {
    const characterName = document.getElementById('characterName').value;

    if (!characterName || characterName === '') {
        alert("Please enter a character name.");
        return;
    }

    //check for stored value of total pages in the character call
    if (totalPages === null) {
        console.log("No data loaded yet.");
    } else {
        if (page > totalPages) {
            alert("There is not any next page");
            return;
        }
    }

    //URL to show more data
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${characterName}`)
        .then(response => response.json())
        .then(data => {
            displayCharacterList(data.results);
            currentPage = page;

        })
        .catch(error => {
            console.error("Error fetching characters:", error);
            alert("An error occurred while fetching the characters.");
        });
}

function nextPage() {
    fetchCharactersPage(currentPage + 1);
}

function prevPage() {

    if (currentPage === 1) {
        alert("There is no previous page");
    } else {
        fetchCharactersPage(currentPage - 1);
    }
}


