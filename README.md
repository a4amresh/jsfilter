## jsFilter.js

jsFilter is a jQuery advanced filter plugin. Develop for developers, it's easy to use but very powerful.

---

## Features

 * Ctrl+S / Cmd+S to save the file
 * Ctrl+Shift+S / Cmd+Shift+S to choose to save as Markdown or HTML
 * Drag and drop a file into here to load it
 * File contents are saved in the URL so you can share files

----

## Installation

###### If filter time use animation effects so include animate css in header.*

```html
<link rel="stylesheet" href="assets/css/animate.css">
```


###### Place the filter.js file after close body tag, or after you have included jQuery library file. :+1:

```html
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="assets/js/jsfilter.js"></script>
```
---
## Uses
```javascript
//Javascript code
$(document).ready(function() {
    $("#myblog").jsFilter({
        selctor: {
            targets: '.u2',
            filter: '.u2-filter',
            search: {
                input: '#searchInput',
                button: '#searchBtn'
            }
        },
        controls: {
            enable: true,
            animation: {
                enable: true
            },
            search: {
                enable: true,
                onEnter: true
            }
        },
        load: {
            filter: ''
        },
        filters: {
            logic: '', // Defaul and, or
            type: 'select', // Defaul click, select,  what you want fire filter on click or on select
            bntLogic: 'toggle' // Default active,  toggle
        },
        callbacks: {
            filterStart: false,
            filterEnd: false,
            filterFail: function() {
                alert("Not Element on this filter");
            }
        },
        animation: {
            animationIn: 'zoomIn' // animate.css class use
        }
    });
});
 ```

Author [Amrish Pal](https://github.com/amrishpal) so let me know if You've a any query.
