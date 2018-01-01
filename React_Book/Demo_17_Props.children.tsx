/***************************************************************************/
/*  有一类组件，充当了容器的作用，它定义了一种外层结构形式，然后你可以往里面塞任意的内容。
/*  这种结构在实际当中非常常见
*/

class Card extends Component {
  render () {
    return (
      <div className='card'>
        <div className='card-content'>
          {this.props.content}
        </div>
      </div>
    )
  }
}
ReactDOM.render(
  <Card content={
    <div>
      <h2>React.js 小书</h2>
       <div>开源、免费、专业、简单</div>
      订阅：<input />
    </div>
  } />,
  document.getElementById('root')
)

/*  可通过 props 属性传入Dom结构 */
/*  也可通过下面这种HTML嵌套形式传入  */

ReactDOM.render(
    <Card>
      <h2>React.js 小书</h2>
      <div>开源、免费、专业、简单</div>
      订阅：<input />
    </Card>,
    document.getElementById('root')
  )

/*  这种只需要在组件内使用 this.props.children 使其显示
/*  打印出来是 一个数组
/*  这种嵌套的内容成为了 props.children 数组的机制使得我们编写组件变得非常的灵活，
/*  甚至可以在组件内部把数组中的 JSX 元素安置在不同的地方：*/

class Layout extends Component {
  render () {
    return (
      <div className='two-cols-layout'>
        <div className='sidebar'>
          {this.props.children[0]}
        </div>
        <div className='main'>
          {this.props.children[1]}
        </div>
      </div>
    )
  }
}

/*  总结
/*  使用自定义组件的时候，可以在其中嵌套 JSX 结构。
/*  嵌套的结构在组件内部都可以通过 props.children 获取到，
/*  这种组件编写方式在编写容器类型的组件当中非常有用。
/*  而在实际的 React.js 项目当中，我们几乎每天都需要用这种方式来编写组件。

/***************************************************************************/