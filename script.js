// Variables
const terminal = document.getElementById("terminal");
new MutationObserver(() => {
    terminal.scrollTop = terminal.scrollHeight;
}).observe(terminal, { childList: true, subtree: true });

const bookmarks = localStorage.getItem("bookmarks");

const commandHistory = [];

let name = localStorage.getItem("name") || "user";
let browser = localStorage.getItem("browser") || "Chrome";
let searchEngine = localStorage.getItem("searchEngine") || "DuckDuckGo";

document.documentElement.style.setProperty("--username", `"${name}"`);

const searchUrls = {
    "Google": "https://www.google.com/search?q=",
    "Bing": "https://www.bing.com/search?q=",
    "DuckDuckGo": "https://duckduckgo.com/?q=",
    "Yahoo!": "https://search.yahoo.com/search?p=",
    "Yandex": "https://yandex.com/search/?text=",
    "Baidu": "https://www.baidu.com/s?wd=",
    "Ecosia": "https://www.ecosia.org/search?q=",
    "Internet Archive": "https://archive.org/search?query=",
    "Brave": "https://search.brave.com/search?q="
};

const browserNames = {
    "1": "Google", "2": "Chrome", "3": "Safari", "4": "Firefox",
    "5": "Edge", "6": "Brave", "7": "Opera", "8": "Internet Explorer", "9": "Other"
};
const searchEngineNames = {
    "1": "Google", "2": "Bing", "3": "DuckDuckGo", "4": "Yahoo!",
    "5": "Yandex", "6": "Baidu", "7": "Ecosia", "8": "Internet Archive", "9": "Brave"
};


// Commands
function createPrompt() {
    const prompt = document.createElement("div");
    prompt.className = "prompt";

    const input = document.createElement("input");
    input.type = "text";
    input.autofocus = true;

    prompt.appendChild(input);
    terminal.appendChild(prompt);

    input.focus();

    let historyIndex = commandHistory.length;

    input.addEventListener("keydown", async function (event) {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (commandHistory.length === 0) return;
            if (historyIndex > 0) historyIndex--;
            input.value = commandHistory[historyIndex];
            moveCursorToEnd(input);
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = "";
            }
            moveCursorToEnd(input);
            return;
        }

        if (event.key !== "Enter") return;

        const command = input.value.trim().toLowerCase();

        if (input.value.trim() !== "") {
            commandHistory.push(input.value.trim());
        }

        input.disabled = true;

        if (command === "help") {
            const output = document.createElement("div");
            output.innerHTML =
`Available commands:
help - Show this menu
search - search something on the internet
bookmark - show, search, or edit bookmarks
clear - Clear the terminal
fastcom - shows info about fast commands (shortcuts)
about - Info about the project
neofetch - Does the cool thingy
info - shows the info you gave in setup
setup - plays setup sequence (removes old settings)`;
            terminal.appendChild(output);
            createPrompt();
            return;
        }

        else if (command === "clear") {
            terminal.innerHTML = "";
            createPrompt();
            return;
        }

        else if (command === "about") {
            const output = document.createElement("div");
            output.innerHTML = 
`TerminalTab is a free and open-source projects that let's you search the internet, manage bookmarks, and more,
all from a terminal-like interface in your browser, 
providing a unique user experience for those who enjoy using command-line interfaces.

To learn more about the project, visit the GitHub repository and read the README.md

Project by: poepoepipi (on github)
website: https://poepoepipi.github.io
`;
            terminal.appendChild(output);
            createPrompt();
            return;
        }

        if (command === "fastcom") {
            const output = document.createElement("div");
            output.innerHTML =
`Available commands:
search --searchquery - searches immediatly
bookmark --bookmarkName - open's the bookmark
`;
            terminal.appendChild(output);
            createPrompt();
            return;
        }

        else if (command === "neofetch") {
            const output = document.createElement("div");
            output.innerHTML = `
        <pre>
████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗  ████████╗ █████╗ ██████╗     ${name}@terminaltab
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║  ╚══██╔══╝██╔══██╗██╔══██╗    -------------
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     ██║   ███████║██████╔╝    OS: TerminalTab
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     ██║   ██╔══██║██╔══██╗    Host: New Tab
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗██║   ██║  ██║██████╔╝    browser: ${browser}
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝  ╚═╝╚═════╝     search engine: ${searchEngine}
                                                                                           Language: HTML / CSS / JavaScript
                                                                                           Uptime: Since you opened this page
        </pre>
        `;
            terminal.appendChild(output);
            createPrompt();
            return;
        }

        else if (command === "setup") {
            await setup();
            return;
        }

        else if (command === "search") {
            await promptSearch();
            return;
        }

        else if (command === "info") {
            const output = document.createElement("div");
            output.innerHTML = `
name = ${name}
Browser = ${browser}
Search Engine = ${searchEngine}
        `;
            terminal.appendChild(output);
            createPrompt();
            return;
        }

        else if (command === "bookmark") {
            await bookmark();
            return;
        }


        else if (command.startsWith("search --")) {
            const query = command.substring(9).trim();

            if (!query) {
                const output = document.createElement("div");
                output.innerHTML = `Please provide a search query.`;
                terminal.appendChild(output);
                createPrompt();
                return;
            }

            const searchUrls = {
                "Google": "https://www.google.com/search?q=",
                "Bing": "https://www.bing.com/search?q=",
                "DuckDuckGo": "https://duckduckgo.com/?q=",
                "Yahoo!": "https://search.yahoo.com/search?p=",
                "Yandex": "https://yandex.com/search/?text=",
                "Baidu": "https://www.baidu.com/s?wd=",
                "Ecosia": "https://www.ecosia.org/search?q=",
                "Internet Archive": "https://archive.org/search?query=",
                "Brave": "https://search.brave.com/search?q="
            };

            window.location.href =
                searchUrls[searchEngine] + encodeURIComponent(query);

            return;
        }

        else if (command.startsWith("bookmark --")) {
            const bookmarkName = command.substring(11).trim();

            const bookmarks =
                JSON.parse(localStorage.getItem("bookmarks")) || {};

            if (!bookmarks[bookmarkName]) {
                const output = document.createElement("div");
                output.innerHTML = `Bookmark "${bookmarkName}" doesn't exist.`;
                terminal.appendChild(output);
                createPrompt();
                return;
            }

            window.location.href = bookmarks[bookmarkName].url;

            return;
        }

        else if (command !== "") {
            const output = document.createElement("div");
            output.textContent = `Unknown command: ${command}`;
            terminal.appendChild(output);
            createPrompt();
            return;
        }

        createPrompt();
    });
}

