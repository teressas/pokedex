// DOM OBJECTS
const mainScreen = document.querySelector('.main_screen');
const pokeName = document.querySelector('.poke_name');
const pokeId = document.querySelector('.poke_id');
const pokeFrontImage = document.querySelector('.poke_front_image');
const pokeBackImage = document.querySelector('.poke_back_image');
const pokeTypeOne = document.querySelector('.poke_type_one');
const pokeTypeTwo = document.querySelector('.poke_type_two');
const pokeWeight = document.querySelector('.poke_weight');
const pokeHeight = document.querySelector('.poke_height');
const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left_button')
const rightButton = document.querySelector('.right_button')

// CONSTANTS AND VARIABLES
const TYPES = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'psychic', 'ice', 
    'dragon', 'dark', 'fairy'
]

let prevUrl = null;
let nextUrl = null;

// FUNCTIONS

const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
        mainScreen.classList.remove(type);
    }       
};

const fetchPokeList = url => {
    fetch(url)
        .then(res => res.json())
        .then(data => {

            const { results, previous, next } = data;
            prevUrl = previous;
            nextUrl = next; 

            for (let i = 0; i < pokeListItems.length; i++) {
                const pokeListItem = pokeListItems[i];
                const resultData = results[i];
                
                if (resultData) {
                    const { name, url } = resultData;
                    const urlArray = url.split('/');
                    const id = urlArray[urlArray.length - 2];
                    pokeListItem.textContent = id + '.' + capitalize(name);   
                } else {
                    pokeListItem.textContent = '';
                }
            }
        })
}

const fetchPokeData = id => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {

        resetScreen();

        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
        if (dataSecondType) {
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
        } else {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        }
        
        mainScreen.classList.add(dataFirstType['type']['name']);

        pokeName.textContent = capitalize(data['name']);
        pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];
    

        pokeFrontImage.src = data['sprites']['front_default'] || '';
        pokeBackImage.src = data['sprites']['back_default'] || '';
    });
}

const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }
}

const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
}

const handleListItemClick = (e) => {
    if (!e.target) return;

    const listItem = e.target;
    if (!listItem.textContent) return;
    
    const id = listItem.textContent.split('.')[0];
    fetchPokeData(id);
}

// ADD EVENT LISTENERS

leftButton.addEventListener('click', handleLeftButtonClick)
rightButton.addEventListener('click', handleRightButtonClick)
for (const pokeListItem of pokeListItems) {
    pokeListItem.addEventListener('click', handleListItemClick)
}

// INITIALIZE APPS
fetchPokeList('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')