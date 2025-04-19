let currentPage = 1;
let totalPages;


function fetchAllCharacters() {
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => {
            totalPages = data.info.pages;
            //send data to display
            displayCharacterList(data.results);
        })
        .catch(error => {
            console.error("Error fetching characters:", error);
            alert("An error occurred while fetching the characters.");
        });
}

function fetchCharactersPage(page) {

    //Make sure that always lands on the first page and does not jump directly to the second
    if (totalPages == null) {
        alert("First show all characters.");
        return;
    } else {
        if (page > totalPages) {
            alert("There is not any next page");
            return;
        }
    }

    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
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