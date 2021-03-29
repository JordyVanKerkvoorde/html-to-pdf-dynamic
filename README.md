# html-to-pdf-dynamic
Generate a PDF from your own html template and add variables to it.
+ https://www.npmjs.com/package/html-to-pdf-dynamic

## Change log
- made function async
- changed from variables to data where data now contains json objects
- added (basic) for loop support
- changed dependency node-html to puppeteer

## Installation

`npm i html-to-pdf-dynamic`

## Usage

``` html
    <p>{{ exampleObject.name }}</p>
```

``` javascript
htmlToPdfDynamic({
    name: 'testOne',
    destination: './test/output',
    pathToHtml: './test/template/template.html',
    data: {
        exampleObject: {
            name: 'this is an example'
        },
        exampleArray: [
            {
                objParam: 'this is an example array',
                objVal: 'just showing how it could work'
            },
            {
                objParam: 'this is an example array',
                objVal: 'just showing how it could work'
            }
        ]
    }
});
```

### for loop support
``` html
<div>
    {{*for(object in exampleArray)
        <div class="message">
            <p>$object.objParam$</p>
            <p>$object.objVal$</p>
        </div>
    }}
</div>
```
- note: not tested on nested arrays (example jsonObject.myExampleArray)

## Options

+ *name* - title of the pdf file that will be created
+ *destination* - path to the destination of the generated pdf
+ *pathToHtml* - path to your HTML template
+ *data* - array of jsonObjects you want to change in the HTML (variables must of this format: {{ jsonObject.variableName }})

## Dependency
- built with puppeteer