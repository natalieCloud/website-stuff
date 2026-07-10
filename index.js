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
            "trash-program": { "shown": false, "max": false, "min": false },
            "art.txt-program": { "shown": false, "max": false, "min": false },
            "house.txt-program": { "shown": false, "max": false, "min": false },
            "credits.txt-program": { "shown": false, "max": false, "min": false },
            "secrets.txt-program": { "shown": false, "max": false, "min": false },
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
            "site-header-program": { "shown": true, "max": false, "min": true }
        }
        this.art = ["jupiter", "jfsp", "reigen", "ram", "mmask", "musik", "gsnk", "hmc", "collection", "vest", "mtg", "saiki", "hs", "ssb"];
        this.num = [5, 9, 6, 1, 6, 7, 7, 1, 7, 3, 7, 9, 8, 1];
        this.modulo = 14;
        this.day = new Date();
        this.day.setHours(0, 0, 0, 0);
        this.DUCKTOP = null;
        this.duckchoice = "";


        this.darkmode = false;
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
        this.time = date;
        if (this.day > date.setHours(0, 0, 0, 0)) {
            this.day = date;
            this.change_song();
        };
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
                term = new Terminal();
            }
            if (icon_name === 'art-program') {
                for (const elem of document.getElementsByClassName('art-page')) {
                    elem.style.display = "none"
                }
            }
        }
    }

    show_file(id_root, file_name) {

        var downloadable = '';
        var id = `${id_root}-program`

        if (id === 'cv') {
            downloadable =
                `<form method="get" action="./content/Natalie_Chmura_CV.pdf">
                <button class="button-head download" type="submit"></button>
            </form>`;
        }

        var leaf = document.createElement('div');
        leaf.setAttribute("class", "running-prog");
        leaf.setAttribute("id", id);
        leaf.innerHTML = `
            <div class="common head">
                <div class="pic-head" style="content: url(./content/icons/${id_root}_24.png);"></div>
                <span class="span-title">${file_name}</span>
                ${downloadable}
                <button class="button-head min" onclick="navbar.toggle_min('${id}')"></button>
                <button class="button-head max" onclick="navbar.toggle_max('${id}')"></button>
                <button class="button-head close" onclick="navbar.toggle_close('${id}')"></button>
            </div>
            <div class="content" style="font-family: 'Courier New', Courier, monospace;">
                <object data="./content/${file_name}" type="application/pdf" width="100%" height="100%"
                    style="min-height: 454px;">
                    <p>
                        Your browser does not support PDFs.
                    </p>
                </object>
            </div>
            `;
        document.getElementById("desktop-space").appendChild(leaf);

        navbar.toggle_show(id);
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
                document.getElementById("build").style.backgroundImage = "url(content/gallery_tiles/floor_5.png)";
            }
            else if (icon_name === 'music-program') {
                this.change_song(this.day);
            }
            else if (icon_name === 'duck-program') {
                // this.register_ducks()
                this.DUCKTOP = new DuckBehavior();
            } else if (icon_name === 'cv_program') {
                this.show_file('cv-program', 'Natalie_Chmura_CV.pdf')
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
        let month_key = up_date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
        let day_key = up_date.toLocaleString('en-US', { day: 'numeric' });
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
        var temp_content = `url(content/gallery_tiles/floor_${my_num}.png)`;
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
        var temp_content = `url(content/gallery_tiles/floor_${my_num}.png)`;
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

    change_val(id, duckname) {
        if (document.getElementById(id).checked) {
            this.duckchoice = document.getElementById(id).value;
            document.getElementById("choice-duck").innerHTML = `${duckname}! I choose you!`;
            document.getElementById('submit-duck').disabled = false;
        }
    }

    get_duck() {
        return this.duckchoice;
    }

}

const Paths = {
    direct: "direct",
    one_b: "one_b",
    two_b: "two_b",
}


