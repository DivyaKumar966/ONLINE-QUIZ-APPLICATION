
// Quiz questions
const questions = [
    { question: "Which Programming language is used for Web Application?", options: ["Java", "Python", "JavaScript", "C++"], answer: "JavaScript" },
    { question: "Which HTML tag is used to create a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], answer: "<a>" },
    { question: "Which CSS property is used for text color?", options: ["font-color", "text-color", "color", "background-color"], answer: "color" },
    { question: "Which keyword is used to declare a variable in JS?", options: ["var", "let", "const", "float"], answer: "var" },
    { question: "Which database is NoSQL?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: "MongoDB" },
    { question: "Which of the following is a frontend framework?", options: ["Node.js", "Express.js", "React.js", "MongoDB"], answer: "React.js" },
    { question: "Which of the following is a backend framework for Node.js?", options: ["Vue.js", "Angular", "React.js", "Express.js"], answer: "Express.js" },
    { question: "What does CRUD stand for ?", options: ["Create,Read,Undo,Delete", "Create,Read,Update,Delete", "Create,Run,Upload,Download", "Connect,Read,Update,Deploy"], answer: "Create,Read,Update,Delete" },
    { question: "Which HTTP method is used to update data?", options: ["GET", "POST", "PUT", "DELETE"], answer: "PUT" },
    { question: "Which tool is used to manage project dependencies in Node.js?", options: ["Git", "npm", "Docker", "Babel"], answer: "npm" },
    { question: "Which of the following is a relational database?", options: ["MySQL", "MongoDB", "Firebase", "Redis"], answer: "MySQL" },
    { question: "Which command initializes a Node.js project?", "options": ["node init", "npm install", "npm init", "node install"], answer: "npm init" },
    { question: "Which of these is a templating engine?", "options": ["EJS", "JSX", "XML", "JSON"], answer: "EJS" },
    { question: "Which protocol is used to transfer web pages?", "options": ["FTP", "SMTP", "HTTP", "SSH"], answer: "HTTP" },
    { question: "Which of the following is used for version control?", "options": ["Git", "Postman", "Docker", "Jenkins"], answer: "Git" },
    { question: "Which of these is a frontend build tool?", "options": ["Webpack", "MongoDB", "Express", "SQL"], answer: "Webpack" },
    { question: "Which of the following is used to test APIs?", "options": ["GitHub", "Postman", "Firebase", "Canva"], answer: "Postman" },
    { question: "Which of the following is a CSS framework?", "options": ["React", "Bootstrap", "Node.js", "Express"], answer: "Bootstrap" },
    { question: "Which platform is used to deploy full stack apps?", "options": ["Canva", "Heroku", "Figma", "Photoshop"], answer: "Heroku" },
    { question: "Which of the following is a backend language?", "options": ["HTML", "CSS", "Python", "React"], answer: "Python" }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.querySelector(".questions");
const optionsEl = document.querySelector(".options");
// header scoreStat removed; only sidebar `scoreValue` is used
const quesStat = document.getElementById("quesstat");
const scoreValue = document.getElementById("scoreValue");
const nextBtn = document.getElementById("next-btn");
const skipBtn = document.getElementById("skip-btn");
const prevBtn = document.getElementById("prev-btn");
// header timerStat removed; only sidebar `time` circle is used
const timeCircle = document.querySelector(".time");
const progressFill = document.querySelector(".progressFill");
const welcomeText = document.getElementById('welcomeText');
const logoutBtn = document.getElementById('logoutBtn');
const serverStatus = document.getElementById('serverStatus');
const startBtn = document.getElementById('startBtn');
const controlsEl = document.querySelector('.controls');
const startArea = document.querySelector('.startArea');

// Show user name
let user = JSON.parse(localStorage.getItem("quizUser"));
if (user) {
    welcomeText.innerText = `Welcome ${user.name}, Best of Luck!`;
} else {
    // if no user, redirect to login
    window.location.href = 'index.html';
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('quizUser');
        window.location.href = 'index.html';
    });
}

// Load Question
function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    startTimer();

    const q = questions[currentQuestion];
    questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;
    optionsEl.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(btn, opt, q.answer);
        optionsEl.appendChild(btn);
    });

    quesStat.textContent = `${currentQuestion + 1} / ${questions.length}`;
    nextBtn.disabled = true;
    prevBtn.disabled = currentQuestion === 0;
    updateProgress();
}

