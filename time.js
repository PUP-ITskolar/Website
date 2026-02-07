function time() {
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();

    if (h < 10) {
        let hh = "0" + h;
    }
    if (m < 10) {
        let mm = "0" + m;
    }
    if (s < 10) {
        let ss = "0" + s;
    }

document.getElementById('time').innerHTML = h + ":" + m + ":" + s;

}
setInterval(time, 1000);