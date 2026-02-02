function time() {
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();

document.getElementById('time').innerHTML = h + ":" + m + ":" + s;

}
setInterval(time, 1000);