// TODO refactor/fix
class DuckBehavior {
    constructor() {

        this.version = "1.0.0"

        document.getElementById("duck-buddy").style.left = '0px';

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
            2: Paths.one_b,
            3: Paths.two_b,
            4: Paths.one_b,
        }

        this.duckorators = {
            "napstar-r": "2px",
            "napstar-l": "2px",
            "higgs-r": "-430px",
            "higgs-l": "-394px",
            "timmy-r": "-284px",
            "timmy-l": "-248px",
            "tommy-r": "-420px",
            "tommy-l": "-356px",
            "nami-r": "-212px",
            "nami-l": "-176px",
            "nimda-r": "-34px",
            "nimda-l": "-34px",
            "brock-r": "-104px",
            "brock-l": "-70px",
            "guy-r": "-140px",
            "guy-l": "-140px",
            "shaduck-r": "-502px",
            "shaduck-l": "-466px",
        }

        this.duck_type = "higgs";
        this.reflect = false;

        this.start = 0;
        this.bouncea = 0;
        this.bounceb = 0;
        this.end = 0;


        this.r_x = 0;
        this.l_x = 0;
        this.blink_i = 0;
        this.quack_i = 0;
    }

    bounce_dir(bool_val) {
        return (bool_val ? 0 : 8);
    }

    get_target() {
        var rdm = Math.floor(Math.random() * 8);

        if (rdm >= this.end) {
            rdm = rdm + 1;
        }

        this.end = rdm;
        console.log(`New target: ${this.end}`)
        this.get_path();
    }

    get_path() {
        var rdm = Math.floor(Math.random() * 5);

        this.current_path = this.path_p[rdm];

        this.movestart();
    }

    set_duckoration() {

        let disp = '';

        if (this.facing) {
            disp = `${this.duckorators[this.duck_type + '-l']}`;
        } else {
            disp = `${this.duckorators[this.duck_type + '-r']}`;
        }

        document.getElementById("duckorator").style.backgroundPositionX = "0px";
        document.getElementById("duckorator").style.backgroundPositionY = disp;

        if (!this.facing) {
            if (this.duck_type === 'napstar' || this.duck_type === 'nimda' || this.duck_type === 'guy') {
                document.getElementById("duckorator").style.transform = "scale(-1, 1)";
            } else {
                document.getElementById("duckorator").style.transform = "scale(1, 1)";
            }
        } else {
            document.getElementById("duckorator").style.transform = "scale(1, 1)";
        }

    }

    quack_or_blink(which) {
        if (which === 'quack') {
            document.getElementById("duckorator").style.backgroundPositionX = "-36px";
        } else {
            document.getElementById("duckorator").style.backgroundPositionX = "-108px";
        }

        if (!this.facing) {
            if (this.duck_type === 'napstar' || this.duck_type === 'nimda' || this.duck_type === 'guy') {
                document.getElementById("duckorator").style.transform = "scale(-1, 1)";
            } else {
                document.getElementById("duckorator").style.transform = "scale(1, 1)";
            }
        } else {
            document.getElementById("duckorator").style.transform = "scale(1, 1)";
        }

    }

    launch() {
        document.getElementById("duck-space").style.display = "flex";

        this.duck_type = navbar.get_duck();
        this.set_duckoration();

        this.movestart();

    }

    stop() {
        this.stopped = true;
        document.getElementById("duck-space").style.display = "none";
    }

    movestart() {

        if (this.current_path == Paths.direct) {
            var dur = Math.abs(this.end - this.start);
            var time = dur * 4;

            if (this.start >= this.end) {
                document.getElementById("duck-buddy").style.animation = `duck${dur}l`
                this.facing = true;
            } else {
                document.getElementById("duck-buddy").style.animation = `duck${dur}r`
                this.facing = false;
            }

            this.set_duckoration();

            document.getElementById("duck-buddy").style.animationDuration = `${time}s`
            var me = this;
 
            let t = setTimeout(function () { me.moveend(); }, time * 1000);
        } else {
            var dur = Math.abs(this.bouncea - this.start);
            var time = dur * 4;

            if (this.start >= this.bouncea) {
                document.getElementById("duck-buddy").style.animation = `duck${dur}l`
                this.facing = true;
            } else {
                document.getElementById("duck-buddy").style.animation = `duck${dur}r`
                this.facing = false;
            }

            this.set_duckoration();

            document.getElementById("duck-buddy").style.animationDuration = `${time}s`
            var me = this;

            let t = setTimeout(function () { me.bounce1(); }, time * 1000);
        }



    }

    bounce1() {

        document.getElementById("duck-buddy").style.position = 'absolute';
        document.getElementById("duck-buddy").style.left = `${32 * this.bouncea}px`;
        this.set_duckoration();


        if (this.current_path == Paths.one_b) {
            var dur = Math.abs(this.end - this.bouncea);
            var time = dur * 4;


            if (this.bouncea >= this.end) {
                document.getElementById("duck-buddy").style.animation = `duck${dur}l`
                this.facing = true;

            } else {
                document.getElementById("duck-buddy").style.animation = `duck${dur}r`
                this.facing = false;

            }
            this.set_duckoration();


            document.getElementById("duck-buddy").style.animationDuration = `${time}s`
            var me = this;

            let t = setTimeout(function () { me.moveend(); }, time * 1000);
        } else {
            var dur = Math.abs(this.bounceb - this.bouncea);
            var time = dur * 4;


            if (this.bouncea >= this.bounceb) {
                document.getElementById("duck-buddy").style.animation = `duck${dur}l`
                this.facing = true;

            } else {
                document.getElementById("duck-buddy").style.animation = `duck${dur}r`
                this.facing = false;

            }
            this.set_duckoration();


            document.getElementById("duck-buddy").style.animationDuration = `${time}s`
            var me = this;
            
            let t = setTimeout(function () { me.bounce2(); }, time * 1000);
        }


    }

    bounce2() {

        document.getElementById("duck-buddy").style.position = 'absolute';
        document.getElementById("duck-buddy").style.left = `${32 * this.bounceb}px`;

        var dur = Math.abs(this.end - this.bounceb);
        var time = dur * 4;
        

        if (this.bounceb >= this.end) {
            document.getElementById("duck-buddy").style.animation = `duck${dur}l`
            this.facing = true;

        } else {
            document.getElementById("duck-buddy").style.animation = `duck${dur}r`
            this.facing = false;

        }
        this.set_duckoration();


        document.getElementById("duck-buddy").style.animationDuration = `${time}s`
        var me = this;

        let t = setTimeout(function () { me.moveend(); }, time * 1000);
    }

    moveend() {

        document.getElementById("duck-buddy").style.position = 'absolute';
        document.getElementById("duck-buddy").style.left = `${32 * this.end}px`;
        this.set_duckoration();

        this.start = this.end;

        this.quack_seq();
    }

    quack_seq() {
        var rdm = Math.floor(Math.random() * 100);

        if (rdm <= ((this.quack_prob + (this.last_quacked * 0.05)) * 100)) {
            this.last_quacked = 0;
            this.quack_or_blink("quack");
            var me = this;

            let t = setTimeout(function () {me.quack_end();}, 1000);
        } else {
            this.last_quacked += 1;
            this.blink_seq();
        }

    }

    quack_end() {
        this.set_duckoration();
        this.blink_seq();
    }

    blink_seq() {

        var rdm = Math.floor(Math.random() * 100);

        if (rdm <= ((this.blink_prob + (this.last_blinked * 0.1)) * 100)) {
            this.last_blinked = 0;
            this.quack_or_blink("blink");
            var me = this;
            let t = setTimeout(function () {me.blink_end();}, 1000);

        } else {
            this.last_blinked += 1;
            this.check_stop();

        }

    }

    blink_end() {
        this.set_duckoration();
        this.check_stop();
    }

    check_stop() {

        if (!this.stopped) {
            this.get_target()
        }
    }
}

