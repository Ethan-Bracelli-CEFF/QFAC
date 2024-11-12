document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs du formulaire
    const playerName = document.getElementById('name').value;
    const numberOfQuestions = document.getElementById('questionNumber').value;
    const category = document.querySelector('select[aria-label="Select Category"]').value;
    const difficulty = document.querySelector('select[aria-label="Select Difficulty"]').value;
    const type = document.querySelector('select[aria-label="Select Type"]').value;
    const fillDiv = document.getElementById('fill')

    // Vérifier que tous les champs sont remplis correctement
    if (!playerName || !numberOfQuestions || category === "Select Category" || difficulty === "Select Difficulty" || type === "Select Type") {
        fillDiv.innerHTML = "Please fill all fields"
        return;
    }

    // Construire l'URL de l'API avec les paramètres choisis
    const apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;

    // Appeler l'API Trivia pour récupérer les questions
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        const questions = data.results;
        if (questions.length > 0) {
          startQuiz(questions, playerName); // Lancer le quiz avec les questions et le nom du joueur
        } else {
            alert("No questions found for the selected options. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error fetching the quiz questions:', error);
        alert('An error occurred while fetching the questions. Please try again.');
    });
});

  // Fonction pour démarrer le quiz
function startQuiz(questions, playerName) {
    // Enregistrer les questions et le nom du joueur dans localStorage
    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('playerName', playerName);

    // Rediriger vers la page des questions
    window.location.href = 'QFAC_questions.html';
}
