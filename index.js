class Navbar {
    constructor() {
        this.open_icons = [];
        this.time = "";
        this.toggled = false;
        this.prog_map = {
            "art": {"shown": false, "max": false, "min": true},
            "cv": {"shown": false, "max": false, "min": true},
            "duck": {"shown": false, "max": false, "min": true},
            "email": {"shown": false, "max": false, "min": true},
            "file": {"shown": false, "max": false, "min": true},
            "music": {"shown": false, "max": false, "min": true},
            "plant": {"shown": false, "max": false, "min": true},
            "term": {"shown": false, "max": false, "min": true},
        }
    }

    log() {
        console.log('Add Popup')
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
        this.open_icons.push(icon_name)
    }

    remove_icon(icon_name) {
         this.open_icons.pop(icon_name)
    }

    time_function() {
        var date = new Date();
        //document.getElementById("clock").innerHTML= date.toLocaleString(navigator.language || 'en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12:true});
        document.getElementById("clock").innerHTML= date.toLocaleTimeString(navigator.language || 'en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12:true});
        let t = setTimeout('navbar.time_function()', 10000)
    }

    toggle_item(icon_name) {
        console.log("pushed " + icon_name)
        let p = this.prog_map[icon_name]
        p["min"] = !p["min"]
        p["shown"] = !p["shown"]
        console.log(p)
    }
}

var navbar = new Navbar() 

document.addEventListener("DOMContentLoaded", function() {
    navbar.time_function()
})

