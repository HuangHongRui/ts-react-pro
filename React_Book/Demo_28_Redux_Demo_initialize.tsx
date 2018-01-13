/***************************************************************************/   
/*/
/*  可以看到 Redux 并不复杂，它那些看起来匪夷所思的设定其实都是为了解决特定的问题而存在的，
/*  把问题想清楚以后就不难理解它的那些奇怪的设定了。
/*  这节开始来看看如何把 Redux 和 React.js 结合起来，
/*  会发现其实它们也并不复杂。

/*  回顾一下，在 前端应用状态管理 —— 状态提升 中提过，前端中应用的状态存在的问题：
/*  一个状态可能被多个组件依赖或者影响，而 React.js 并没有提供好的解决方案， 
/*  只能把状态提升到依赖或者影响这个状态的所有组件的公共父组件上，
/*  把这种行为叫做状态提升。但是需求不停变化，共享状态没完没了地提升也不是办法。

/*  后来在 React.js 的 context 中提出，可用把共享状态放到父组件的 context 上，
/*  这个父组件下所有的组件都可以从 context 中直接获取到状态而不需要一层层地进行传递了。
/*  但是直接从 context 里面存放、获取数据增强了组件的耦合性；
/*  并且所有组件都可以修改 context 里面的状态就像谁都可以修改共享状态一样，
/*  导致程序运行的不可预料。

/*  既然这样，为什么不把 context 和 store 结合起来？毕竟 store 的数据不是谁都能修改，
/*  而是约定只能通过 dispatch 来进行修改，
/*  这样的话每个组件既可以去 context 里面获取 store 从而获取状态，又不用担心它们乱改数据了。

/*  听起来不错，动手试一下。还是拿“主题色”这个例子做讲解，假设现在需要做下面这样的组件树：

                                |--> [ 内容 ]
               |-->[ Header  ]--|        
               |                |-->
    [ Index ]--|
               |                |--> [ 内容 ]
               |-->[ Content ]--|                     |--> (YellowBTN) 
                                |--> [ ThemeSwitch ]--|
                                                      |--> (RedBTN)

/********************************************************************************/   

 Header 和 Content 的组件的文本内容会随着主题色的变化而变化，而 Content 下的子组件 ThemeSwitch 有两个按钮，可以切换红色和蓝色两种主题，按钮的颜色也会随着主题色的变化而变化。

/*****************************HEADER*************************************/   

import React, { Component, propTypes } from 'react'
class Header extends Component {
  render(){
    return <h1>HEADER</h1>
  }
}
export default Header

/*****************************CONTENT*************************************/   

import React, { component, propTypes } from 'react'
import ThemeSwitch from './ThemeSwitch'
class Content extends Component {
  render() {
    return(
        <div>
          <h1>CONTENT</h1>
          <ThemeSwitch/>
        </div>
        )
  }
}
export default Content

/*****************************ThemeSwitch*************************************/   

import React, { Component, propTypes } from 'react'
class ThemeSwitch extends Component {
  render() {
    return (
        <div>
          <button>YELLOW</button>
          <button>RED</button>
        </div>
        )
  }
}
export default ThemeSwitch

/*****************************INDEX*************************************/   

import React, { Component, propTypes } from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
class Index extends Component {
  render(){
    return(
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

/*****************************DONE*************************************/   
