const knowledgeBase = [
  { topic: "all", keys: ["hello", "hi", "hey"], answer: "Hello! I'm Kitchen, and I can help with recipes, techniques, ingredient swaps, and food safety. What are you making?" },
  { topic: "recipes", keys: ["pancake", "pancakes"], answer: "Easy pancakes (serves 2)\nIngredients: 1 cup flour, 2 tbsp sugar, 2 tsp baking powder, 1/4 tsp salt, 3/4 cup milk, 1 egg, 2 tbsp melted butter.\n1. Whisk flour, sugar, baking powder, and salt.\n2. Whisk milk, egg, and butter separately; stir into the dry mix just until combined.\n3. Cook 1/4-cup portions on a lightly oiled medium pan. Flip when bubbles form and edges look set, then cook 1 more minute." },
  { topic: "recipes", keys: ["tomato pasta", "spaghetti", "pasta", "noodle"], answer: "Tomato pasta (serves 2)\nIngredients: 200 g spaghetti, 1 tbsp olive oil, 2 garlic cloves sliced, 400 g canned crushed tomatoes, salt, pepper, and basil.\n1. Boil the pasta in salted water until al dente; save 1/2 cup cooking water.\n2. Cook garlic in oil over medium-low heat for 30 seconds without browning it.\n3. Add tomatoes, salt, and pepper; simmer 10 minutes.\n4. Toss in pasta with a splash of cooking water. Finish with basil." },
  { topic: "recipes", keys: ["chicken curry", "curry"], answer: "Chicken curry (serves 4)\nIngredients: 1 tbsp oil, 1 diced onion, 2 minced garlic cloves, 1 tbsp grated ginger, 2 tbsp curry powder, 500 g diced boneless chicken, 400 g canned tomatoes, 200 ml coconut milk, salt.\n1. Soften onion in oil over medium heat for 5 minutes. Add garlic, ginger, and curry powder for 30 seconds.\n2. Add chicken and cook until the outside is no longer pink.\n3. Add tomatoes and coconut milk; simmer uncovered 15 to 20 minutes.\n4. Confirm chicken reaches 165 F / 74 C, season with salt, and serve with rice." },
  { topic: "recipes", keys: ["fried rice"], answer: "Vegetable fried rice (serves 2)\nIngredients: 3 cups cold cooked rice, 1 tbsp oil, 2 eggs, 1 cup mixed vegetables, 2 tbsp soy sauce, 1 sliced spring onion.\n1. Heat a wok or large pan until hot. Scramble eggs in a little oil, then remove.\n2. Stir-fry vegetables for 2 to 3 minutes.\n3. Add rice, break up clumps, and fry until hot.\n4. Add soy sauce, eggs, and spring onion; toss for 1 minute." },
  { topic: "recipes", keys: ["scrambled egg", "fluffy egg", "scrambled eggs"], answer: "Soft scrambled eggs (serves 1)\nIngredients: 2 eggs, 1 tsp butter, pinch of salt, pepper.\n1. Whisk eggs with salt until even.\n2. Melt butter in a nonstick pan over low heat.\n3. Add eggs and slowly fold with a spatula, scraping the pan as soft curds form.\n4. Remove while still slightly glossy, then add pepper. Serve immediately." },
  { topic: "ingredients", keys: ["instead of egg", "egg substitute", "replace egg", "vegan egg"], answer: "For one egg in baking, mix 1 tablespoon ground flaxseed with 3 tablespoons water; rest 5 minutes until thick. Use it in cookies, muffins, and pancakes. For recipes that need lift, use 1/4 cup unsweetened applesauce instead, but expect a softer result." },
  { topic: "techniques", keys: ["sear", "searing", "brown", "browning"], answer: "For a good sear, dry the food well, preheat the pan, add a high-smoke-point oil, and leave the food undisturbed until it releases easily. Avoid crowding the pan because steam prevents browning." },
  { topic: "ingredients", keys: ["substitute", "replacement", "instead of", "swap"], answer: "A useful substitution depends on the job the ingredient does: moisture, fat, structure, sweetness, or flavor. Tell me the ingredient and recipe, and I can suggest a practical swap." },
  { topic: "recipes", keys: ["recipe", "dinner", "meal", "what should i cook"], answer: "I have complete recipes for pancakes, scrambled eggs, tomato pasta, chicken curry, and vegetable fried rice. Ask for one by name, or tell me the dish you would like to make." },
  { topic: "techniques", keys: ["rice", "cook rice"], answer: "Basic white rice (serves 2)\nIngredients: 1 cup long-grain white rice, 1.5 cups water, pinch of salt.\n1. Rinse rice until the water is mostly clear.\n2. Bring rice, water, and salt to a boil.\n3. Cover, reduce to very low heat, and cook 15 minutes.\n4. Turn off heat and rest covered 10 minutes, then fluff with a fork." },
  { topic: "all", keys: ["chicken", "safe", "temperature", "undercooked"], answer: "Chicken is safe when the thickest part reaches 165 F or 74 C on a food thermometer. Let it rest for a few minutes before cutting. Color alone is not a reliable safety test." },
  { topic: "all", keys: ["thank", "thanks"], answer: "You're welcome. Tell me what ingredients you have, and we can make a plan." }
];
const facts = ["Salt enhances sweetness and helps balance bitter flavors.", "Resting meat after cooking gives its juices time to redistribute.", "Acid from lemon juice or vinegar can brighten a dish just before serving.", "A crowded pan steams food instead of browning it."];
const quizQuestions = [
  { question: "What temperature should cooked chicken reach?", answers: ["120 F", "145 F", "165 F", "190 F"], correct: 2 },
  { question: "Which step helps food brown in a pan?", answers: ["Crowd the pan", "Dry the food first", "Use a cold pan", "Keep stirring"], correct: 1 },
  { question: "What should you do with rice after it finishes cooking?", answers: ["Rinse it", "Rest it covered", "Freeze it", "Add ice"], correct: 1 }
];
const storageKey = "kitchen-chat-history-v1";
const conversation = document.querySelector("#conversation");
const form = document.querySelector("#chat-form");
const input = document.querySelector("#user-input");
const topicFilter = document.querySelector("#topic-filter");
const voiceButton = document.querySelector("#voice-input");
let factIndex = 0;
let lastIntent = null;
let quizIndex = 0;
let quizScore = 0;

