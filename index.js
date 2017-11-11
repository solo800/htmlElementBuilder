/**
 * The htmlElementBuilder builds an element and it's children based on a specified format
 *
 * Example of a possible passedArgs object
 *
 * {
 *     tag: 'div',
 *     classes: 'container row warning',
 *     children: [
 *         {
 *             tag: 'p',
 *             attrs: {
 *                 'data-analytics-id': 21
 *             },
 *             text: 'Hello, I am a p element in a div'
 *         }
 *     ]
 * }
 *
 * The above example would result in html elements that look like this
 *
 * <div class='container row warning'>
 *     <p data-analytics-id='21'>Hello, I am a p element in a div</p>
 * </div>
 */
function htmlElementBuilder (passedArgs = {}) {
    const createElem = function (passedArgs) {
        let defArgs = {
            tag: 'div',
            type: '',
            placeholder: '',
            attrs: {},
            text: '',
            id: '',
            classes: '',
            children: [],
            height: '',
            width: '',
            backgroundColor: '',
        };
        let args = Object.assign({}, defArgs, passedArgs);
        let elem = document.createElement(args.tag);
        let childElem;
        let attr;

        if ('button' === args.tag) {
            elem.setAttribute('type', 'button');
        }

        for (attr in args.attrs) {
            if (args.attrs.hasOwnProperty(attr)) {
                elem.setAttribute(attr, args.attrs[attr]);
            }
        }

        if ('' !== args.text) {
            elem.innerHTML = args.text;
        }
        if ('' !== args.classes) {
            elem.setAttribute('class', args.classes);
        }
        if ('' !== args.id) {
            elem.setAttribute('id', args.id);
        }
        if ('' !== args.type) {
            elem.setAttribute('type', args.type);
        }
        if ('' !== args.placeholder) {
            elem.setAttribute('placeholder', args.placeholder);
        }
        if ('' !== args.width) {
            elem.style.width = args.width;
        }
        if ('' !== args.height) {
            elem.style.height = args.height;
        }
        if ('' !== args.backgroundColor) {
            elem.style.backgroundColor = args.backgroundColor;
        }

        if (0 < args.children.length) {
            args.children.forEach((child) => {
                // This ternary checks if the child passed is already a DOM object and does no processing on it if it is
                // Otherwise it is assumed that the object needs to be processed by createElem
                childElem = -1 < Object.prototype.toString.call(child).indexOf('HTML') ? child : createElem(child);

                elem.appendChild(childElem);
            });
        }

        return elem;
    };

    return createElem(passedArgs);
};
