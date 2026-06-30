class Navbar {
    constructor() {
        this.time = "";
        this.toggled = false;
        this.prog_map = {
            "art-program": { "shown": false, "max": false, "min": false },
            "cv-program": { "shown": false, "max": false, "min": false },
            "duck-program": { "shown": false, "max": false, "min": false },
            "txt-program": { "shown": false, "max": false, "min": false },
            "file-program": { "shown": false, "max": false, "min": false },
            "music-program": { "shown": false, "max": false, "min": false },
            "plant-program": { "shown": false, "max": false, "min": false },
            "terminal-program": { "shown": false, "max": false, "min": false },
            "site-header-program": { "shown": false, "max": false, "min": false },
            "trash-program": { "shown": false, "max": false, "min": false },
            "art.txt-program": { "shown": false, "max": false, "min": false },
            "credits.txt-program": { "shown": false, "max": false, "min": false },
            "cv.txt-program": { "shown": false, "max": false, "min": false },
            "ducktop.txt-program": { "shown": false, "max": false, "min": false },
            "email.txt-program": { "shown": false, "max": false, "min": false },
            "music.txt-program": { "shown": false, "max": false, "min": false },
            "plants.txt-program": { "shown": false, "max": false, "min": false },
            "projects.txt-program": { "shown": false, "max": false, "min": false },
            "terminal.txt-program": { "shown": false, "max": false, "min": false },
            "trash.txt-program": { "shown": false, "max": false, "min": false },
            "Natalie_Chmura_CV.pdf-program": { "shown": false, "max": false, "min": false },
            "rsa_number_theory.pdf-program": { "shown": false, "max": false, "min": false },
            "mpi_benchmarking.pdf-program": { "shown": false, "max": false, "min": false },
        }
        this.art = ["jupiter", "jfsp", "reigen", "ram", "mmask", "musik", "gsnk", "hmc", "collection", "vest", "mtg", "saiki", "hs", "ssb"];
        this.num = [2,9,1,0,0,0,3,6,5,6,4,2,3,9]
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

    reset_index() {
        var classes = document.getElementsByClassName("running-prog");
        for (var i = 0; i < classes.length; i++) {
            classes[i].style.zIndex = "90";
        }
    }

    add_icon(icon_name) {
        var nicon = icon_name.substring(0, icon_name.length - 8);
        var disp = nicon;
        if (icon_name.indexOf("pdf") !== -1) {
            nicon = icon_name;
            var disp = "txt-pdf";
        } else if (icon_name.indexOf("txt") !== -1) {
            nicon = icon_name;
            var disp = "txt-txt";
        }
        console.log("adding button " + nicon);
        var open_prog = document.createElement('button');
        open_prog.setAttribute('id', `${nicon}-icon`);
        open_prog.setAttribute('class', `running-icons ${disp}`);
        open_prog.setAttribute('onclick', `navbar.toggle_min('${icon_name}')`);
        open_prog.innerHTML = "";
        let t_c = document.getElementById("task-buttons");
        t_c.appendChild(open_prog);
    }

    remove_icon(icon_name) {
        console.log(`removing div ${icon_name}`);
        var nicon = icon_name.substring(0, icon_name.length - 8);
        console.log(`removing div ${icon_name}`);
        if (icon_name.indexOf("pdf") !== -1) {
            nicon = icon_name;
        } else if (icon_name.indexOf("txt") !== -1) {
            nicon = icon_name;
        }
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
            prog.style.zIndex = "90";
            console.log("closed " + icon_name);
            navbar.remove_icon(icon_name);
            if (icon_name === 'terminal-program') {
                document.getElementById("baseball_stat_1").value = "";
                document.getElementById("history").innerHTML = "";
            }
            if (icon_name === 'art-program') {
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
            navbar.reset_index();
            prog.style.zIndex = "91";
            navbar.add_icon(icon_name);
            console.log("opened " + icon_name);
            if (icon_name === 'terminal-program') {
                document.getElementById("baseball_stat_1").focus();
            }
            else if (icon_name === 'art-program') {
                document.getElementById("jupiter").style.display = "flex";
                document.getElementById("build").style.backgroundImage = "url(content/floor_2.png)";
            }
            else if (icon_name === 'music-program') {
                this.change_song(this.day);
            }
            else if (icon_name === 'duck-program') {
                var duck = new DucktopBuddy();
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
            console.log("un-minimized " + icon_name);
            navbar.reset_index();
            prog.style.zIndex = "91";
        } else {
            prog.style.display = "none";
            prog.style.zIndex = "90";
            console.log("minimized " + icon_name);
        }
    }

    toggle_max(icon_name) {
        let prog = document.getElementById(icon_name);
        let p = this.prog_map[icon_name];
        p["max"] = !p["max"];
        if (p["max"]) {
            prog.style.width = "100%";
            prog.style.height = "100%";
            navbar.reset_index();
            prog.style.zIndex = "91";
            console.log("maximized " + icon_name);
        } else {
            prog.style.width = "700px";
            prog.style.height = "500px";
            prog.style.zIndex = "91";
            console.log("un-maximized " + icon_name);
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
        var my_num;
        let me = this.art[idx];

        if (idx === 0) {
            prev = this.art[13];
            my_num = this.num[13];
        } else {
            prev = this.art[idx - 1];
            my_num = this.num[idx - 1];
        }
        var temp_content = `url(content/floor_${my_num}.png)`;
        document.getElementById("build").style.backgroundImage = temp_content;
        document.getElementById(me).style.display = "none";
        document.getElementById(prev).style.display = "flex";
    }

    go_next(idx) {
        var prev;
        var my_num;
        let me = this.art[idx];
        if (idx === 13) {
            prev = this.art[0];
            my_num = this.num[0];
        } else {
            prev = this.art[idx + 1];
            my_num = this.num[idx + 1];
        }
        var temp_content = `url(content/floor_${my_num}.png)`;
        document.getElementById("build").style.backgroundImage = temp_content;
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

const Targets = {
    /**
     *  |---------------------|
     *  0 5  3  6  2  7  4  8 1
     */
    eighth: "eighth"

}

const Paths = {
    /**
     *  |----A-----^-----B----|
     *             D
     *        <----
     *   /---------
     *   \---->     ---------\
     *         <-------------/ 
     */
    direct: "direct",
    dir_one_b: "dir_one_b",
    dir_two_b: "dir_two_b",
    opp_one_b: "opp_one_b",
    opp_two_b: "",
}

class DuckBehavior {
    constructor() {
        this.current_tar = 0;
        this.current_loc = 0;
        this.current_path = Paths.direct;
        this.stopped = false;
        this.facing = true; // true left false right

        this.last_quacked = 0;
        this.quack_prob = 0.1;
        this.last_blinked = 0;
        this.blink_prob = 0.1;

        this.path_p = {
            0: Paths.direct,
            1: Paths.direct,
            2: Paths.dir_one_b,
            3: Paths.dir_two_b,
            4: Paths.opp_one_b,
            5: Paths.opp_two_b,
        }

        this.get_target();
    }

    // head
    // get_target
    // get_path
    // move
    // selector
    // selector

    // c\r 0 1 4 7
    // 0   1 2 5 8 
    // 1   0 2 5 8 
    // 4   0 1 5 8
    // 8   0 1 4 7

    // 6 0 1 2 3 4 5 7 8
    // 7 0 1 2 3 4 5 6 8
    // 8 0 1 2 3 4 5 6 7
    

    get_target() {
        var rdm = Math.floor(Math.random() * 8);

        if (rdm >= this.current_tar) {
            rdm = rdm + 1;
            this.facing = false;
        } else {
            this.facing = true;
        }

        this.current_tar = rdm;
        this.get_path();
    }

    get_path() {
        var rdm = Math.floor(Math.random() * 5);
        
        this.current_path = this.path_p[rdm];

        // Maybe move this?
        if (this.current_path === Paths.dir_one_b || this.current_path === Paths.opp_two_b) {
            this.facing = !this.facing;
        }
        var me = this;

        let t = setTimeout(function() { me.move(); }, 10000);

        // this.move();
    }

    /**
     * 
     *  srt =/= end
     * 
     *  0  1  2  3  4  5  6  7  8
     *  |--|--|--|--|--|--|--|--|
     * 
     *  start < end
     * 
     *  r:
     *      d: end - srt
     *     1s: 16 - srt - end
     *     2s: 16 - srt + end
     *     1o: srt + end
     *     2o: 16 + srt - end
     * 
     *  l:
     * 
     *      d: X
     *     1s: srt + end
     *     2s: 16 + srt - end
     *     1o: 16 - srt - end
     *     2o: 16 - srt + end
     * 
     *  start > end
     *  
     *  r:
     *      d: X
     *     1s: 16 - srt - end
     *     2s: 16 - srt + end
     *     1o: srt + end
     *     2o: 16 + srt - end
     * 
     *  l:
    *       d: srt - end
    *      1s: srt + end
    *      2s: 16 + srt - end
    *      1o: 16 - srt - end
    *      2o: 16 - srt + end
     */

    sq_cnt() {
        
        var mvdir = true; // true left false right

        if (this.current_loc - this.current_tar < 0) {
            mvdir = false;
        }

        if (this.facing) {
            if (this.current_path === Paths.direct && mvdir)  {
                return this.current_loc - this.current_tar;
            } else if (this.current_path === Paths.direct) {
                return -1;
            } else if (this.current_path === Paths.dir_one_b) {
                return this.current_loc + this.current_tar;
            } else if (this.current_path === Paths.dir_two_b) {
                return 16 + this.current_loc - this.current_tar;
            } else if (this.current_path === Paths.opp_one_b) {
                return 16 - this.current_loc - this.current_tar;
            } else {
                return 16 - this.current_loc + this.current_tar;
            }
            

        } else {

            if (this.current_path === Paths.direct && !mvdir)  {
                return this.current_tar - this.current_loc;
            } else if (this.current_path === Paths.direct) {
                return -1;
            } else if (this.current_path === Paths.dir_one_b) {
                return 16 - this.current_loc - this.current_tar;
            } else if (this.current_path === Paths.dir_two_b) {
                return 16 - this.current_loc + this.current_tar;
            } else if (this.current_path === Paths.opp_one_b) {
                return this.current_loc + this.current_tar;
            } else {
                return 16 + this.current_loc - this.current_tar;
            }
            

        }
    }



    move() {

        console.log(`Move to ${this.current_tar} with path ${this.current_path}`)

        console.log(`Move length: ${this.sq_cnt()}`)
        
        if (this.facing) {
            console.log('Now facing left');
        } else {
            console.log('Now facing right');
        }

        this.current_loc = this.current_tar;

        this.quack_seq();
    }

    quack_seq() {
        var rdm = Math.floor(Math.random() * 100);

        if (rdm <= ((this.quack_prob + (this.last_quacked * 0.05)) * 100)) {
            this.last_quacked = 0;
            console.log("Quack");
            // do quack
        } else {
            this.last_quacked += 1;
        }

        this.blink_seq();
    }

    blink_seq() {
        var rdm = Math.floor(Math.random() * 100);

        if (rdm <= ((this.blink_prob + (this.last_blinked * 0.1)) * 100)) {
            this.last_blinked = 0;
            console.log("Blink");
            // do blink
        } else {
            this.last_blinked += 1;
        }

        this.check_stop();
    }

    check_stop() {
        if (!this.stopped) {
            this.get_target()
        }
    }
}

class DucktopBuddy {
    constructor() {
        this.state = State.IdleL;
        this.duckDraw = this.loadContent();

        this.tree = {
            get_target: this.get_target,
            get_path: this.get_path,
            movement: this.move,
            quack_sel: this.quack_sel,
            blink_sel: this.blink_sel,
        }

        this.duck_mind = new DuckBehavior();
        this.duck_mind
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
        this.index = 0;
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
            }
        }
        else {
            if (input === "help" && term_out.terminal["help"][remaining]) {
                leaf.innerHTML = term_out.terminal["help"][remaining];
            } else if (input === "cd") {
                leaf.innerHTML = this.change_dir(remaining) 
            } else if (input === "show") {
                leaf.innerHTML = this.show_file(remaining);
            } else if (input === "run") {
                leaf.innerHTML = this.run_program(remaining);
            }
        }
        return leaf;
    }

    show_file(file_name) {
        let name = file_name.split(".");
        if (name[1] !== "txt" && name[1] !== "pdf") {
            return `${file_name} does not have the appropriate extension for use with the show command`;
        }

        navbar.prog_map[file_name] = { "shown": false, "max": false, "min": false };
        var icon = "missing_24.png"

        if (name[1] === "pdf") {
            var obj_l = `<object data="./content/${file_name}" type="application/pdf" width="100%" height="100%"
            style="min-height: 454px;">`;
            icon = "pdf_24.png";
        
        } else {
            var obj_l = `<object data="./content/programs/${file_name}" type="text/plain" width="100%" height="100%"
            style="min-height: 454px;">`;
            icon = "txt_24.png";
        }
        var id = file_name + "-program";

        var leaf = document.createElement('div');
        leaf.setAttribute("class", "running-prog");
        leaf.setAttribute("id", id);
        leaf.innerHTML = `
            <div class="common head">
                <div class="pic-head" style="content: url(./content/icons/${icon});"></div>
                <span class="span-title">${file_name}</span>
                <button class="button-head min" onclick="navbar.toggle_min('${file_name}-program')"></button>
                <button class="button-head max" onclick="navbar.toggle_max('${file_name}-program')"></button>
                <button class="button-head close" onclick="navbar.toggle_close('${file_name}-program')"></button>
            </div>
            <div class="content" style="font-family: 'Courier New', Courier, monospace;">
                ${obj_l}
                    <p>
                        Your browser does not support the ${name[1]} filetype.
                    </p>
                </object>
            </div>
            `;
        document.getElementById("desktop-space").appendChild(leaf);
    
        navbar.toggle_show(id);

        return `opened ${file_name}`;
    }

    run_program(exe_name) {
        let name = exe_name.split(".");
        if (name[1] !== "exe") {
            return `${exe_name} is not a runnable program`;
        }

        console.log(name[0])
        navbar.toggle_show(name[0]);

        return `started ${exe_name}`
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
    navbar.toggle_show('site-header-program')
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
            "more":
            `</br>
                NTerminalC version 1.0.0 release (static-web)</br> 
                These commands are defined interally. Type 'help more' to see this explanation again.</br> </br>

                Hello hello and welcome all! Today I will be going over the basics of using terminal controls as used on this site.
                This guide is designed for guests that have seldom/never used a terminal interface before.</br> </br>
                
                The whole website turned into a love letter of sorts (to the field && my degree) so there are references I added that may not make
                sense to my audience without that background. 
                However, I have done my best to make the main content accessible through this guide, and provided (hopefully!!) enough to find out more!</br> </br>

                If, after reading this guide you are still confused, or have some feedback about what could be done better - please reach out! 
                With that out of the way, lets begin!</br> </br>

                We'll be looking at the following commands. You may notice that some of them have values in brackets '[]' after - what's all that about? </br>

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
                </div> </br>

                Please type in 'more' to proceed to the next section...

            </br>`,
            "more_0":
            `</br>
                So, for each command in the list you will see its name, followed by its arguments. You can think of the arguments as though they are the variables
                in a math equation: </br> 
                2x + 6y cannot be solved if you don't know what x and y are*! So, the values in brackets represent what can be plugged in for that x and y.
                For simplicities sake, 
                  


                * It cannot be solved mathmatically either - the '=' was omitted for this reason
            </br>`,
            "more_1":
            `</br>
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
        "roberta": "Natalie doesn't double check their work so you see this.",
        "terminal": "Natalie doesn't double check their work so you see this.",
        "desktop": "You see a finely crafted desktop environment, with a variety of pixel art icons corresponding to the \"programs\", that have been installed.",
        "dsa": "Natalie doesn't double check their work so you see this.",
        "website": "Natalie doesn't double check their work so you see this.",
        "code": "Natalie doesn't double check their work so you see this.",
        "cleveland": "Natalie doesn't double check their work so you see this.",
        "icons": "Natalie doesn't double check their work so you see this.",
        "ducks": "Natalie doesn't double check their work so you see this.",
        "art": "Natalie doesn't double check their work so you see this.",
        "projects": "Natalie doesn't double check their work so you see this.",
        "cv": "Are you doing research related to Operating Systems and/or memory management and currently taking on grad students?</br>Hey - it's nice to meet you! :D I'm going to be applying to start my PhD in Au2027",
        "music": "Natalie doesn't double check their work so you see this.",
        "plants": "Natalie doesn't double check their work so you see this.",
        "email": "Natalie doesn't double check their work so you see this.",
        "trash": "You marvel at the level of detail in the art for this icon. You can even see the crumpled up forms of the documents that have been moved there!",
        "menu": "Natalie doesn't double check their work so you see this.",
        "house": "Natalie doesn't double check their work so you see this.",
        "natalie": "Natalie doesn't double check their work so you see this.",
        "clock": "Natalie doesn't double check their work so you see this.",
        "dsa-c-scan": "Natalie doesn't double check their work so you see this.",
        "dsa-f-scan": "Natalie doesn't double check their work so you see this.",
        "dsa-fcfs": "Natalie doesn't double check their work so you see this.",
        "dsa-scan": "Natalie doesn't double check their work so you see this.",
        "dsa-look": "Natalie doesn't double check their work so you see this.",
        "dsa-c-look": "Natalie doesn't double check their work so you see this.",
        "dsa-sstf": "Natalie doesn't double check their work so you see this.",
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
// var ducks = new DucktopBuddy();

