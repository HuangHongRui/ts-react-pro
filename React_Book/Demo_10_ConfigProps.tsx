/***************************************************************************/   
/*
/*  让组件能适应不同场景下的需求，就要让组件具有一定的“可配置”性。
/*  每个组件都可以接受一个 props 参数，它是一个对象，包含了所有你对这个组件的配置。
/*
/*
/***************************************************************************/   
import React from 'react'
import {Component} from 'react'

class LikeButton extends Component {
    constructor () {
      super()
      this.state = { isLiked: false }
    }
  
    handleClickOnLikeButton () {
      this.setState({
        isLiked: !this.state.isLiked
      })
    }
  
    render () {
      const likedText = this.props.likedText || '取消'
      const unlikedText = this.props.unlikedText || '点赞'
      return (
        <button onClick={this.handleClickOnLikeButton.bind(this)}>
          {this.state.isLiked ? likedText : unlikedText} 👍
        </button>
      )
    }
  }
/***************************************************************************/ /*
/*  从 render 函数可以看出来，组件内部是通过 [this.props] 的方式获取到[组件的参数]的，
/*  如果 this.props 里面有需要的属性我们就采用相应的属性，没有的话就用默认的属性。
/*  那么怎么把 props 传进去呢？在使用一个组件的时候，可以把参数放在标签的属性当中，
/*  [所有的属性都会作为 props 对象的键值]
/*
/***************************************************************************/   
/***************************************************************************/  
/*
/*  JSX 的表达式插入可以在标签属性上使用。所以可以把任何类型的数据作为组件的参数，
/*  包括字符串、数字、对象、数组、甚至是函数等等。
/*
/*  默认配置 defaultProps:
/*  除了用上面的组件 || 操作符来实现默认配置外，还有另一种方式：
/*  defaultProps => 可方便做到默认配置
/*
/*/
class LikeButton1 extends Component {
    static defaultProps = {
        likedText: '取消',
        unlikedText: '点赞'
    }
    constructor() {
        super()
        this.state = { isLiked: false }
    }
    handleClickOnLikeButton() {
        this.setState({
            isLiked: !this.state.isLiked
        })
    }
    render() {
        return (
            <button onClick={this.handleClickOnLikeButton.bind(this)}>
                {this.state.isLiked
                    ? this.props.likedText
                    : this.props.unlikedText} 👍
        </button>
        )
    }
}
/*  里面是对 props 中各个属性的默认配置。这样就不需要判断配置属性是否传进来了：
/*  如果没有传进来，会直接使用 defaultProps 中的默认属性。
/*
/*  不能改变一个组件被渲染的时候传进来的 props。
/*  React.js 希望一个组件在输入确定的 props 的时候，能够输出确定的 UI 显示形态。
/*  如果 props 渲染过程中可以被修改，那么就会导致这个组件显示形态和行为变得不可预测，
/*  这样会可能会给组件使用者带来困惑。

/*  但这不意味着由 props 决定的显示形态不能被修改。
/*  组件的使用者可以主动地通过重新渲染的方式把新的 props 传入组件当中，
/*  这样这个组件中由 props 决定的显示形态也会得到相应的改变。
/*
/***************************************************************************/

/*  栗子：*/
class Index extends Component {
  constructor () {
    super()
    this.state = {
      likedText: '已赞',
      unlikedText: '赞'
    }
  }

  handleClickOnChange () {
    this.setState({
      likedText: '取消',
      unlikedText: '点赞'
    })
  }

  render () {
    return (
      <div>
        <LikeButton
          likedText={this.state.likedText}
          unlikedText={this.state.unlikedText} />
        <div>
          <button onClick={this.handleClickOnChange.bind(this)}>
            修改 
          </button>
        </div>
      </div>
    )
  }
}
/***************************************************************************/
/*
/*  为了使得组件的可定制性更强，在使用组件的时候，可以在标签上加属性来传入配置参数。
/*  组件可以在内部通过 this.props 获取到配置参数，组件可以根据 props 的不同来确定自己的显示形态，达到可配置的效果。
/*  可以通过给组件添加类属性 defaultProps 来配置默认参数。
/*  [ props 一旦传入，你就不可以在组件内部对它进行修改 ]。但是你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果。
/*
/***************************************************************************/




/***************************************************************************
打开关闭电脑：
完成两个组件，电脑 Computer 和显示器 Screen。
电脑有个 status 状态表示电脑现在是开还是关的，status 为 on 为开，status 为 off 为关，默认状态为 off。电脑有个按钮，点击可以自由切换电脑的开关状态。
显示器接受一个名为 showContent 的 props，显示器会把它内容显示出来。如果不传入 showContent，显示器显示 “无内容”。
电脑包含显示器，当电脑状态为开的时候显示器显示“显示器亮了”，否则显示“显示器关了”      */

class App extends Component {
  constructor() {
    super()
    this.state={
      status : "off"  //default
    }
  }
  tabSwitch(){
    this.setState({
      status : this.state.status === "off"? "on":"off"  
    })
  }
  render () {
    return (
      <div>
        <Screen showContent = {this.state.status}/>
        <button onClick={this.tabSwitch.bind(this)}>
          {this.state.status === "off"? "关":"开"}
        </button>
      </div>
    )
  }
}
class Screen extends Component {
  static defaultProps = {
    showContent : '无内容'
  }
  render () {
    return (
      <div className='screen'>{this.props.showContent === "off"? "显示器关了":"显示器亮了"}</div>
    )
  }
}

/***************************************************************************/
