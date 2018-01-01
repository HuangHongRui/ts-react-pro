/*************************************************/
class AutoFocusInput extends Component {
  componentDidMount () {
    this.input.focus()
  }

  render () {
    return (
      <input ref={(input) => this.input = input} />
    )
  }
}

ReactDOM.render(
  <AutoFocusInput />,
  document.getElementById('root')
)
/*************************************************

/*  可以看到给 input 元素加了一个 ref 属性，这个属性的值是一个函数。
/*  当 input 元素在页面上挂载完成以后，React.js 就会调用这个函数，
/*  并且把这个挂载以后的 DOM(input) 节点(作为参数)传给这个函数。
/*  在函数中我们把这个 DOM(inpu) 元素设置为组件实例的一个属性(this.input)，
/*  这样以后就可以通过 this.input 获取到这个 DOM 元素。

/*  然后就可以在 componentDidMount 中使用这个 DOM 元素，
/*  并且调用 this.input.focus() 的 DOM API。
/*  整体就达到了页面加载完成就自动 focus 到输入框的功能
/*  （可以注意到用上了 componentDidMount 这个组件生命周期）。

/*  可以给任意代表 HTML [元素标签] 和 [组件标签] 加上 ref.
/*  从而获取到它 DOM 元素然后调用 DOM API。
/*  但是记住一个[原则]：能不用 ref 就不用。
/*  特别是要避免用 ref 来做 React.js 本来就可以帮助做到的页面自动更新的操作和事件监听。
/*  多余的 DOM 操作其实是代码里面的“噪音”，不利于理解和维护。

/*************************************************/