class Terminal {
    constructor() {
        this.preface = 'guest@natchm-website:';
        this.addendum = '~$'
        this.looking = false;
        this.location = term_out.terminal.file_sys;
        this.more_index = 0;
        this.dead = false;
        this.konami = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a", "start"]
        this.konami_step = 0;
        this.quack_count = 0;
        this.clock_count = 0;
        this.else = [1, 2, 3];
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
        var case_stnd = input_key.toLowerCase();

        const [first, ...rest] = case_stnd.split(" ");
        const input = first;
        const remaining = rest.join(" ");

        console.log(input);

        if (remaining.length === 0) {
            if (input === "list") {
                leaf.innerHTML = this.print_list(this.location);
            } else if (input === "tree") {
                leaf.innerHTML = this.print_tree("", 0, this.location);
            } else if (input === "help") {
                leaf.innerHTML = term_out.terminal["help"][""];
            } else if (input === "quit") {
                navbar.toggle_close('terminal-program')
            } else if (input === "more" && this.more_index !== 0) {
                leaf.innerHTML = this.help_info();
            } else {
                leaf.innerHTML = `Either ${input} is not a command, or you need to add an argument!`
            }
        }
        else {
            if (input === "help" && term_out.terminal["help"][remaining]) {

                if (remaining === "more") {
                    this.more_index = 0;
                    leaf.innerHTML = this.help_info();
                } else {
                    leaf.innerHTML = term_out.terminal["help"][remaining];
                }
            } else if (input === "cd") {
                leaf.innerHTML = this.change_dir(remaining);
            } else if (input === "show") {
                const [first, ...rest] = input_key.split(" ");
                const input = first;
                const remaining = rest.join(" ");
                leaf.innerHTML = this.show_file(remaining);
            } else if (input === "run") {
                leaf.innerHTML = this.run_program(remaining);
            } else if (input === "look") {
                leaf.innerHTML = this.start_looking(remaining);
            } else if (input === "list") {
                if (input_key === "list $HOME") {
                    leaf.innerHTML = this.print_list(term_out.terminal.file_sys);
                } else {
                    leaf.innerHTML = "You can only list with $HOME currrently"
                }
            } else if (input === "tree") {
                if (input_key === "tree $HOME") {
                    leaf.innerHTML = this.print_tree("", 0, term_out.terminal.file_sys);
                } else {
                    leaf.innerHTML = "You can only tree with $HOME currrently"
                }
            } else {
                leaf.innerHTML = "You sure that's a command you can run?"
            }
        }
        return leaf;
    }
    
