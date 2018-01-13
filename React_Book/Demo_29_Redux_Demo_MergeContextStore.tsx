/***************************************************************************/   
/*/
/*  既然要把 store 和 context 结合起来，就先构建 store。
/*  在 src/index.js 加入之前创建的 createStore 函数，
/*  并且构建一个 themeReducer 来生成一个 store：
/*
/*  https://github.com/HuangHongRui/redux-demo-app/tree/master/src/List/Demo5
*/
/******************************INDEX****************************************/   

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'

const createStore = (reducer) => {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return { subscribe, getState, dispatch }
}

const themeReducer = (state, action) => {
  if(!state) return {
    themeColor : 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state,
        themeColor : action.themeColor
      }
    default:
      return state
  }
}

const store = createStore(themeReducer)

class Index extends Component {
  static childContextTypes = {
    store : PropTypes.object
  }
  getChildContext() {
    return { store }
  }
  render() {
    return (
      <div>
        <Header/>
        <Content/>
      </div>
    )
  }
}

ReactDOM.render(
  <Index/>,
  document.getElementById('root')
)


/******************************HEADER*************************************/   

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Header extends Component{
  static contextTypes = {
    store: PropTypes.object
  }
  constructor() {
    super()
    this.state = {
      themeColor : ''
    }
  }
  componentWillMount() {
    let { store } = this.context
    this._updateThemeColor()
    store.subscribe(() => this._updateThemeColor())
  }
  _updateThemeColor() {
    const { store } = this.context
    const state = store.getState()
    this.setState({
      themeColor : state.themeColor
    })
  }
  render(){
    return <h1 style={{ color: this.state.themeColor }}>123</h1>
  }
}

export default Header

/******************************CONTENT*************************************/   

import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'

class Content extends Component{
  static contextTypes = {
    store : PropTypes.object
  }
  constructor() {
    super()
    this.state = {
      themeColor : ''
    }
  }
  componentWillMount() {
    let { store } = this.context
    this._updateThemeColor()
    store.subscribe(() => this._updateThemeColor())
  }
  _updateThemeColor() {
    let { store } = this.context
    const state = store.getState()
    this.setState({
      themeColor : state.themeColor
    })
  }
  render(){
    return (
      <div>
        <h1 style = {{ color : this.state.themeColor }}>Content</h1>
        <ThemeSwitch/>
      </div>
    )
  }
}

export default Content

/*****************************ThemeSwitch*************************************/   

import React,{ Component } from 'react'
import PropTypes from 'prop-types'

class ThemeSwitch extends Component{
  static contextTypes = {
    store : PropTypes.object
  }
  constructor() {
    super()
    this.state = {
      themeColor : ''
    }
  }
  componentWillMount() {
    let { store } = this.context
    this._updateThemeColor()
    store.subscribe(() => this._updateThemeColor())
  }
  _updateThemeColor() {
    let { store } = this.context
    const state = store.getState()
    this.setState({
      themeColor: state.themeColor
    })
  }
  handleSwitchColor(color) {
    let { store } = this.context
    store.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    }) 
  }
  render(){
    return (
      <div>
        <button onClick={ this.handleSwitchColor.bind(this,'yellow')} style={{ color : this.state.themeColor}}>YELLOW</button>
        <button onClick={ this.handleSwitchColor.bind(this,'blue')} style={{ color : this.state.themeColor}}>RED</button>
      </div>
    )
  }
}

export default ThemeSwitch

/*****************************DONE*************************************/   
