/**************************************************************************/
/*    
/*    什么是高阶组件
/*    高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。
/*    
*/   const NewComponent = higherOrderComponent(OldComponent)
/*    
/*    重要的事情再重复一次，高阶组件是一个函数（而不是组件），
/*    它接受一个组件作为参数，返回一个新的组件。这个新的组件会使用你传给它的组件作为子组件
/*
/*    大概模版*/
      import React, { Component } from 'react'
      export default (WrappedComponent) => {
        class NewComponent extends Component {
          // 可以做很多自定义逻辑
          render () {
            return <WrappedComponent />
          }
        }
        return NewComponent
      }
/*    大概模版

/**************************************************************************/
/*    接受一个 组件&name参数 
/*    获取到localStorage的name后，保存于state中.
/*    然后将值作为props传入传进来的组件中
/*    最后返回新的组件.
*/
import React, { Component } from 'react'
export default (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor () {
      super()
      this.state = { data: null }
    }

    componentWillMount () {
      let data = localStorage.getItem(name)
      this.setState({ data })
    }

    render () {
      return <WrappedComponent data={this.state.data} />
    }
  }
  return NewComponent
}
/* 被传进去的组件将作为子组件.
/* 使用：
/*
/* 1.引入高阶组件*/
import wrapWithLoadData from './wrapWithLoadData'
/* 需要处理的组件*/
class InputWithUserName extends Component {
  render () {
    /* 该组件需要父组件传入数据参数*/
    return <input value={this.props.data} />
  }
}
/* 使用高阶组件 对该组件进行处理..并返回一个 处理后的&加工过的&全新的组件*/
InputWithUserName = wrapWithLoadData(InputWithUserName, 'username')
/* 多个组件复用*/
InputWithContent = wrapWithLoadData(InputWithUserName, 'content')
/* 导出*/
export default InputWithUserName
/*
*/
import InputWithUserName from './InputWithUserName'
class Index extends Component {
  render () {
    return (
      <div>
        /*使用*/
        用户名：<InputWithUserName />
      </div>
    )
  }
}

/**************************************************************************/

/*   写起来非常轻松，根本不需要重复写从 LocalStorage 加载数据字段的逻辑，
/*   直接用 wrapWithLoadData 包装一下就可以了。

/*   Now来回顾一下到底发生了什么事情，对于 InputWithUserName 和 TextareaWithContent 这两个组件来说，
/*   它们的[ 需求有着这么一个相同的逻辑 ]：“挂载阶段从 LocalStorage 中加载特定字段数据”。

/*   如果按照之前的笨方法，需要给它们( 重编辑 )两个都加上 componentWillMount 生命周期，
/*   然后在里面调用 LocalStorage。要是有第三个组件也有这样的加载逻辑，我又得写一遍这样的逻辑。
/*   但有了 wrapWithLoadData 高阶组件，把这样的逻辑用一个组件包裹了起来，
/*   并且通过给高阶组件传入 name 来达到不同字段的数据加载。充分[ 复用 ]了逻辑代码。

/*   到这里，高阶组件的作用其实不言而喻，就是为了[ 组件之间的代码复用 ]。[ 组件可能有着某些相同的逻辑，
/*   把这些逻辑抽离出来，放到高阶组件中进行复用
/*   (把相同的可复用的逻辑取出并放到高阶组件去，需要时使用高阶组件将逻辑注入) ]。
/*   高阶组件内部的 [包装组件] 和 [被包装组件] 之间通过 props 传递数据。

/**********************************************************************************************/

/*   代码复用的方法、形式有很多种，可以用类继承来做到代码复用，也可以分离模块的方式。
/*   但是高阶组件这种方式很有意思，也很灵活。学过设计模式的话应该能反应过来，
/*   它其实就是设计模式里面的[ 装饰者模式 ]。它通过组合的方式达到很高的灵活程度。

/**********************************************************************************************/
/*   
/*   多层高阶组件
/*   */
...
    componentWillMount () {
      ajax.get('/data/' + this.props.data, (data) => {
        this.setState({ data })
      })
    }
...
/*   它会用传进来的 props.data 去服务器取数据。这时候修改 InputWithUserName：*/
import wrapWithLoadData from './wrapWithLoadData'
import wrapWithAjaxData from './wrapWithAjaxData'
class InputWithUserName extends Component {
  render () {
    return <input value={this.props.data} />
  }
}
/*谁被依赖就放最外面*/
InputWithUserName = wrapWithAjaxData(InputWithUserName)
InputWithUserName = wrapWithLoadData(InputWithUserName, 'username')
export default InputWithUserName
/*
/*
/************************************Exercise************************************************/
/* https://scriptoj.com/problems/14 */

Post = loadAndRefresh('/post')(Post)
// getData(url) 已经可以直接使用
// 本站的环境都可以使用 async/await

/* 高阶函数*/
const loadAndRefresh = (url) => {
/* 高阶组件*/
  return (OldComponent) => {
    class NewComponent extends Component {
      constructor() {
        super()
        this.state = {
          content: '',
        }
      }
      /* async/await */
      async getData() {
        return await getData(url)
      }
      load() {
        this.setState({content: '数据加载中...'})
        this.getData().then((content) => {
          this.setState({content})
        })
      }
      componentWillMount() {
        this.load()
      }
      handFrech() {
        this.load()
      }
      render(){
        return <OldComponent 
        content={this.state.content}
        refresh={this.handFrech.bind(this)}
        {...this.props}/>
      }
    }
    return NewComponent
  }
} 
/*
/************************************Exercise************************************************/
