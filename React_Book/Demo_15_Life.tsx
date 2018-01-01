/****************************************************************************/
/*  http://huziketang.com/books/react/lesson18  */
    ReactDOM.render(
     <Header />, 
      document.getElementById('root')
    )

/*  会编译成： */
   
    ReactDOM.render(
      React.createElement(Header, null), 
      document.getElementById('root')
    )

/****************************************************************************/

// React.createElement 中实例化一个 Header
const header = new Header(props, children)
// React.createElement 中调用 header.render 方法渲染组件的内容
const headerJsxObject = header.render()
// ReactDOM 用渲染后的 JavaScript 对象来来构建真正的 DOM 元素
const headerDOM = createDOMFromObject(headerJsxObject)
// ReactDOM 把 DOM 元素塞到页面上
document.getElementById('root').appendChild(headerDOM)

/****************************************************************************/
/*
/*  React.js 将组件渲染，
/*  并且构造 DOM 元素然后塞入页面的过程称为组件的挂载（这个定义请好好记住）。
/*
/*  其实 React.js 内部对待每个组件都有这么一个过程，
/*  也就是初始化组件 -> 挂载到页面上的过程。所以可以理解一个组件的方法调用是这么一个过程：
/*
/****************************************************************************/
/*
/*  总结
/*  React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载。
/*  React.js 控制组件在页面上挂载和删除过程里面几个方法：
/*
/*  componentWillMount：组件挂载开始之前，也就是在组件调用 render 方法之前调用。
/*  componentDidMount：组件挂载完成以后，也就是 DOM 元素已经插入页面后调用。
/*  componentWillUnmount：组件对应的 DOM 元素从页面中删除之前调用。
/*
/****************************************************************************/
