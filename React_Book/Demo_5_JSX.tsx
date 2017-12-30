// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import { Component } from 'react'
import * as React from 'react'
import * as  ReactDOM  from 'react-dom'
import './index.css'

class Header extends Component {
  render () {
    const isSure = true
    return (
      <div>
        {
          isSure
            ? <strong>True</strong>
            : <p>False</p>
        }
        <h1 className = 'title'>React 小书</h1>
      </div>

/**********************编译以后************************************/

 /*     React.createElement(
 /*       "div",
 /*       "null",
 /*       React.createElement(
 /*         "h1",
 /*         {className : 'title'},
 /*         "React Book"
 /*       )
 /*     )

/*****************************************************************/
//React.createElement 会构建一个 JavaScript 对象来描述你 HTML 结构的信息，包括标签名、属性、还有子元素等。这样的代码就是合法的 JavaScript 代码了。所以使用 React 和 JSX 的时候一定要经过编译的过程。

// 过程： JSX |Babel编译+React.js构造|> JS对象结构 |ReactDOM.render|> DOM元素 > 插入页面

/* 经过中间一层 的好处原因： 
/* 1: 当拿到UI的的结构信息的对象后，可能渲染的到 Web | Canvas | Native 
/* 2: 有这样的一个对象，数据变化需要更新组建时，可用较快的算法操作该JS对象,无需直接操作页面DOM，酱可尽量减少浏览器重排，极大优化新能
/******************************************************************/

    )
  }
}

ReactDOM.render(
  <Header />,
  document.getElementById('root') as HTMLElement
)

/******************************************************************/
/* 总结
/* 1: JSX 是JS语法扩展..只是长得HTML
/* 2: React.js 可以用JSX描述组件长啥样
/* 3: JSX 编译时 变成相应的 JS对象 描述
/* 4: ReactDOM 负责把 描述UI信息 的 JS对象 变为 DOM元素，并渲染到页面
/* http://huziketang.com/books/react/lesson6
/******************************************************************/
