/***************************setState接受对象参数********************************/
/*
/* setState 方法由父类 Component 所提供。
/* 当我们调用这个函数的时候，React.js 会更新组件的状态 state ，
/* 并且重新调用 render 方法，然后再把 render 方法所渲染的最新的内容显示到页面上。
/*
/* 注意，当要改变组件的状态的时候，不可直接用 this.state = xxx 这种方式来修改，
/* 如果这样做 React.js 就没办法知道你修改了组件的状态，它也就没有办法更新页面。
/* 所以，一定要使用 React.js 提供的 setState 方法，它接受一个对象或者函数作为参数。

/* 传入一个对象的时候，这个对象表示该组件的新状态。但你只需要传入需要更新的部分就可以了，
/* 而不需要传入整个对象。
/*
/*****************************************************************************/


/***************************setState接受函数参数********************************/
/*
/* 注意的是，当你调用 setState 的时候，React.js 并不会马上修改 state。
/* 而是把该对象(传入的参数对象.)放到一个更新队列里，
/* 稍后才会从队列当中把新的状态提取出来合并到 state 当中，
/* 然后再触发组件更新。这一点要好好注意。
/*
/*栗子*/
import * as React from 'react'
import {Component} from 'react'
class setStateDome extends Component{
    constructor(props : any){
        super(props)
        this.state = {
            isLiked : true
        }
    }
  handleClickButton() {
    console.log(this.state.isLiked)
    this.setState({
      isLiked : !this.state.isLiked
    })
    console.log(this.state.isLiked)
  }
/* React.js 的 setState 把传进来的状态缓存起来，稍后才会更新到 state 上，
/* 所以获取到的还是原来的 isLiked。 
/* 所以如果你想在 setState 之后使用新的 state 来做后续运算就做不到了
/*
/* 栗子：*/
  handleClickOnLikeButton1 () {
    this.setState({ count: 0 }) // => this.state.count 还是 undefined
    this.setState({ count: this.state.count + 1}) // => undefined + 1 = NaN
    this.setState({ count: this.state.count + 2}) // => NaN + 2 = NaN
  }
/*/
/*  因为这种依赖前一个 setState 的结果的情况很多..
/*  自然引出第二种 使用方式: 可接受一个 函数 作为参数。
/*  React.js 会把上一个 setState 的结果传入这个函数，
/*  这时就可以使用该结果进行 [运算、操作] 然后返回一个对象作为更新state的对象
/*
/* 栗子*/
handleClickOnLikeButton2 () {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 最后的结果是 this.state.count 为 3
  }
}
/*
/*****************************************************************************/


/*****************************************************************************/
/*  上面我们进行了三次 setState，但是实际上组件只会重新渲染一次，而不是三次；
/*  这是因为在 React.js 内部会把 JS 事件循环中的消息队列的同一个消息中的 setState 
/*  都进行合并以后再重新渲染组件。

/*  深层的原理并不需要过多纠结，只需要[记住]的是：在使用 React.js 的时候，
/*  并不需要担心多次进行 setState 会带来性能问题。
/*****************************************************************************/


