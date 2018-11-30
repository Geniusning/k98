(function() {
    function createElement(vNode) {
        let tag = vNode.tag;
        let attrs = vNode.attrs || {};
        let children = vNode.children || [];
        if (!tag) {
            return null;
        }
        //创建真实dom标签
        let ele = document.createElement(tag);
        for (let attrsName in attrs) {
            if (attrs.hasOwnProperty(attrs[attrsName])) {
                ele.setAttribute(attrsName, attrs[attrsName])
            }
        }
        //创建子元素；
        children.forEach(element => {
            ele.appendChild(createElement(element));
        });
        //返回真实dom 元素
        return ele;

    }
})()