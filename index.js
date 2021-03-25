const fs = require('fs');
const pdf = require('html-pdf');

/* 
    options = {
        name: "name of the file",
        destination: "path where the pdf should be saved",
        pathToHtml: "path to the html file",
        renderDelay: 500,
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
        format: 'Letter',
        renderDelay: options.renderDelay,
    };

    
    var regexLoops = /{{\*for[^{}]*}}/gi, resultLoops, loops = [];
    while ( (resultLoops = regexLoops.exec(html)) ) {
        loops.push(resultLoops[0]);
    };

    loops.forEach(loop => {
        let loopHeader = loop.match(new RegExp(/\*for\([a-zA-Z ]*\)/, 'ig'));
        loopHeader = loopHeader[0].replace('*for(', '').replace(')', '').split(' ');
        const [identifier, dataObj] = [loopHeader[0], loopHeader[2]];
        let component = loop.replace(new RegExp(/{{\*for\([a-zA-Z ]*\)/, 'g'), '').replace('}}', '');

        let dataHtml = '';
        var regexVars = new RegExp(`\\$${identifier}\\.[a-zA-Z\.]+\\$`, 'gi'), resultVars, vars = [];
        while ( (resultVars = regexVars.exec(component)) ) {
            vars.push(resultVars[0].replace(/\$/g, ''));
        };

        options.data[dataObj].forEach(object => {
            let objHtml = component;
            vars.forEach(variable =>{
                const nested = variable.split('.').slice(1).join('.');
                objHtml = objHtml.replace(`\$${variable}\$`, eval(`object.${nested}`));
            });
            dataHtml += objHtml;
        })

        html = html.replace(loop, dataHtml)
    });

    var regex = /{{[ a-zA-Z0-9\.]*}}/gi, result, variables = [];
    while ( (result = regex.exec(html)) ) {
        variables.push(result[0]);
    };
    
    variables.forEach(variable => {
        html = html.replace(new RegExp(variable, 'g'), eval(`options.data.${variable.replace(/[{} ]/gi, '')}`));
    });


    const createPDF = (html, pdfOptions) => new Promise(((resolve, reject) => {
        pdf.create(html, pdfOptions).toFile(`${options.destination}/${options.name}.pdf`, function(err, res) {
            if (err) return console.log(err);
            resolve(res);
        });
    }));

    await createPDF(html, pdfOptions);
}

module.exports.htmlToPdfDynamic = htmlToPdfDynamic;