createPrompt();

// helper functions
function ask(question) {
    return new Promise((resolve) => {
        if (question) {
            const label = document.createElement("div");
            label.textContent = question;
            label.style.whiteSpace = "pre-line";
            terminal.appendChild(label);
        }

        const prompt = document.createElement("div");
        prompt.className = "prompt answer";

        const input = document.createElement("input");
        input.type = "text";
        input.autofocus = true;
        prompt.appendChild(input);
        terminal.appendChild(prompt);
        input.focus();

        input.addEventListener("keydown", function handler(event) {
            if (event.key !== "Enter") return;
            const value = input.value.trim();
            input.disabled = true;
            input.removeEventListener("keydown", handler);
            resolve(value);
        });
    });
}

function print(text) {
    const output = document.createElement("div");
    output.style.whiteSpace = "pre-line";
    output.textContent = text;
    terminal.appendChild(output);
}

function moveCursorToEnd(input) {
    input.setSelectionRange(input.value.length, input.value.length);
}


// Other functions
async function setup() {

    // Question 1
    name = await ask("What is your name?");
    localStorage.setItem("name", name);
    document.documentElement.style.setProperty("--username", `"${name}"`);

    // Question 2
    while (true) {
        const answer = await ask(
            "Which Browser do you use? (answer with the number of the Browser)\n" +
            "1. Google\n" +
            "2. Chrome\n" +
            "3. Safari\n" +
            "4. Firefox\n" +
            "5. Edge\n" +
            "6. Brave\n" +
            "7. Opera\n" +
            "8. Internet Explorer\n" +
            "9. Other"
        );

        if (browserNames[answer]) {
            browser = browserNames[answer];
            localStorage.setItem("browser", browser);
            break;
        } else {
            await ask("Invalid choice. Please enter 1, 2, 3, 4, 5, 6, 7, 8, or 9.");
        }
    }

    // Question 3
    while (true) {
        const answer = await ask(
            "Which search engine do you want to use? (answer with the number of the search engine)\n" +
            "1. Google\n" +
            "2. Bing\n" +
            "3. DuckDuckGo\n" +
            "4. Yahoo!\n" +
            "5. Yandex\n" +
            "6. Baidu\n" +
            "7. Ecosia\n" +
            "8. Internet Archive\n" +
            "9. Brave"
        );

        if (searchEngineNames[answer]) {
            searchEngine = searchEngineNames[answer];
            localStorage.setItem("searchEngine", searchEngine);
            break;
        } else {
            await ask("Invalid choice. Please enter 1, 2, 3, 4, 5, 6, 7, 8, or 9.");
        }
    }

    console.log(name);
    console.log(browser);
    console.log(searchEngine);

    createPrompt();
}

