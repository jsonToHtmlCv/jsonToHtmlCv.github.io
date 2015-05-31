

function buildCV(cv) {

    var docFrag = document.createDocumentFragment(),
        header = document.createElement('h3'),
        div = document.createElement('div'),
        span = document.createElement('span');
    header.style.borderBottom = '1px solid #d5d5d5';
    header.style.padding = '0px 5px';
    header.style.margin = '5px 0px';
    span.style.margin = '0px 3px';
    span.style.display = 'inline-block';
    div.style.padding = '3px 3px 3px 10px';
    var firstContainer = div.cloneNode(true),
        headingWrapper,
        prop,
        value;
    docFrag.appendChild(firstContainer);
    recursiveBuild(cv, firstContainer);

    function recursiveBuild(cvObj, oldContainer) {
        if (Array.isArray(cvObj)) {
            for (var a = 0, len = cvObj.length; a < len; a++) {
                var newContainer = div.cloneNode(true);
                oldContainer.appendChild(newContainer);
                recursiveBuild(cvObj[a], newContainer);
            }
        }
        else if (Object.prototype.toString.call(cvObj) === '[object Object]') {

            for (var word in cvObj) {
                if (Array.isArray(cvObj[word])) {
                    headingWrapper = header.cloneNode(true);
                    headingWrapper.innerHTML = word;
                    oldContainer.appendChild(headingWrapper);
                    oldContainer.style.border = '1px solid #d5d5d5';
                    var newContainer = div.cloneNode(true);
                    oldContainer.appendChild(newContainer);
                    recursiveBuild(cvObj[word], newContainer);
                }
                else {
                    prop = span.cloneNode(true);
                    value = span.cloneNode(true);
                    prop.innerHTML = word + ': ';
                    prop.style.textAlign = 'right';
                    prop.style.width = '20%';
                    value.innerHTML = cvObj[word];
                    value.style.textAlign = 'left';
                    oldContainer.appendChild(prop);
                    oldContainer.appendChild(value);
                }
            }
        }
    }

    document.body.appendChild(docFrag);
}

buildCV(cv);


