// script.js

document.addEventListener('DOMContentLoaded', function () {
    const fetchButton = document.getElementById('fetchButton');
    fetchButton.addEventListener('click', fetchDogFact);
});

function fetchDogFact() {
    // Fetch dog image from dog.ceo API
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const dogImage = data.message;

            // Fetch dog facts from DogAPI
            fetch('https://kinduff.github.io/dog-api/api/breeds')
                .then(response => response.text())
                .then(data => {
                    // Filter out non-fact lines (considering only lines with alphabetic characters)
                    const factsArray = data.split('\n').filter(line => /[a-zA-Z]/.test(line));

                    // Choose a random dog fact
                    const randomFact = factsArray[Math.floor(Math.random() * factsArray.length)];

                    // Display the dog fact and image
                    displayDogFact(randomFact, dogImage);
                })
                .catch(error => console.error('Error fetching dog fact:', error));
        })
        .catch(error => console.error('Error fetching dog image:', error));
}

function displayDogFact(dogFact, dogImage) {
    const dogFactElement = document.getElementById('dogFact');
    const dogImageElement = document.getElementById('dogImage');

    // Clear previous content
    dogFactElement.textContent = '';
    dogImageElement.src = '';

    // Display dog fact
    dogFactElement.textContent = dogFact;

    // Display dog image
    dogImageElement.src = dogImage;
}
