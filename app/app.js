function readTextFile(filename) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filename, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            var allText = rawFile.responseText;
            document.getElementById("myparagraph").innerHTML = allText;
        }
    };
    rawFile.send();
}
readTextFile('data.csv');
// let textelement = document.getElementById('myparagraph')!;
// textelement.innerHTML = 'click'