async function promptSearch() {
    const query = await ask("What do you want to search?");
    performSearch(query);
}

function performSearch(query) {
    const baseUrl = searchUrls[searchEngine];

    if (!baseUrl) {
        console.error("Unknown search engine:", searchEngine);
        createPrompt();
        return;
    }

    const url = baseUrl + encodeURIComponent(query);

    window.location.href = url;
}

async function bookmark() {
    const bookmarks = localStorage.getItem("bookmarks");
    const bookmarkTask = await ask("Do you want to 'add', 'list', 'delete', or 'open' bookmarks? (type what's between brackets): ")
    if (bookmarkTask === "add") {
        await bookmarkEdit();
        return;
    }
    else if (bookmarkTask === "list") {
        await bookmarkList();
        return;
    }
    else if (bookmarkTask === "delete") {
        await bookmarkDelete();
        return;
    }
    else if (bookmarkTask === "open") {
        await bookmarkUse();
        return;
    }
    else {
        print(`Unknown option "${bookmarkTask}".`);
        createPrompt();
        return;
    }
}

async function bookmarkEdit() {
    const name = await ask("What should the bookmark be called?");

    const url = await ask("What is the URL?");

    if (!name || !url) {
        print("Bookmark name and URL cannot be empty.");
        createPrompt();
        return;
    }

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};

    bookmarks[name] = {
        name: name,
        url: url
    };

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    print(`Bookmark "${name}" saved.`);
    createPrompt();
}


async function bookmarkList() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    const keys = Object.keys(bookmarks);

    if (keys.length === 0) {
        print("You don't have any bookmarks.");
        createPrompt();
        return;
    }

    let output = "Bookmarks:\n";
    keys.forEach((key, index) => {
        output += `${index + 1}. ${bookmarks[key].name} - ${bookmarks[key].url}\n`;
    });

    print(output);
    createPrompt();
}

async function bookmarkDelete() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};

    const keys = Object.keys(bookmarks);

    if (keys.length === 0) {
        print("You don't have any bookmarks.");
        createPrompt();
        return;
    }

    let output = "Bookmarks:\n";

    keys.forEach((key, index) => {
        output += `${index + 1}. ${bookmarks[key].name}\n`;
    });

    const answer = await ask(output + "\nWhich bookmark do you want to delete? (Type it's number)");

    const choice = Number(answer);

    if (choice < 1 || choice > keys.length || !Number.isInteger(choice)) {
        print("Invalid bookmark.");
        createPrompt();
        return;
    }

    const bookmarkName = keys[choice - 1];

    delete bookmarks[bookmarkName];

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    print(`Bookmark "${bookmarkName}" deleted.`);
    createPrompt();
}

async function bookmarkUse() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};

    const keys = Object.keys(bookmarks);

    if (keys.length === 0) {
        print("You don't have any bookmarks.");
        createPrompt();
        return;
    }

    let output = "Bookmarks:\n";

    keys.forEach((key) => {
        output += `- ${bookmarks[key].name}\n`;
    });

    const answer = await ask(output + "\nWhich bookmark do you want to use? (Type it's name)");

    const bookmark = bookmarks[answer];

    if (!bookmark) {
        print("Invalid bookmark.");
        createPrompt();
        return;
    }

    window.location.href = bookmark.url;
}