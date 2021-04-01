const fs = require('fs');
const puppeteer = require('puppeteer');


async function htmlToPdfDynamic(options) {
    let html = fs.readFileSync(`${options.pathToHtml}`, 'utf8');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    html = replaceHtmlLogic(html, options.data);
    
    await page.setContent(html, { waitUntil: 'networkidle0' });

    await page.pdf({ format: 'A4', path: `${options.destination}/${options.name}.pdf`, printBackground: true });


    await browser.close();
}

function replaceHtmlLogic(html, data){
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

        data[dataObj].forEach((object, index) => {
            let objHtml = component;
            
            // replace second nested loop
            var regexLoop2 = /\[\[\*for[^\[\]]*\]\]/gi, resultLoop2, loop2s = [];
            while ( (resultLoop2 = regexLoop2.exec(component)) ) {
                loop2s.push(resultLoop2[0]);
            };


            if(loop2s.length >0){
                loop2s.forEach((loop) => {
                    let loopHeader = loop.match(new RegExp(/\*for\([a-zA-Z\$\. ]*\)/, 'ig'));
                    loopHeader = loopHeader[0].replace('*for(', '').replace(')', '').split(' ');
                    let [identifier2, dataObj2] = [loopHeader[0], loopHeader[2]];
                    let component2= loop.replace(new RegExp(/\[\[\*for\([a-zA-Z\$\. ]*\)/, 'g'), '').replace(']]', '');
    
                    dataObj2 = `object.${dataObj2.replace(/\$/g, '').split('.').slice(1).join('1')}`;
                    
                    // get variables in inner forloop
                    var regexVars2 = new RegExp(`\\$${identifier2}\\.[a-zA-Z\.]+\\$`, 'gi'), resultVars2, vars2 = [];
                    while ( (resultVars2 = regexVars2.exec(component)) ) {
                        vars2.push(resultVars2[0].replace(/\$/g, ''));
                    };
                    
                    let componenthtml = '';
                    
                    eval(dataObj2).forEach((appendix) => {
                        // replace variables with values
                        let appendixhtml = component2;
                        vars2.forEach(variable => {
                            const nested = variable.split('.').slice(1).join('.');
                            appendixhtml = appendixhtml.replace(`\$${variable}\$`, eval(`appendix.${nested}`));
                        });
                        componenthtml += appendixhtml;
                    });
                    
                    objHtml = objHtml.replace(loop, componenthtml);
                    // maybe refactor
                    objHtml = objHtml.replace(loop, '');
                });
            }
            

            // end replace second nested loop
            
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
        let replacementData = eval(`data.${variable.replace(/[{} ]/gi, '')}`);
        replacementData = JSON.stringify(replacementData);
        html = html.replace(new RegExp(variable, 'g'), replacementData);
    });

    return html;
}


module.exports.htmlToPdfDynamic = htmlToPdfDynamic;