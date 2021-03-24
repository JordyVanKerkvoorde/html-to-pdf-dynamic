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


async function htmlToPdfDynamic(options){
    var html = fs.readFileSync(`${options.pathToHtml}`, 'utf8');
    var pdfOptions = { 
        format: 'Letter'
    };

    options.variables.forEach(variable => {
        let replace = `{{ ${variable.name} }}`;
        let regex = new RegExp(replace, "g");
        html = html.replace(regex, `${variable.value}`);
    })

    const createPDF = (html, pdfOptions) => new Promise(((resolve, reject) => {
        pdf.create(html, pdfOptions).toFile(`${options.destination}/${options.name}.pdf`, function(err, res) {
            if (err) return console.log(err);
            resolve(res);
        });
    }));

    await createPDF(html, pdfOptions);
}

module.exports.htmlToPdfDynamic = htmlToPdfDynamic;