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
        // open_prog.setAttribute('class', nicon);
        open_prog.setAttribute('onclick', `navbar.toggle_min('${icon_name}')`);
        open_prog.innerHTML = ""
        let t_c = document.getElementById("task-buttons")
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
            }
            if (icon_name === 'term-prog') {
                document.getElementById("history").innerHTML = "";
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
        let p = this.prog_map[icon_name]
        p["max"] = !p["max"]
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
        sleepDiv.innerHTML = ""
        document.body.appendChild(sleepDiv);
    }

    power() {
        window.close();
    }

    submitTerm() {
        var input = document.getElementById('baseball_stat_1').value
        console.log(input)
    }

    change_song() {}
}

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
        this.state = State.IdleL
        this.duckDraw = this.loadContent()
    }

    loadContent() { }

    swim() { }

    idle() { }

    quack() { }

    blink() { }

    runClean() { }

    runInterrupt() { }

    update() { }

    draw() { }
}

class Terminal {
    constructor() {
        this.preface = 'guest@natchm-website:~$';
        this.looking = false;
    }

    parse_command() {
        var input = document.getElementById('baseball_stat_1').value;
        var leaf = document.createElement('div');
        leaf.setAttribute('class', 'term-history');
        leaf.innerHTML = this.preface + " " + input;
        document.getElementById('history').appendChild(leaf)
        document.getElementById('baseball_stat_1').value = '';
    }

    fetch_outcome() {

    }
}

var navbar = new Navbar()
var term = new Terminal()

document.addEventListener("DOMContentLoaded", function () {
    navbar.time_function()
})

// var form = document.getElementById("baseball_stat_1");

// function handleForm(event) { event.preventDefault(); return false}

// form.addEventListener('submit', handleForm);

