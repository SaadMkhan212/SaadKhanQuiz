const questions = [
    {
        text: "1. What is Saad known for?",
        options: [
            { text: "Intelligence", id: "1" },
            { text: "Good Looks", id: "2" },
            { text: "Kindness", id: "3" },
            { text: "All of the above", id: "4" }
        ],
        correct: "4"
    },
    {
        text: "2. What’s the hardest part about being my friend?",
        options: [
            { text: "Keeping up with my greatness", id: "1" },
            { text: "Trying not to fall in love with me", id: "2" },
            { text: "Constantly hearing me say \"I told you so\"", id: "3" },
            { text: "There is no downside — you’re welcome", id: "4" }
        ],
        correct: "4"
    },
    {
        text: "3. When I walk into a room, what usually happens?",
        options: [
            { text: "Silence falls. People stare. A legend enters.", id: "1" },
            { text: "All of these happen", id: "2" },
            { text: "Someone faints (out of awe)", id: "3" },
            { text: "The room levels up — because I am the upgrade.", id: "4" }
        ],
        correct: "2"
    },
    {
        text: "4. What's the real reason mirrors exist?",
        options: [
            { text: "To reflect light and brighten spaces", id: "1" },
            { text: "To help people fix their hair", id: "2" },
            { text: "To give me a chance to admire myself from every angle", id: "3" },
            { text: "To serve as portals to alternate dimensions", id: "4" }
        ],
        correct: "3"
    }
];

let currentQuestion = 0;
let totalQuestions = questions.length;
let userAnswers = [];

function startQuiz() {
    document.getElementById("home-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    renderQuestion();
}

function renderQuestion() {
    const form = document.getElementById("quiz-form");
    form.innerHTML = "";
    const q = questions[currentQuestion];

    const div = document.createElement("div");
    div.className = "question";

    const p = document.createElement("p");
    p.textContent = q.text;
    div.appendChild(p);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    q.options.forEach(option => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="question" value="${option.id}"> ${option.text}`;
        optionsDiv.appendChild(label);
    });

    div.appendChild(optionsDiv);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = currentQuestion + 1 === totalQuestions ? "Submit" : "Next";
    btn.onclick = currentQuestion + 1 === totalQuestions ? submitQuiz : nextQuestion;

    div.appendChild(document.createElement("br"));
    div.appendChild(btn);

    form.appendChild(div);
}

function nextQuestion() {
    const selected = document.querySelector(`input[name=question]:checked`);
    if (!selected) {
        alert("Please select an answer.");
        return;
    }

    userAnswers[currentQuestion] = selected.value;
    currentQuestion++;
    renderQuestion();
}

function submitQuiz() {
    const selected = document.querySelector(`input[name=question]:checked`);
    if (!selected) {
        alert("Please select an answer.");
        return;
    }
    userAnswers[currentQuestion] = selected.value;

    let score = 0;
    for (let i = 0; i < totalQuestions; i++) {
        if (userAnswers[i] === questions[i].correct) {
            score++;
        }
    }

    document.getElementById("quiz-form").style.display = "none";

    if (score === totalQuestions) {
        document.getElementById("quiz-screen").style.display = "none";
        document.getElementById("perfect-score-screen").style.display = "block";
    } else {
        const result = document.getElementById("result");
        result.innerText = `You got ${score} out of ${totalQuestions} correct!`;
        result.style.display = "block";
        document.getElementById("retry-button").style.display = "inline-block";
    }
}

function resetQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    document.getElementById("quiz-form").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("retry-button").style.display = "none";
    document.getElementById("home-screen").style.display = "block";
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("perfect-score-screen").style.display = "none";
}