function getReply(message) {
  const normalized = message.toLowerCase().replace(/[^a-z0-9 ]/g, " ");
  if (/^(more|tell me more|why|how does that work)/.test(normalized) && lastIntent) return `A little more about that: ${lastIntent.answer}`;
  const activeTopic = topicFilter.value;
  const match = knowledgeBase.find(({ topic, keys }) => (activeTopic === "all" || topic === activeTopic || topic === "all") && keys.some((key) => normalized.includes(key)));
  if (match) lastIntent = match;
  return match ? match.answer : `I don't have a complete recipe for that dish yet. I can give reliable recipes for pancakes, scrambled eggs, tomato pasta, chicken curry, and vegetable fried rice. Name one of those, or ask a cooking technique question.`;
}
function saveHistory() { localStorage.setItem(storageKey, conversation.innerHTML); }
function addMessage(text, sender, save = true) {
  const article = document.createElement("article"); article.className = `message ${sender}-message`;
  const avatar = document.createElement("div"); avatar.className = "avatar"; avatar.textContent = sender === "bot" ? "K" : "YOU";
  const bubble = document.createElement("div"); bubble.className = "bubble";
  const paragraph = document.createElement("p"); paragraph.textContent = text;
  const meta = document.createElement("span"); meta.className = "message-meta"; meta.textContent = sender === "bot" ? "KITCHEN / NOW" : "YOU / NOW";
  bubble.append(paragraph, meta);
  if (sender === "bot") {
    const feedback = document.createElement("button"); feedback.className = "feedback-button"; feedback.type = "button"; feedback.textContent = "Helpful";
    feedback.addEventListener("click", () => { feedback.textContent = "Thanks"; feedback.disabled = true; }); bubble.append(feedback);
  }
  article.append(avatar, bubble); conversation.append(article); conversation.scrollTop = conversation.scrollHeight;
  if (save) saveHistory();
}
function showThinking() {
  const thinking = document.createElement("article"); thinking.className = "message bot-message thinking"; thinking.id = "thinking-message";
  thinking.innerHTML = '<div class="avatar">K</div><div class="bubble"><p>Kitchen is thinking<span class="thinking-dots">...</span></p></div>';
  conversation.append(thinking); conversation.scrollTop = conversation.scrollHeight;
}
function submitQuestion(question) {
  const cleaned = question.trim(); if (!cleaned) return;
  addMessage(cleaned, "user"); input.value = ""; showThinking();
  window.setTimeout(() => { document.querySelector("#thinking-message")?.remove(); addMessage(getReply(cleaned), "bot"); }, 450);
}
function renderQuiz() {
  const quiz = quizQuestions[quizIndex % quizQuestions.length]; document.querySelector("#quiz-question").textContent = quiz.question;
  document.querySelector("#quiz-score").textContent = `SCORE ${quizScore} / ${quizIndex}`; document.querySelector("#quiz-feedback").textContent = "";
  const options = document.querySelector("#quiz-options"); options.innerHTML = "";
  quiz.answers.forEach((answer, index) => { const button = document.createElement("button"); button.type = "button"; button.textContent = answer; button.addEventListener("click", () => answerQuiz(index, button)); options.append(button); });
}
function answerQuiz(selected, button) {
  const quiz = quizQuestions[quizIndex % quizQuestions.length]; const buttons = document.querySelectorAll("#quiz-options button");
  buttons.forEach((item, index) => { item.disabled = true; if (index === quiz.correct) item.classList.add("correct"); });
  const right = selected === quiz.correct; if (right) quizScore += 1; else button.classList.add("incorrect");
  document.querySelector("#quiz-feedback").textContent = right ? "Correct. Loading the next question..." : `Not quite. The answer is ${quiz.answers[quiz.correct]}.`;
  quizIndex += 1; window.setTimeout(renderQuiz, 1100);
}
form.addEventListener("submit", (event) => { event.preventDefault(); submitQuestion(input.value); });
document.querySelectorAll("[data-question]").forEach((button) => button.addEventListener("click", () => submitQuestion(button.dataset.question)));
document.querySelector("#clear-chat").addEventListener("click", () => { conversation.innerHTML = ""; localStorage.removeItem(storageKey); addMessage("Conversation cleared. What would you like to cook next?", "bot"); input.focus(); });
document.querySelector("#next-fact").addEventListener("click", () => { factIndex = (factIndex + 1) % facts.length; document.querySelector("#fact-text").textContent = facts[factIndex]; });
document.querySelector("#quiz-toggle").addEventListener("click", () => { const panel = document.querySelector("#quiz-panel"); panel.hidden = !panel.hidden; if (!panel.hidden) renderQuiz(); document.querySelector("#quiz-toggle").textContent = panel.hidden ? "Start a quick quiz ->" : "Hide quiz ->"; });
topicFilter.addEventListener("change", () => addMessage(`Topic guide set to ${topicFilter.options[topicFilter.selectedIndex].text}.`, "bot"));
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition(); recognition.lang = "en-US"; recognition.interimResults = false;
  voiceButton.addEventListener("click", () => recognition.start());
  recognition.addEventListener("start", () => { voiceButton.classList.add("listening"); voiceButton.textContent = "LIVE"; });
  recognition.addEventListener("end", () => { voiceButton.classList.remove("listening"); voiceButton.textContent = "MIC"; });
  recognition.addEventListener("result", (event) => { input.value = event.results[0][0].transcript; input.focus(); });
} else { voiceButton.disabled = true; voiceButton.title = "Voice input is not available in this browser"; }
const savedHistory = localStorage.getItem(storageKey);
if (savedHistory) conversation.innerHTML = savedHistory;