    help_info() {
        var key = `more_${this.more_index}`;
        this.more_index += 1;
        return term_out.terminal["help"][key];
    }    

    start_looking(command) {
        var check = term_out.alias[command];

        console.log(`Command: ${command}, Check: ${check}`)
        if (this.dead) {
            return "You're dead and can't do anything. Please exit and restart the program to continue.";
        }

        if (this.looking) {

            if (check === "the duck") {
                return `Awww look at ${command} - aren't they cute?!?`;
            } else if (check === "huh") {
                return 'You wanna what?!?!';
            } else if (this.konami.includes(check)) {
                if (check === this.konami.at(this.konami_step)) {
                    this.konami_step += 1;
                    return term_out.output[check];
                } else {
                    this.konami_step = 0;
                    return `You look at ${check}`;
                }
            } else if (check === "void" || check === "gif" || check === "no") {
                this.dead = true;
                return term_out.output[check];
            } else if (check === "ducks") {
                if (this.quack_count < 2) {
                    this.quack_count += 1;
                    return term_out.output[check];
                } else {
                    return term_out.output[`${check}-3`];
                }
            } else if (check === "natalie") {
                if (navbar.time.getHours() === 4 || navbar.time.getHours() === 16) {
                    return term_out.output[`${check}-4`];
                } else {
                    return term_out.output[check];
                }
            } else if (check === "clock") {
                if (this.clock_count === 0) {
                    this.clock_count = 1;
                    return term_out.output[check];
                } else {
                    return term_out.output[`${check}-2`] + navbar.time;
                }
            } else if (check !== undefined) {
                return term_out.output[check];
            } else {
                var rdm = Math.floor(Math.random() * 3);
                var key = `else-${this.else[rdm]}`

                console.log(`${rdm}, ${key}`)
                return `\'${command}\'${term_out.output[key]}`;
            }

        } else {
            if (check !== undefined && (check === "roberta" || check === "dsa"  || check === "terminal")) {
                if (check === "terminal") {
                    this.looking = true;;
                }
                return term_out.output[check]
            } else if (check !== undefined) {
                return "You sure you're in the right mode for that partner?"
            } else {
                return `${command} isn't a thing you can look at...`
            }

        }
    }

