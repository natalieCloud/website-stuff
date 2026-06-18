class Navbar {
    constructor() {
        this.time = "";
        this.toggled = false;
        this.prog_map = {
            "art-prog": { "shown": false, "max": false, "min": false },
            "cv-prog": { "shown": false, "max": false, "min": false },
            "duck-prog": { "shown": false, "max": false, "min": false },
            "txt-prog": { "shown": false, "max": false, "min": false },
            "file-prog": { "shown": false, "max": false, "min": false },
            "music-prog": { "shown": false, "max": false, "min": false },
            "plant-prog": { "shown": false, "max": false, "min": false },
            "term-prog": { "shown": false, "max": false, "min": false },
            "trash-prog": { "shown": false, "max": false, "min": false },
        }
        this.art = ["jupiter", "jfsp", "reigen", "ram", "mmask", "musik", "gsnk", "hmc", "collection", "vest", "mtg", "saiki", "hs", "ssb"];
        this.modulo = 14;
        this.day = new Date();
        this.day.setHours(0, 0, 0, 0);
    }

    log() {
        console.log('Add Popup');
    }
    toggle_popup() {
        this.toggled = !this.toggled;
        let menu = document.getElementById("menu-container");
        if (this.toggled) {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
        console.log(this.toggled);
    }

    add_icon(icon_name) {
        var nicon = icon_name.substring(0, icon_name.length - 5);
        console.log("adding button " + nicon);
        var open_prog = document.createElement('button');
        open_prog.setAttribute('id', `${nicon}-icon`);
        open_prog.setAttribute('class', `running-icons ${nicon}`);
        open_prog.setAttribute('onclick', `navbar.toggle_min('${icon_name}')`);
        open_prog.innerHTML = "";
        let t_c = document.getElementById("task-buttons");
        t_c.appendChild(open_prog);
    }

    remove_icon(icon_name) {
        console.log("removing div");
        var nicon = icon_name.substring(0, icon_name.length - 5);
        var child_to_abort = document.getElementById(`${nicon}-icon`);
        let t_c = document.getElementById("task-buttons");
        t_c.removeChild(child_to_abort);
    }

    time_function() {
        var date = new Date();
        document.getElementById("clock").innerHTML = date.toLocaleTimeString(navigator.language || 'en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        if (this.day > date.setHours(0, 0, 0, 0)) {
            this.day = date;
            this.change_song();
        } ;
        let t = setTimeout('navbar.time_function()', 10000);
    }

    toggle_item(icon_name) {
        console.log("pushed " + icon_name);
        let prog = document.getElementById(icon_name);
        let p = this.prog_map[icon_name];
        p["min"] = !p["min"];
        p["shown"] = !p["shown"];
        if (p["shown"]) {
            prog.style.display = "block";
            console.log(prog.style.display);
        } else {
            prog.style.display = "none";
        }
        console.log(p);
    }

    toggle_close(icon_name) {
        let prog = document.getElementById(icon_name);
        let p = this.prog_map[icon_name];
        p["shown"] = !p["shown"];
        if (!p["shown"]) {
            p["min"] = false;
            prog.style.width = "700px";
            prog.style.height = "500px";
            prog.style.display = "none";
            console.log("closed " + icon_name);
            navbar.remove_icon(icon_name);
            if (icon_name === 'term-prog') {
                document.getElementById("baseball_stat_1").value = "";
                document.getElementById("history").innerHTML = "";
            }
            if (icon_name === 'art-prog') {
                for (const elem of document.getElementsByClassName('art-page')) {
                    elem.style.display = "none"
                }
            }
        }
    }

    toggle_show(icon_name) {
        let prog = document.getElementById(icon_name);
        let p = this.prog_map[icon_name];
        p["shown"] = !p["shown"];
        if (p["shown"]) {
            p["min"] = true;
            prog.style.width = "700px";
            prog.style.height = "500px";
            prog.style.display = "flex";
            navbar.add_icon(icon_name);
            console.log("opened " + icon_name);
            if (icon_name === 'term-prog') {
                document.getElementById("baseball_stat_1").focus();
            }
            else if (icon_name === 'art-prog') {
                document.getElementById("jupiter").style.display = "flex";
            }
            else if (icon_name === 'music-prog') {
                this.change_song(this.day);
            }

        }
    }

    toggle_min(icon_name) {
        let prog = document.getElementById(icon_name);
        let p = this.prog_map[icon_name];
        p["min"] = !p["min"];
        p["shown"] = true;
        if (p["min"]) {
            prog.style.display = "flex";
            console.log("minimized " + icon_name);
        } else {
            prog.style.display = "none";
            console.log("un-minimized " + icon_name);
        }
    }

    toggle_max(icon_name) {
        let prog = document.getElementById(icon_name);
        let p = this.prog_map[icon_name];
        p["max"] = !p["max"];
        if (p["max"]) {
            prog.style.width = "100%";
            prog.style.height = "100%";
            console.log("minimized " + icon_name);
        } else {
            prog.style.width = "700px";
            prog.style.height = "500px";
            console.log("un-minimized " + icon_name);
        }
    }

    sendEmail() {
        window.location = "mailto:ntchmura@proton.me";
    }

    restart() {
        window.location.reload();
    }

    wakeup() {
        console.log("removing div");
        var child_to_abort = document.getElementById('sleep-overlay');
        document.body.removeChild(child_to_abort);
    }

    sleep() {
        console.log("adding div");
        var sleepDiv = document.createElement('div');
        sleepDiv.setAttribute('id', 'sleep-overlay');
        sleepDiv.setAttribute('class', 'sleep-overlay');
        sleepDiv.setAttribute('onmousemove', 'navbar.wakeup()');
        sleepDiv.setAttribute('onclick', 'navbar.wakeup()');
        sleepDiv.innerHTML = "";
        document.body.appendChild(sleepDiv);
    }

    power() {
        window.close();
    }

    submitTerm() {
        var input = document.getElementById('baseball_stat_1').value;
        console.log(input);
    }

    change_song(up_date) {
        let month_key = up_date.toLocaleString('en-US', {month: 'long'}).toLowerCase();
        let day_key = up_date.toLocaleString('en-US', {day: 'numeric'});
        console.log(day_key)
        let artist = daily_songs["daily song recs"][month_key][day_key]["artist"];
        let title = daily_songs["daily song recs"][month_key][day_key]["title"];
        document.getElementById("daily-songs").innerHTML = `<h4 style="text-align: center;">${title}; ${artist}<h4>`
    }

    go_prev(idx) {
        var prev;
        let me = this.art[idx];
        if (idx === 0) {
            prev = this.art[13];
        } else {
            prev = this.art[idx - 1];
        }
        document.getElementById(me).style.display = "none";
        document.getElementById(prev).style.display = "flex";
    }

    go_next(idx) {
        var prev;
        let me = this.art[idx];
        if (idx === 13) {
            prev = this.art[0];
        } else {
            prev = this.art[idx + 1];
        }
        document.getElementById(me).style.display = "none";
        document.getElementById(prev).style.display = "flex";
    }

    checked() {
        let t_btn = document.getElementById("trash-button");
        t_btn.disabled = !t_btn.disabled;
    }

    empty() {
        var child_to_abort = document.getElementById('trash-item');
        let t_c = child_to_abort.parentNode
        t_c.removeChild(child_to_abort);
    }
}

const pleasedontlookatthecodebeneththisbecauseofspoilers="Please and thank you so much after you discover everything then feel free to look around.";

const State = {
    FacingR: "FacingR",
    FacingL: "FacingL",
    Swim: "Swim",
    Idle: "Idle",
    Blink: "Blink",
    Quack: "Quack"
}

class DucktopBuddy {
    constructor() {
        this.state = State.IdleL;
        this.duckDraw = this.loadContent();
    }

    loadContent() { }

    swim() { }

    idle() { }

    quack() { }

    blink() { }

    runClean() { }

    runInterrupt() { }

    update() { 
        var mvidl = Math.floor(Math.random() * 4);
        var dur = Math.floor(Math.random() * 8);
        var intr = Math.floor(Math.random() * 10);

        if (mvidl === 0){
            if (intr === 0) {
                this.runInterrupt(this.idle, dur, this.blink)
            } else if (intr === 9) {
                this.runInterrupt(this.idle, dur, this.quack)
            } else {
                this.runClean(this.idle, dur)
            }
        } else {
            if (intr === 0) {
                this.runInterrupt(this.move, dur, this.blink)
            } else if (intr === 9) {
                this.runInterrupt(this.move, dur, this.quack)
            } else {
                this.runClean(this.move, dur)
            }
        }

        this.draw();
        let t = setTimeout('navbar.time_function()', 10000);
    }

    draw() { }
}

class Terminal {
    constructor() {
        this.preface = 'guest@natchm-website:';
        this.addendum = '~$'
        this.looking = false;
        this.location = term_out.terminal.file_sys;
    }

    nav_parent(its_rough_but_works) {
        if (its_rough_but_works === "/") {
            return "At the top level";
        } else if (its_rough_but_works === "./") {
            this.addendum = '~$';
            this.location = term_out.terminal.file_sys;
            return "";
        } else if (its_rough_but_works === "installed_programs/") {
            this.addendum = 'installed_programs$';
            this.location = term_out.terminal.file_sys.installed_programs;
            return "";
        } else if (its_rough_but_works === "website_content/") {
            this.addendum = 'website_content$';
            this.location = term_out.terminal.file_sys.website_content;
            return "";
        } else {
            console.log(its_rough_but_works);
            return `${its_rough_but_works} is not valid`;
        }
    }

    nav_child(its_rough_but_works) {
        this.location = this.location[its_rough_but_works]
        this.addendum = this.location.name.substring(0, this.location.name.length - 1) + '$';
    }

    parse_command() {
        var input = document.getElementById('baseball_stat_1').value;
        var leaf = document.createElement('div');
        leaf.setAttribute('class', 'term-history');
        leaf.innerHTML = this.preface + this.addendum + " " + input;
        document.getElementById('history').appendChild(leaf)
        document.getElementById('history').appendChild(this.fetch_outcome(input));
        document.getElementById('history').lastChild.scrollIntoView();
        document.getElementById('baseball_stat_1').value = '';
    }

    fetch_outcome(input_key) {
        var leaf = document.createElement('div');
        leaf.setAttribute('class', 'term-history');

        const [first, ...rest] = input_key.split(" ");
        const input = first;
        const remaining = rest.join(" ");

        console.log(input);

        if (remaining.length === 0) {
            if (input === "list") {
                leaf.innerHTML = this.print_list(this.location);
            } else if (input === "tree"){
                leaf.innerHTML = this.print_tree("", 0, this.location);
            } else if (input === "help"){
                leaf.innerHTML = term_out.terminal["help"][""];
                // leaf.innerHTML = this.print_tree("", -1, this.location);
            }
        }
        else {
            if (input === "help" && term_out.terminal["help"][remaining]) {
                leaf.innerHTML = term_out.terminal["help"][remaining];
            } else {
                leaf.innerHTML = this.change_dir(remaining) 
            }
        }

        // let found = term_out.alias[input_key];
        // if (found) {
        //     leaf.innerHTML = term_out.output[found]
        // } else { leaf.innerHTML = "</br>"; }
        // leaf.innerHTML = term_out.term["file-sys"][""];
        //leaf.innerHTML = this.print_list();
        
        //leaf.innerHTML = this.print_tree("", -1, this.location);
        return leaf;
    }

    show_file() {

    }

    run_program() {
        
    }

    print_tree(out_str, level, dir) {

        let branches = "";

        for (var i = 1; i < level; i++) {
            branches += " | &emsp;"
        }

        if (level !== 0) {
            branches += " L";
        }

        if (Array.isArray(dir)) {
            for (var j = 0; j < dir.length; j++) {
                out_str = out_str  + branches + ` ${dir[j]}</br>`;
                // + " | &emsp;"
            }
            return out_str;
        }
        
        out_str = out_str + branches + ` ${dir.name} </br>`;
        for (var ch in dir) {
            var child = dir[ch];
            if (typeof child === "object") {
                console.log(child);
                out_str = this.print_tree(out_str, level+1, child);
            } 
        }
        return out_str;
    }

    change_dir(loc) {
        let inhtml = ""

        if (loc === "$HOME") {
            this.addendum = '~$';
            this.location = term_out.terminal.file_sys;
        } else if (loc === "..") {
            inhtml = this.nav_parent(this.location.parent);
        } else if (this.location[loc]) {
            this.nav_child(loc);
        } else {
            inhtml = `'${loc}' is not a valid directory to change to!`;
        }

        document.getElementById('preface').innerHTML = this.preface + this.addendum;
        return inhtml;
    }

    print_list(dir) {
        console.log("in method")

        var out_str = "<div class='list-text'>";

        for (var prop in dir) {
            if (Array.isArray(dir[prop])) {
                console.log(typeof prop)
                console.log(prop)
                for (var j = 0; j < dir[prop].length; j++) {
                    out_str += `<div class='list-col'>${dir[prop][j]}</div>`;
                }
            } else if (typeof dir[prop] === "object") {
                out_str += `<div class='list-col'>${dir[prop].name}</div>`;
            }
        }

        return out_str + "</div>";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    navbar.time_function();
})

const term_out = {
    alias: {
        "look": "look",
        "check": "look",
        "examine": "look",
        "view": "look",
        "Roberta": "roberta",
        "Berta": "roberta",
        "Roberta Williams": "roberta", 
        "terminal": "terminal",
        "term": "terminal",
        "this": "terminal",
        "terminal program": "terminal",
        "desktop": "desktop",
        "page": "desktop",
        "screen": "desktop",
        "disk-scheduling-algorithms": "dsa",
        "disk scheduling algorithms": "dsa",
        "website": "website",
        "nataliechmura.com": "website",
        "www.nataliechmura.com": "website",
        "code": "code",
        "html": "code",
        "css": "code",
        "js": "code",
        "javascript": "cleveland",
        "cleveland": "cleveland",
        "the land": "cleveland",
        "natalie's hometown": "cleveland",
        "icons": "icons",
        "ducks": "ducks",
        "duckstop buddy": "ducks",
        "duck desktop buddy": "ducks",
        "duck program": "ducks",
        "art": "art",
        "art program": "art",
        "projects": "projects",
        "code projects": "projects",
        "project files": "projects",
        "files": "projects",
        "cv": "cv",
        "music": "music",
        "plants": "plants",
        "email": "email",
        "email link": "email",
        "email program": "email",
        "trash": "trash",
        "trash program": "trash",
        "garbage": "trash",
        "menu": "menu",
        "menu screen": "menu",
        "home": "menu",
        "house": "house",
        "house-of-leaves": "house",
        "house of leaves": "house",
        "natalie": "natalie",
        "newt": "natalie",
        "natalia": "natalie",
        "dipper": "natalie",
        "natalie chmura": "natalie",
        "natalie cloud": "natalie",
        "developer": "natalie",
        "the developer": "natalie",
        "the author": "natalie",
        "author": "natalie",
        "dsa fangirl": "natalie",
        "dsa fanboy": "natalie",
        "dsa fanthey": "natalie",
        "clock": "clock",
        "time": "clock",
        "dsa-c-scan": "dsa-c-scan",
        "dsa-f-scan": "dsa-f-scan",
        "dsa-fcfs": "dsa-fcfs",
        "dsa-scan": "dsa-scan",
        "dsa-look": "dsa-look",
        "dsa-c-look": "dsa-c-look",
        "dsa-sstf": "dsa-sstf",
        "hidden": "hidden",
        "menu-up": "menu-up",
        "menu-full": "menu-full",
        "menu-true": "menu",
        "menu-false": "menu-false",
    },
    terminal: {
        "help": {
            "": 
            `</br>
            NTerminalC version 1.0.0 release (static-web)</br>
            These commands are defined interally. Type 'help' to see this list.</br>
            Type 'help name' to find out more about the function 'name'</br></br>
            <div class='col-text'>
            <div class='col-text l'>
                cd [dir| ]</br>
                help [name| ]</br>
                list [dir| ]</br>
                look [value]</br>
            </div>
            <div class='col-text r'>
                quit</br>
                run [name]</br>
                show[name]</br>
                tree[dir| ]</br>
            </div>
            </div></br>`,
            "cd":
            `<div class='word'>cd [dir| ]</div>
            <div class='def'>Changes the shell working directory</div>
            <div class='def'>Change the current directory to dir. The default value of dir is 
    the HOME shell vairable.</div>
            <div class='def'>To naviagate to the parent directory of the current working directory,
    '..' may be used. </div>
            <div class='def'>Aside from navigation to the HOME directory, levels may only be traversed
    one at a time, from parent->child or from child->parent. Commands using '/'
    will be ignored.</div>
            </br>`,
            "help":
            `<div class='word'>help [name| ]</div>
            <div class='def'>Display information about the built in terminal commands.</div>
            <div class='def'>Displays a summary of the builtin command. If no command is
    specified, the list of potential help topics is printed.</div>
            </br>`,
            "list":
            `<div class='word'>list [dir| ]</div>
            <div class='def'>Prints the items in the desired directory.</div>
            <div class='def'>The default directory is the current working directoy.</div>
            <div class='def'>Aside from listing content in the HOME directory, content may only be listed in
    the current working directory.</div>
            </br>`,
            "look":
            `<div class='word'>look [value]</div>
            <div class='def'>For fans of Roberta, perhaps?</div>
            <div class='def'> At the beginning, look takes three possible values. Running look with any of these
    values gives you a small description and optional links...</div>
            <div class='def'>Further info about the reasoning behind these values can be gained by running 'help look value'</div>
            <div class='def'>'disk-scheduling-algorithms'</br>'roberta'</br>'terminal'</br></div>
            </br>`,
            "roberta":
            `<div class='word'>look Roberta</div>
            <div class='def'>A very cool game desginer behind many of the Sierra Titles, which is how I got into parser gaming in particular.</div>
            </br>`,
            "terminal":
            `<div class='word'>look terminal</div>
            <div class='def'>About text parser games</div>
            </br>`,
            "disk-scheduling-algorithms":
            `<div class='word'>look disk-scheduling-algorithms</div>
            <div class='def'>If only Natalie had included the ability to <span style='color: blue'>look</span> at a specific dsa</div>
            </br>`,
            "quit":
            `<div class='word'>quit</div>
            <div class='def'>Exits the currently running terminal session.</div>
            </br>`,
            "run":
            `<div class='word'>run [name]</div>
            <div class='def'>Executes the program spcified by name. Must be in the current working directory
    of the program in order to launch it sucessfully. Works for any installed program.</div>
            </br>`,
            "show":
            `<div class='word'>show [name]</div>
            <div class='def'>Displays the content of the file specififed by name. Must be in the current working
    directory of said file in order to launch it successfully. Works for any .txt extension.</div>
            </br>`,
            "tree":
            `<div class='word'>tree [dir| ]</div>
            <div class='def'>Displays the structure of the subdirectories and files nested within the specified
    directory. By default uses the current working directory, but can take HOME as another
    value.</div>
            </br>`,
        },
        file_sys: {
            name: "./",
            parent: "/",
            installed_programs: {
                name: "installed_programs/",
                parent: "./",
                art_program: {
                    name: "art_program/",
                    parent: "installed_programs/",
                    arrgh: ["art.txt", "art.exe"]
                },
                cv_program: {
                    name: "cv_program/",
                    parent: "installed_programs/",
                    arrgh: ["Natalie_Chmura_CV.pdf", "cv.exe"]
                },
                ducktop_program: {
                    name: "ducktop_program/",
                    parent: "installed_programs/",
                    arrgh: ["ducktop.txt", "ducktop.exe"]
                },
                email_program: {
                    name: "email_program/",
                    parent: "installed_programs/",
                    arrgh: ["email.txt", "email.exe"]
                },
                music_program: {
                    name: "music_program/",
                    parent: "installed_programs/",
                    arrgh: ["music.txt", "music.exe"]
                },
                plants_program: {
                    name: "plants_program/",
                    parent: "installed_programs/",
                    arrgh: ["plants.txt", "plants.exe"]
                },
                projects_program: {
                    name: "projects_program/",
                    parent: "installed_programs/",
                    arrgh: ["projects.txt", "projects.exe", "MPI_Benchmarking.pdf", "strawberry_milk.link", "block_game.link", "number_theory.pdf", "polyominos.link", "arp-reach.link"]
                },
                terminal_program: {
                    name: "terminal_program/",
                    parent: "installed_programs/",
                    arrgh: ["terminal.txt", "terminal.exe"]
                },
                trash_program: {
                    name: "trash_program/",
                    parent: "installed_programs/",
                    arrgh: ["trash.txt", "trash.exe"]
                },
            },
            website_content: {
                name: "website_content/",
                parent: "./",
                art: {
                    name: "art/",
                    parent: "website_content/",
                    arrgh: ["ar.jpg", "collection.jpg", "cube_inner.jpg", "grad.gif", "grtk.jpg", "gsnk.jpg", "hmc.jpg", "hs.jpg", "jfsp.jp", "jupiter.jpg", "lining.jpg", "mmart.jpg", "musiks_cube.jpg", "ram.jpg", "saiki.jpg", "ssb.jpg", "stella_drawn.png", "stk.jpg", "vest.jpg"],
                },
                ducks: {
                    name: "ducks/",
                    parent: "website_content/",
                    arrgh: ["brock.jpg", "ducks_32.jpg", "guy.jpg", "higgs.jpg", "nami.jpg", "napstar.jpg", "nimda.jpg", "shaduck.jpg", "timmy.jpg", "tommy.jpg"]
                },
            }
        },
    },
    output: {
        "roberta": "",
        "terminal": "",
        "desktop": "You see a finely crafted desktop environment, with a variety of pixel art icons corresponding to the \"programs\", that have been installed.",
        "dsa": "",
        "website": "",
        "code": "",
        "cleveland": "",
        "icons": "",
        "ducks": "",
        "art": "",
        "projects": "",
        "cv": "Are you doing research related to Operating Systems and/or memory management and currently taking on grad students?</br>Hey - it's nice to meet you! :D I'm going to be applying to start my PhD in Au2027",
        "music": "",
        "plants": "",
        "email": "",
        "trash": "You marvel at the level of detail in the art for this icon. You can even see the crumpled up forms of the documents that have been moved there!",
        "menu": "",
        "house": "",
        "natalie": "",
        "clock": "",
        "dsa-c-scan": "",
        "dsa-f-scan": "",
        "dsa-fcfs": "",
        "dsa-scan": "",
        "dsa-look": "",
        "dsa-c-look": "",
        "dsa-sstf": "",
        "hidden": "You try and peer through the layers of &ltdiv&gts at the content beneath- tragically the maximized terminal window obscures your vision. Drat!",
        "menu-up": "</br></br></br></br></br><div class='menu-min'>I wouldn't recommend having the menu screen toggled up while in windowed mode - try going full screen for a moment?</div>",
        "menu-full": "</br></br></br></br></br><div class='menu-min'>It's a feature, not a bug! Anyways, try look menu-true</div>",
        "menu-false": "You gaze at the bottom left hand of the screen, where the home menu button lies waiting to be clicked.",
        "else": "is not an action you can take in this game",
    }
}

const daily_songs = {
    "daily song recs": {
        "january": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            },
            "31": {
                "title": "",
                "artist": ""
            }
        },
        "february": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            }
        },
        "march": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            },
            "31": {
                "title": "",
                "artist": ""
            }
        },
        "april": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            }
        },
        "may": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            },
            "31": {
                "title": "",
                "artist": ""
            }
        },
        "june": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "hahaha",
                "artist": "gggg"
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            }
        },
        "july": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            },
            "31": {
                "title": "",
                "artist": ""
            }
        },
        "august": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            },
            "31": {
                "title": "",
                "artist": ""
            }
        },
        "september": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            }
        },
        "october": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            },
            "31": {
                "title": "",
                "artist": ""
            }
        },
        "november": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            }
        },
        "december": {
            "1": {
                "title": "",
                "artist": ""
            },
            "2": {
                "title": "",
                "artist": ""
            },
            "3": {
                "title": "",
                "artist": ""
            },
            "4": {
                "title": "",
                "artist": ""
            },
            "5": {
                "title": "",
                "artist": ""
            },
            "6": {
                "title": "",
                "artist": ""
            },
            "7": {
                "title": "",
                "artist": ""
            },
            "8": {
                "title": "",
                "artist": ""
            },
            "9": {
                "title": "",
                "artist": ""
            },
            "10": {
                "title": "",
                "artist": ""
            },
            "11": {
                "title": "",
                "artist": ""
            },
            "12": {
                "title": "",
                "artist": ""
            },
            "13": {
                "title": "",
                "artist": ""
            },
            "14": {
                "title": "",
                "artist": ""},
            "15": {
                "title": "",
                "artist": ""
            },
            "16": {
                "title": "",
                "artist": ""
            },
            "17": {
                "title": "",
                "artist": ""
            },
            "18": {
                "title": "",
                "artist": ""
            },
            "19": {
                "title": "",
                "artist": ""
            },
            "20": {
                "title": "",
                "artist": ""
            },
            "21": {
                "title": "",
                "artist": ""
            },
            "22": {
                "title": "",
                "artist": ""
            },
            "23": {
                "title": "",
                "artist": ""
            },
            "24": {
                "title": "",
                "artist": ""
            },
            "25": {
                "title": "",
                "artist": ""
            },
            "26": {
                "title": "",
                "artist": ""
            },
            "27": {
                "title": "",
                "artist": ""
            },
            "28": {
                "title": "",
                "artist": ""
            },
            "29": {
                "title": "",
                "artist": ""
            },
            "30": {
                "title": "",
                "artist": ""
            },
            "31": {
                "title": "",
                "artist": ""
            }
        }
    }
}

var navbar = new Navbar();
var term = new Terminal();
var ducks = new DucktopBuddy();