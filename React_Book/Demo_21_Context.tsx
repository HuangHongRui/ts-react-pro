/***************************************************************************/   
/*
/*  在过去很长一段时间里面，React.js 的 context 一直被视为一个不稳定的、危险的、
/*  可能会被去掉的特性而不被官网文档所记载。但是全世界的第三方库都在用使用这个特性，
/*  直到了 React.js 的 v0.14.1 版本，context 才被官方文档所记录。/*
/*
/*  某个组件只要往自己的 context 里面放了某些状态，
/*  这个组件之下的所有子组件都直接访问这个状态而不需要通过中间组件的传递。
/*  一个组件的 context 只有它的子组件能够访问，它的父组件是不能访问到的，
/*  可以理解每个组件的 context 就是瀑布的源头，只能往下流不能往上飞。
/*
/***************************************************************************/   
//父组件
class Index extends Component {
  // childContextTypes 一定要有
  static childContextTypes = {
    themeColor: PropTypes.string
  }
  constructor () {
    super()
    this.state = { themeColor: 'red' }
  }
  // 设置context
  getChildContext () {
    return { themeColor: this.state.themeColor }
  }
  render () {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}
// 仔仔组件
class Title extends Component {
  //不需要有 contextType 来申明想获取到的context类型.
  static contextTypes = {
    themeColor: PropTypes.string
  }
  render () {
    return (
      <h1 style={{ color: this.context.themeColor }}>React.js</h1>
    )
  }
}
/***************************************************************************/ /*
/*
/*  往 state 里面初始化一个 themeColor 状态。
/*  getChildContext 这个方法就是设置 context 的过程，
/*  它返回的对象就是 context，所有的子组件都可以访问到这个对象。
/*  用 this.state.themeColor 来设置了 context 里面的 themeColor。

/*  还有一个需要注意的 [childContextTypes]，它的作用其实 propsType 验证组件 props 参数的作用类似。
/*  不过它是验证 getChildContext 返回的对象。为什么要验证 context? 因为 context 是一个危险的特性，
/*  按照 React.js 团队的想法就是，把危险的事情搞复杂一些，提高使用门槛人们就不会去用了。
/*  如果要给组件设置 context，那么 childContextTypes 是**必写**的。/*
/*
/***************************************************************************/  
/*
/*  子组件要获取 context 里面的内容的话，就**必须**写 [contextTypes] 来声明和验证你需要获取的状态的类型，
/*  它是必写的，不写后果：无法获取 context 里面的状态。Title 想获取 themeColor，它是一个字符串，
/*  就在 contextTypes 里面进行声明。/*
/*
/*  一个组件可以通过 getChildContext 方法返回一个对象，这个对象就是子树的 context，
/*  提供 context 的组件必须提供 childContextTypes 作为 context 的声明和验证。

/*  如果一个组件设置了 context，那么它的子组件都可以直接访问到里面的内容，
/*  它就像这个组件为根的子树的全局变量。
/*  任意深度的子组件都可以通过 contextTypes 来声明想要的 context 里面的哪些状态，
/*  然后可以通过 this.context 访问到那些状态。

/*  context 打破了组件和组件之间通过 props 传递数据的规范，极大地增强了组件之间的耦合性。
/*  而且，就如全局变量一样，context 里面的数据能被随意接触就能被随意修改，
/*  每个组件都能够改 context 里面的内容会导致程序的运行不可预料。

/*  但是这种机制对于前端应用状态管理来说是很有帮助的，因为毕竟很多状态都会在组件之间进行共享，
/*  context 会给我们带来很大的方便。
/*  一些第三方的前端应用状态管理的库（例如 Redux）就是充分地利用了这种机制给提供便利的状态管理服务。
/*  但一般不需要手动写 context，也不要用它，只需要用好这些第三方的应用状态管理库就行了。/*
/*
/***************************************************************************/
