const fs = require('fs');
const pdf = require('html-pdf');

/* 
    options = {
        name: "name of the file",
        destination: "path where the pdf should be saved",
        pathToHtml: "path to the html file",
        variables: [
            {
                name: "name of variable specified in html (mustache)"
                value: "value that the variable should have"
            }
        ]
    }
*/


function htmlToPdfDynamic(options){
    var html = fs.readFileSync(`${options.pathToHtml}`, 'utf8');
    var options = { 
        format: 'Letter'
    };

    let vars = options.variables

    vars.foreach(variable =>{
        html = html.replaceAll(`{{${variable.name}}}`, `${variable.value}`)
    })

    pdf.create(html, options).toFile(`${options.path}/${options.name}`, function(err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
}