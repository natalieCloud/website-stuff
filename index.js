class Navbar {
    constructor() {
        this.open_icons = [];
        this.time = "";
        this.toggled = false;
        this.prog_map = {
            "art-prog": {"shown": true, "max": false, "min": false},
            "cv-prog": {"shown": true, "max": false, "min": false},
            "duck-prog": {"shown": true, "max": false, "min": false},
            "email-prog": {"shown": true, "max": false, "min": false},
            "file-prog": {"shown": true, "max": false, "min": false},
            "music-prog": {"shown": true, "max": false, "min": false},
            "plant-prog": {"shown": true, "max": false, "min": false},
            "term-prog": {"shown": true, "max": false, "min": false},
        }
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
        this.open_icons.push(icon_name);
    }

    remove_icon(icon_name) {
         this.open_icons.pop(icon_name);
    }

    time_function() {
        var date = new Date();
        document.getElementById("clock").innerHTML= date.toLocaleTimeString(navigator.language || 'en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12:true});
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
    p["min"] = false;
    prog.style.width = "700px";
    prog.style.height = "500px";
    prog.style.display = "none";
    console.log("closed " + icon_name);
    }

    toggle_min(icon_name) {
        let prog = document.getElementById(icon_name);
        let p = this.prog_map[icon_name];
        p["min"] = !p["min"];
        p["shown"] = true;
        if (p["min"]) {
            prog.style.display = "block";
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

    // add_prog(icon_name) {
    //     var progDiv = document.createElement('div');
    //     progDiv.setAttribute("id", icon_name+"_prog");
    //     progDiv.setAttribute("class", "running_prog");
    //     progDiv.innerHTML = `
    //     <div class="">
    //     </div>
    //     `;
    //     document.body.appendChild("progDiv");
    // } Maybe Maybe Maybe


    restart() {
        window.location.reload();
    }

    wakeup() {
        console.log("remving div");
        var child_to_abort = document.getElementById('sleep-overlay');
        document.body.removeChild(child_to_abort)
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
}

var navbar = new Navbar() 

document.addEventListener("DOMContentLoaded", function() {
    navbar.time_function()
})

