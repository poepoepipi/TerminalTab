const terminal = document.getElementById("terminal");

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
help   - Show this menu
clear  - Clear the terminal
neofetch - Does the cool thingy
about - Info about the project`;
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
    ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗  ████████╗ █████╗ ██████╗     user@terminaltab
    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║  ╚══██╔══╝██╔══██╗██╔══██╗    -------------
       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     ██║   ███████║██████╔╝    OS: TerminalTab
       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     ██║   ██╔══██║██╔══██╗    Host: New Tab
       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗██║   ██║  ██║██████╔╝    Shell: website-terminal 
       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝  ╚═╝╚═════╝     Uptime: Since you opened this page
                                                                                               Language: HTML / CSS / JavaScript
                                                                                               Status: idk
        </pre>
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