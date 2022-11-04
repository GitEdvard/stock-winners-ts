"use strict";
exports.__esModule = true;
var textelement = document.getElementById('myparagraph');
textelement.innerHTML = 'click';
document.getElementById('show').addEventListener('click', function () {
    var data = new FormData();
    data.append("data", "the_text_you_want_to_save");
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'myfile.json', true);
    xhr.send(data);
    // const app = express();
    // const productRoutes = require('./routes/product');
    // app.use('/api/products', productRoutes);
    // var data = new FormData();
    // data.append("upfile", new Blob(["CONTENT"], {type: "text/plain"}));
    // fetch("public/myfile.json", { method: "POST", body: data });
    console.log('uploaded file 2');
});
