# html-to-pdf-dynamic
Generate a PDF from your own html template and add variables to it.
+ https://www.npmjs.com/package/html-to-pdf-dynamic

## Installation

`npm i --save html-to-pdf-dynamic`

## Usage

``` javascript
htmlToPdfDynamic({
    name: 'testOne',
    destination: './test/output',
    pathToHtml: './test/template/template.html',
    variables: [
        {
            name: 'header2',
            value: 'this is a h2 header'
        },
        {
            name: 'item1',
            value: 'this is list-item'
        },
        {
            name: 'item2',
            value: 'another list-item'
        },
    ]
});
```

## Options

+ *name* - title of the pdf file that will be created
+ *destination* - path to the destination of the generated pdf
+ *pathToHtml* - path to your HTML template
+ *variables* - array of variables you want to change in the HTML (variables must of this format: {{ variableName }})
    + *name* - name of the variable in your HTML template
    + *value* - the value of your variable

## Dependency
This project was created with the node-html-pdf module by [Marc Bachmann](https://github.com/marcbachmann)
- https://github.com/marcbachmann/node-html-pdf
- https://www.npmjs.com/package/html-pdf