    show_file(file_name) {
        console.log(file_name)

        if (this.location === term_out.terminal.file_sys.installed_programs.trash_program) {
            if (name === "even_more_secrets.txt") {
                file_name = "credits.txt";
            }
        } else if (this.location === term_out.terminal.file_sys.installed_programs.cv_program && file_name === "Natalie_Chmura_CV.pdf") {
            navbar.show_file('cv', file_name);
        } else if (this.location.arrgh === undefined || !this.location.arrgh.includes(file_name)) {
            return `You aren't in the right directory to show ${file_name}`;
        }

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

        // TODO post launch - refactor this method to work with the navbar version
        // in cause I forgot - that one was made second

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

        if (this.location.arrgh === undefined || !this.location.arrgh.includes(exe_name)) {
            return `You aren't in the right directory to run ${exe_name}`;
        }

        if (exe_name === "cv.exe") {
            navbar.show_file('cv', 'Natalie_Chmura_CV.pdf');
        } else if (exe_name === "email.exe") {
            navbar.sendEmail();
        } else if (exe_name === "ducktop.exe") {
            navbar.toggle_show('duck-program');
        } else if (exe_name === "projects.exe") {
            navbar.toggle_show('file-program');
        } else {
            navbar.toggle_show(`${name[0]}-program`);
        }

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
                out_str = out_str + branches + ` ${dir[j]}</br>`;
            }
            return out_str;
        }

        out_str = out_str + branches + ` ${dir.name} </br>`;
        for (var ch in dir) {
            var child = dir[ch];
            if (typeof child === "object") {
                console.log(child);
                out_str = this.print_tree(out_str, level + 1, child);
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


const term_out = {
    alias: {
        "look": "look",
        "check": "look",
        "examine": "look",
        "view": "look",
        "Roberta": "roberta",
        "roberta": "roberta",
        "Berta": "roberta",
        "berta": "roberta",
        "Roberta Williams": "roberta",
        "roberta williams": "roberta",
        "terminal": "terminal",
        "term": "terminal",
        "this": "terminal",
        "terminal program": "terminal",
        "desktop": "desktop",
        "page": "desktop",
        "screen": "desktop",
        "disk-scheduling-algorithms": "dsa",
        "disk scheduling algorithms": "dsa",
        "dsa": "dsa",
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
        "letter": "letter",
        "envelope": "letter",
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
        "background": "background",
        "wallpaper": "background",
        // "dsa-c-scan": "dsa-c-scan", leaving out for now..
        // "dsa-f-scan": "dsa-f-scan",
        // "dsa-fcfs": "dsa-fcfs",
        // "dsa-scan": "dsa-scan",
        // "dsa-look": "dsa-look",
        // "dsa-c-look": "dsa-c-look",
        // "dsa-sstf": "dsa-sstf",
        "profile": "profile",
        "profile-picture": "profile",
        "profile picture": "profile",
        "hidden": "hidden",
        "menu-up": "menu-up",
        "menu-full": "menu-full",
        "menu-true": "menu",
        "menu-false": "menu-false",
        "up": "up",
        "down": "down",
        "right": "right",
        "left": "left",
        "b": "b",
        "a": "a",
        "start": "start",
        "linkedin": "no",
        "gif": "gif",
        ".gif" : "gif",
        "void": "void",
        "space": "void",
        "ostep": "ostep",
        "the book": "ostep",
        "sudo": "sudo",
        "su": "sudo",
        "japanese": "japanese",
        "nihongo": "japanese", 
        "site-header": "site-header",
        "header": "site-header",
        "popup": "site-header",
        "welcome": "site-header",
        "kick": "huh",
        "touch": "huh",
        "attack": "huh",
        "kiss": "huh",
        "fuck": "huh",
        "shit": "huh",
        "eat": "huh",
        "higgs-boson": "the duck",
        "higgs boson": "the duck",
        "timmy": "the duck",
        "tommy": "the duck",
        "nami": "the duck",
        "nimda": "the duck",
        "brock": "the duck",
        "guy": "the duck",
        "shaduck-the-hedgehog": "the duck",
        "shaduck the hedgehog": "the duck",
        "shaduck": "the duck",
        "secrets": "secrets",
        "secrets.txt": "secrets",
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
                show [name]</br>
                tree [dir| ]</br>
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
            "more": "Defaulting defaulting defaulting",
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
            "text-parser":
                `<div class='word'>text-parser</div>
            <div class='def'>A text parser game is one in which you control your actions through typing out a verb + noun combination. 
            To enter into this game, you entered ‘look terminal’ which prompted the choice of taking a look at the terminal. 
            In this game, look is the only verb action you are allowed (for now) Like Roberta and disk-scheduling-algorithms may have suggested, 
            there is a wide range at the nouns you can try to look at. 
            Try something general, like website – and see where that gets you!</div>
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
                    arrgh: ["plants.txt", "plant.exe"]
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
        "roberta": "Roberta Williams – an absolute goat – legend among legends. Queen of many classic titles such as King’s Quest. If you have not heard of her before I would absolutely recommend checking out her work.",
        "terminal": `</br><pre> 

             ▗▄▄▄▖▐▌    ▄▄▄ ▄▄▄  █  ▐▌  ▐▌       ▗▄▄▄▖▐▌   ▗▞▀▚▖ 
               █  ▐▌   █   █   █ ▀▄▄▞▘  ▐▌         █  ▐▌   ▐▛▀▀▘
               █  ▐▛▀▚▖█   ▀▄▄▄▀        ▐▛▀▚▖      █  ▐▛▀▚▖▝▚▄▄▖     
               █  ▐▌ ▐▌              ▗▄▖▐▌ ▐▌      █  ▐▌ ▐▌
                                    ▐▌ ▐▌
                                     ▝▀▜▌                            
                                    ▐▙▄▞▘                 

▗▖ ▄▄▄   ▄▄▄  █  ▄ ▄ ▄▄▄▄        ▗▄▄▄▖▗▞▀▚▖ ▄▄▄ ▄▄▄▄  ▄ ▄▄▄▄  ▗▞▀▜▌█
▐▌█   █ █   █ █▄▀  ▄ █   █         █  ▐▛▀▀▘█    █ █ █ ▄ █   █ ▝▚▄▟▌█ 
▐▌▀▄▄▄▀ ▀▄▄▄▀ █ ▀▄ █ █   █         █  ▝▚▄▄▖█    █   █ █ █   █      █ 
▐▙▄▄▖         █  █ █     ▗▄▖       █                  █            █ 
                        ▐▌ ▐▌                                       
                         ▝▀▜▌                                       
                        ▐▙▄▞▘                                        
            </pre> </br></br>
            An interactive, mini text parser terminal adventure game.</br></br> 
            Enjoy \‘look\’ing at everything I included!</br></br>
            Disclaimer: There is a fine line in between clever solutions and ones that only makes sense to the mind of their creator. Hopefully the latter is not true here – but time (and those who would reach out to let me know) will tell! </br></br>

            For a brief explanation of a text parser, type help text-parser. For a more in depth explanation, look online! There are many interesting and informative videos + written works that do the topic, and its history, more justice then I could!</br></br>

            * Any text written with an asterisk will not contain clues.</br>`,
        "desktop": "You see a carefully crafted desktop environment, with a variety of pixel art icons corresponding to the \"programs\", that have been installed.",
        "dsa": "I couldn't not include an reference to my dearly beloved disk scheduling algorithms here!</br>If I loved them less I may be able to talk about them more...",
        "website": "You gaze at the screen, unable to tear your eyes from the desktop littered with icons. What secrets do they hold?",
        "code": "Eeeesh that might not be a good idea if you’re trying to follow good practice. After seeing their TA/grading experience* having included giving feedback on code quality, you might have been tempted to think Natalie’d know what to avoid, then BOOM! 1 massive JavaScript file with multiple classes. BOOM! Code smells everywhere. BOOM! Coupling out the wazoo!</br></br>*To any former students I apologize, do as I say – not as I do.",
        "cleveland": "You gaze wistfully into the distance on reminder of that city. The motherland, part of the perogi pocket of the United States, and where Natalie’s from. Hell yeah! Visitors might enjoy going to one of the many delicious ice cream parlors; like Handles, Honey Hut, Mitchell’s, or Zero Zest! (Blue Moon enthusiasts will wanna go to Handles in particular!) </br> </br>*I have nowhere else to recommend this so check out the video “The Largest Poison Ivy in Suburban Cleveland”",
        "icons": "Each icon pops out against the background. Trash, Ducktop, CV, Email Me? </br> \"Oh god\” you internally wonder – \"do I have to email Natalie for this?\" </br></br> Your fears immediately subside after they break the narrative flow to reveal that no, no you do not. ",
        "ducks": "Quack!",
        "ducks-3": "Sorry – you can\’t talk to the animals here :X",
        "art": "A gallery of some of the stuff Natalie has made. A prime place to browse through, that’s for sure! Maybe you’ll grab a coffee and peruse the sights...",
        "projects": "An assortment of projects and papers are gathered here, in a deceptively coding centered icon.	You pause, wondering if Natalie would include anything here that could be integrated into the terminal game. Probably not. ",
        "cv": "*Are you working in research related to Operating Systems and/or memory management? Are you currently accepting new grad students? Let me throw my hat in the ring. And if you weren’t convinced before you might wanna take another gander at that CV. How many OS researchers do you know that were key-holders at a Juice and Smoothie bar?",
        "music": "The developer\’s personal favorite way of listening to music lies sparkling in the night sky. What groovy tunes lie on that celestial disk?",
        "plants": "A singular potted plant lies on the desktop. You wonder if it will manage to stay alive, what with there being no sun and water in sight...",
        "email": "A wax sealed envelope lies patiently on the desktop – its skeuomorphic design harking back to a time before phoning or texting was possible. If only you could examine its contents! What secrets must it hold? Guess that mystery will have to remain a mystery",
        "letter": "Gah! That\’s a crime you know? You could go to jail for that! Quick, seal it back up – make sure you don’t read anything!",
        "trash": "You marvel at the level of detail in the art for this icon. You can even see the crumpled up forms of the documents that have been moved there!",
        "menu": "A list showing the potential programs that could be run and other social media sites the developer has rests on the left hand side. A profile picture of, what you could only assume to be Natalie themselves in mii form, gazes wistfully into the distance as the sea gently laps at the dock they stand on. A few clouds hover in the distance, the largest appearing as though it could be a puff on a winter hat worn by the mii. Very fittingly worn, in fact: as Natalie\’s surname means \‘cloud\’ in Polish.",
        "house": "opened house.txt",
        "natalie": "Based on the site\’s color scheme you might have thought Natalie’s favorite color was purple. Nope! It’s pink – specifically #FFB4DA. More fun facts at four….",
        "natalie-4": "The Natalie fun facts report – </br>Their favorite weather type is windy! ",
        "clock": "Wow! A real-time clock! In the beta version of this website, it was the last thing I had gotten working before completely losing all my progress. In this iteration, it was the first thing I did!",
        "clock-2": "The time is: ",
        "huh": "You wanna what?!? ",
        "site-header": "An attempt at an old web style homepage waits to greet any and all visitors. Maximizing the window reveals the fact that it\’s been sitting in the Shadow Realm this entire time!",
        "up": "You look up",
        "down": "You look down",
        "right": "You look right",
        "left": "You look left",
        "b": "You look at b",
        "a": "You look at a",
        "start": "Tried and true, the konami code strikes again. There isn’t any useful power up I can give you right now, but maybe I can turn this section into a secret guestbook area of sorts? Names will be added below. https://forms.gle/GVd3CTQigQ9aX2RN6",
        "no": "Of your own free will?!</br></br>* Please exit and restart the program to continue.",
        "gif": "A .gif of a piano has fallen out of a .gif of a window and turned you into a gif of a corpse.</br></br>* Please exit and restart the program to continue.",
        "void": "As you gaze into the vast emptiness of space, you are reminded of the inevitable end to all things. It could be a profound moment, if you had the time to dwell on that. Unfortunately you cannot survive in space and never have another thought, profound or otherwise. You’ve died.</br></br>* Please exit and restart the program to continue.",
        "ostep": "Natalie\’s favorite textbook!",
        "sudo": "Nice try – you can’t do that here though.",
        "japanese": "<div hreflang='jp'>はい!日語は話します。オハイヨー州立大学で勉強しながら。僕の文章 はまあまあですけど…聴聞がちょと…(╥_╥)</div>",
        "background": "A pixilated heart stands out against a dark night sky.",
        "profile": "It’s a mii… Natalii!",
        // "dsa-c-scan": "Natalie doesn't double check their work so you see this.", Working an a worthy acknowledgement
        // "dsa-f-scan": "Natalie doesn't double check their work so you see this.",
        // "dsa-fcfs": "Natalie doesn't double check their work so you see this.",
        // "dsa-scan": "Natalie doesn't double check their work so you see this.",
        // "dsa-look": "Natalie doesn't double check their work so you see this.",
        // "dsa-c-look": "Natalie doesn't double check their work so you see this.",
        // "dsa-sstf": "Natalie doesn't double check their work so you see this.",
        "hidden": "You try and peer through the layers of &ltdiv&gts at the content beneath- tragically the maximized terminal window obscures your vision. Drat!",
        "menu-up": "</br></br></br></br></br></br></br><div class='menu-min'>I wouldn't recommend having the menu screen toggled up while in windowed mode - try going full screen for a moment?</div>",
        "menu-full": "</br></br></br></br></br><div class='menu-min'>It's a feature, not a bug! Anyways, try look menu-true</div>",
        "menu-false": "You gaze at the bottom left hand of the screen, where the home menu button lies waiting to be clicked.",
        "else-1": " is not an noun you can look at in this game",
        "else-2": " can’t be looked at here",
        "else-3": "? I can’t understand what you mean by that",
        "secrets": "I sure do love ASCII encodings",
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
                "artist": ""
            },
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
                "artist": ""
            },
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
                "artist": ""
            },
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
                "artist": ""
            },
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
                "artist": ""
            },
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
                "artist": ""
            },
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
                "artist": ""
            },
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
                "artist": ""
            },
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
                "artist": ""
            },
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
                "artist": ""
            },
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
                "artist": ""
            },
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
                "artist": ""
            },
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


document.addEventListener("DOMContentLoaded", function () {
    navbar.time_function();

    // Start code reference block. Source: https://dev.to/bridget_amana/how-to-easily-add-dark-mode-to-your-website-29dl
    const body = document.body;

    const toggleButton = document.getElementById('toggles_dark_mode');

    toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    })

    window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode')
    }
    })
    // End code reference block
})

var navbar = new Navbar();
var term = new Terminal();