function showControls(show) {
    controlsEl.style.display = show ? 'block' : 'none';
    startArea.style.display = show ? 'none' : 'block';
    // show/hide question and options
    questionEl.style.display = show ? '' : 'none';
    optionsEl.style.display = show ? '' : 'none';
    // show/hide timer circle
    if (timeCircle) timeCircle.style.visibility = show ? 'visible' : 'hidden';
}

// Timer
function startTimer() {
    timeCircle.textContent = timeLeft + "s";

    timer = setInterval(() => {
        timeLeft--;
        timeCircle.textContent = timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            autoSkip();
        }
    }, 1000);
}

// Auto Skip
function autoSkip() {
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);
    nextBtn.disabled = false;
}

// Check Answer
function checkAnswer(button, selected, correct) {
    clearInterval(timer);
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        button.classList.add("correct");
        score++;
        // update sidebar score only
        scoreValue.textContent = `${String(score).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
    } else {
        button.classList.add("wrong");
        buttons.forEach(btn => {
            if (btn.textContent === correct) btn.classList.add("correct");
        });
    }
    nextBtn.disabled = false;
}

function updateProgress() {
    const pct = Math.round((currentQuestion / (questions.length - 1)) * 100);
    progressFill.style.width = `${pct}%`;
}

// Next
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) loadQuestion();
    else quizOver();
});

// Start button handler
if (startBtn) {
    startBtn.addEventListener('click', () => {
        // start the quiz
        showControls(true);
        loadQuestion();
    });
}

// Previous
prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

// Skip
skipBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) loadQuestion();
    else quizOver();
});

// Quiz Over + Rankings
async function quizOver() {
    clearInterval(timer);
    questionEl.textContent = "🎉 Quiz Completed!";
    optionsEl.innerHTML = "";
    showControls(false);

    // Show final score in the score area
    // update sidebar score display
    scoreValue.textContent = `${String(score).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;

    // Send score to server
    if (user && user.name && user.email) {
        try {
            const res = await fetch('http://localhost:3000/api/score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: user.name, email: user.email, score })
            });
            const data = await res.json();
            if (data && data.success) {
                serverStatus.textContent = 'Score saved to server.';
            } else {
                serverStatus.textContent = 'Could not save score to server.';
            }
        } catch (err) {
            serverStatus.textContent = 'Server unreachable. Score not saved.';
            console.error('Error saving score:', err);
        }
    }

    // Fetch rankings
    await loadRankings();
}

// Fetch and display rankings
async function loadRankings() {
    const list = document.querySelector('.namelistys');
    list.innerHTML = 'Loading...';
    try {
        const res = await fetch('http://localhost:3000/api/rankings');
        if (!res.ok) throw new Error('Network error');
        const rankings = await res.json();
        list.innerHTML = '';
        if (rankings.length === 0) {
            list.innerHTML = '<div>No rankings yet</div>';
            return;
        }
        rankings.forEach(r => {
            const div = document.createElement('div');
            div.innerHTML = `<span>${r.name}</span><span>${r.score}</span>`;
            list.appendChild(div);
        });
        serverStatus.textContent = '';
    } catch (err) {
        list.innerHTML = '<div>Unable to load rankings</div>';
        serverStatus.textContent = 'Unable to fetch rankings from server.';
        console.error('Error fetching rankings:', err);
    }
}

// Initialize UI: hide quiz content and timer until user starts
showControls(false);

// Try load rankings at startup (non-blocking)
loadRankings();