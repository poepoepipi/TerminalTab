const terminal = document.getElementById("terminal");

let name = localStorage.getItem("name") || "user";
let browser = localStorage.getItem("browser") || "Chrome";
let searchEngine = localStorage.getItem("searchEngine") || "DuckDuckGo";


function createPrompt() {
    const prompt = document.createElement("div");
    prompt.className = "prompt";

    const input = document.createElement("input");
    input.type = "text";
    input.autofocus = true;

    prompt.appendChild(input);
    terminal.appendChild(prompt);

    input.focus();

    input.addEventListener("keydown", function (event) {
        if (event.key !== "Enter") return;

        const command = input.value.trim().toLowerCase();

        input.disabled = true;

        if (command === "help") {
            const output = document.createElement("div");
            output.innerHTML =
`Available commands:
help - Show this menu
search - search something on the internet
bookmark - show, search, or edit bookmarks
clear - Clear the terminal
neofetch - Does the cool thingy
about - Info about the project
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
            output.innerHTML = `
        About The project
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
            setup();
            return;
        }

        else if (command === "search") {
            const output = document.createElement("div");
            output.innerHTML = `
        Search doesn't work yet.
        `;
            terminal.appendChild(output);
            createPrompt();
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
            const output = document.createElement("div");
            output.innerHTML = `
        Bookmarks don't work yet.
        `;
            terminal.appendChild(output);
            createPrompt();
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

async function setup() {
    let name = localStorage.getItem("name") || "user";
    let browser = localStorage.getItem("browser") || "Chrome";
    let searchEngine = localStorage.getItem("searchEngine") || "DuckDuckGo";

    // Question 1
    name = await createPrompt("What is your name?");
    localStorage.setItem("name", name);

    // Question 2
    while (true) {
        const answer = await createPrompt(
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

        if (answer === "1") {
            browser = "Google";
            localStorage.setItem("browser", browser);
            break;
        } else if (answer === "2") {
            browser = "Bing";
            localStorage.setItem("browser", browser);
            break;
        } else if (answer === "3") {
            browser = "DuckDuckGo";
            localStorage.setItem("browser", browser);
            break;
        } else if (answer === "4") {
            browser = "Yahoo!";
            localStorage.setItem("browser", browser);
            break;
        } else if (answer === "5") {
            browser = "Yandex";
            localStorage.setItem("browser", browser);
            break;
        } else if (answer === "6") {
            browser = "Baidu";
            localStorage.setItem("browser", browser);
            break;
        } else if (answer === "7") {
            browser = "Ecosia";
            localStorage.setItem("browser", browser);
            break;
        } else if (answer === "8") {
            browser = "Internet Archive";
            localStorage.setItem("browser", browser);
            break;
        } else if (answer === "9") {
            browser = "Brave";
            localStorage.setItem("browser", browser);
            break;
        } else {
            await createPrompt("Invalid choice. Please enter 1, 2, 3, 4, 5, 6, 7, 8, or 9.");
        }
    }

    // Question 3
    while (true) {
        const answer = await createPrompt(
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

        if (answer === "1") {
            searchEngine = "Google";
            localStorage.setItem("searchEngine", searchEngine);
            break;
        } else if (answer === "2") {
            searchEngine = "Bing";
            localStorage.setItem("searchEngine", searchEngine);
            break;
        } else if (answer === "3") {
            searchEngine = "DuckDuckGo";
            localStorage.setItem("searchEngine", searchEngine);
            break;
        } else if (answer === "4") {
            searchEngine = "Yahoo!";
            localStorage.setItem("searchEngine", searchEngine);
            break;
        } else if (answer === "5") {
            searchEngine = "Yandex";
            localStorage.setItem("searchEngine", searchEngine);
            break;
        } else if (answer === "6") {
            searchEngine = "Baidu";
            localStorage.setItem("searchEngine", searchEngine);
            break;
        } else if (answer === "7") {
            searchEngine = "Ecosia";
            localStorage.setItem("searchEngine", searchEngine);
            break;
        } else if (answer === "8") {
            searchEngine = "Internet Archive";
            localStorage.setItem("searchEngine", searchEngine);
            break;
        } else if (answer === "9") {
            searchEngine = "Brave";
            localStorage.setItem("searchEngine", searchEngine);
            break;
        } else {
            await createPrompt("Invalid choice. Please enter 1, 2, 3, 4, 5, 6, 7, 8, or 9.");
        }
    }

    console.log(name);
    console.log(browser);
    console.log(searchEngine);
}