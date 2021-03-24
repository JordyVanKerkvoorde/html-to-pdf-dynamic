# html-to-pdf-dynamic
Generate a PDF from your own html template and add variables to it.
+ https://www.npmjs.com/package/html-to-pdf-dynamic

## Installation

`npm i html-to-pdf-dynamic`

## Usage

``` javascript
htmlToPdfDynamic({
    name: 'testOne',
    destination: './test/output',
    pathToHtml: './test/template/template.html',
    data: {
        exampleObject: {
            name: 'this is an example'
        }
    }
});
```

## Options

+ *name* - title of the pdf file that will be created
+ *destination* - path to the destination of the generated pdf
+ *pathToHtml* - path to your HTML template
+ *data* - array of jsonObjects you want to change in the HTML (variables must of this format: {{ jsonObject.variableName }})

## Dependency
This project was created with the node-html-pdf module by [Marc Bachmann](https://github.com/marcbachmann)
- https://github.com/marcbachmann/node-html-pdf
- https://www.npmjs.com/package/html-pdf
