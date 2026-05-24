// function log() {
//     console.log('New Popup')
// }

class Navbar {
    constructor() {
        this.open_icons = [];
        this.time = "";
        this.toggled = false;
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
}

var navbar = new Navbar() 

document.addEventListener("DOMContentLoaded", function() {
    navbar.time_function()
})

