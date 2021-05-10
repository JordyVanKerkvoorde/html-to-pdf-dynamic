# html-to-pdf-dynamic
Generate a PDF from your own html template and add variables to it.
+ https://www.npmjs.com/package/html-to-pdf-dynamic

## Change log
- changed from variables to data where data now contains json objects
- added (basic) for loop support
- changed dependency node-html to puppeteer
- added inner nested for loop support

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

### nested for loop
``` html
<div>
    {{*for(object in exampleArray)
        <div class="message">
            <p>$object.objParam$</p>
            <p>$object.objVal$</p>
        </div>
        [[*for(item in $object.nestedarray$)
            <div>
                <p>$item.value$</p>
                <p>$item.param$</p>
            </div>
        ]]
    }}
</div>
```

### injecting data into script
- you can inject data into the script in the html file by using the eval() funtion

``` html
<script>
    const myObject = eval('{{ exampleObject }}');
</script>
```

## Options

+ *name* - title of the pdf file that will be created
+ *destination* - path to the destination of the generated pdf
+ *pathToHtml* - path to your HTML template
+ *data* - array of jsonObjects you want to change in the HTML

## Notes
- adding images: convert your image to a base64 string and add the data in the img source.
    - <img src="data:$img.type$;base64, $img.data$">
- to prevent page breaks in the middle of your html add the following styles:
    - `style="page-break-after:always;"` this wil force a pagebreak after this html tag
    - `style="page-break-inside: avoid"` this wil avoid breaking inside your tag, usefull for images for instance
- Depending on the node version you might need to install chromium manually. In this case you need to set the path to chromium as environment variable `CHROMIUM_PATH`


## Dependency
- built with puppeteer