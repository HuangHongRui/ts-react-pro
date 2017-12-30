import * as React from "react"
import {Component} from "react"
import ReactDom from 'react-dom'
class Title extends Component {
    handleClickTitle () {
        console.log( 'Click on title' )
    }

    render() {
        return (
            <h1 onClick = {this.handleClickTitle}> Don't Touch Me..Please </h1>
        )
    }
}

/*****************************************************************************/
/*
/* 在 React.js 不需要手动调用浏览器原生的 addEventListener 进行事件监听。
/* React.js 帮我们封装好了一系列的 on* 的属性，当你需要为某个元素监听某个事件的时候，
/* 只需要简单地给它加上 on* 就可以了。而且你不需要考虑不同浏览器兼容性的问题，
/* React.js 都帮我们封装好这些细节了。
/* 要注意点：这些事件属性名都必须要用驼峰命名法。
/*
/*****************************************************************************/


/******************************EVENT事件**************************************/
/*
/* 事件监听函数会被自动传入一个 event 对象，
/* 这个对象和普通的浏览器 event 对象所包含的方法和属性都基本一致。
/* 不同的是 React.js 中的 event 对象并不是浏览器提供的，而是它自己内部所构建的。
/* React.js 将浏览器原生的 event 对象封装了一下，对外提供统一的 API 和属性，
/* 这样就不用考虑不同浏览器的兼容性问题。
/* 这个 event 对象是符合 W3C 标准（ W3C UI Events ）的，
/* 它具有类似于event.stopPropagation、event.preventDefault 这种常用的方法。
/*/

class HandleDemo extends Component {
    handleClickTitle (e : any) {
        console.log(typeof e)
        console.log( e.target.innerHTML )
        console.log(this)
    }

    render() {
        return (
            <h1 onClick = {this.handleClickTitle.bind(this)}> Don't Touch Me..Please </h1>
        )
    }
}

/*****************************************************************************/


/*****************************************************************************/
/*
/* 因为 React.js 调用我所传给它的方法的时候，
/* 并不是通过对象方法的方式调用（this.handleClickOnTitle），
/* 而是直接通过函数调用 （handleClickOnTitle），
/* 所以事件监听函数内并不能通过 this 获取到实例。
/*
/* PS: this几种指向情况：
/* 1. 作为对象方法调用：指向调用他的对象
/* 2. 作为普通函数调用：在函数中指向 global/window
/* 3. 构造器调用：指向实例
/* 4. Function.prototype.call || apply || bind 调用：指向传给的参数
/*
/* 当需在事件函数中使用当前实例..需要手动将实例方法 bind 绑定到实例上传给React.js
/*/
class BindDemo extends Component {
    handleClickOnTitle (word : string, e : any) {
      console.log(this, word)
    }
    render () {
      return (
        <h1 onClick={this.handleClickOnTitle.bind(this, 'Hello')}>React 小书</h1>
      )
    }
  }
/* 总结：
/* 为 React 的组件添加事件监听很简单，只需使用 React.js 提供了一系列的 on* 方法即可。
/* React.js 会给每个事件监听传入一个 event 对象，
/* 这个对象提供的功能和浏览器提供的功能一致，而且它是 [兼容所有浏览器] 的。
/* React.js 的事件监听方法需要手动 bind 到当前实例，这种模式在 React.js 中非常常用。
/*/
/*****************************************************************************/


