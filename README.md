# html-to-pdf-dynamic
Generate a PDF from your own html template and add variables to it.
+ https://www.npmjs.com/package/html-to-pdf-dynamic

## Change log
- made function async
- changed from variables to data where data now contains json objects

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
+ *data* - object of jsonObjects you want to change in the HTML (variables must of this format: {{ jsonObject.variableName }})

## Important remarks
- if you want to add styling to your html the best option to do so is putting your style in the html page using a style tag.
- to use flexbox properties try adding '-webkit-' in front of the style property:
    - example: ``` display: -webkit-flex; ```
    - this works on some flex properties but not all
- for font-weight styling use numbers instead of bold, bolder etc. 

## Dependency
This project was created with the node-html-pdf module by [Marc Bachmann](https://github.com/marcbachmann)
- https://github.com/marcbachmann/node-html-pdf
- https://www.npmjs.com/package/html-pdf
