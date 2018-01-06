/***************************************************************************/
/*  Redux 和 React-redux 并不是同一个东西。
/*  Redux 是一种架构模式（Flux 架构的一种变种），它不关注开发者到底用什么库，
/*  可以把它应用到 React 和 Vue，甚至跟 jQuery 结合都没有问题。
/*  而 React-redux 就是把 Redux 这种架构模式和 React.js 结合起来的一个库，
/*  就是 Redux 架构在 React.js 中的体现。

/*  renderApp(appState) 之前执行了一大堆函数操作，根本不知道它们会对 appState 做什么事情，
/*  nderApp(appState) 的结果根本没法得到保障。一个可以被不同模块任意修改共享的数据状态就是魔鬼，
/*  旦数据可以任意修改，所有对共享状态的操作都是不可预料的
/*  某个模块 appState.title = null 一点意见都没有），出现问题的时候 debug 起来就非常困难，
/*  就是大佬们常谈的尽量避免全局变量。

/*  能会想去看一下它们函数的实现就知道了它们修改了什么，在这个例子里面还算比较简单，
/*  是真实项目当中的函数调用和数据初始化操作非常复杂，深层次的函数调用修改了状态是很难调试的。

/*  但不同的模块（组件）之间确实需要共享数据，这些模块（组件）还可能需要修改这些共享数据，
/*  就像之前的“主题色”状态（themeColor）。这里的矛盾就是：“模块（组件）之间需要共享数据”，
/*  和“数据可能被任意修改导致不可预料的结果”之间的矛盾。

/*  想办法解决这个问题，可以学习 React.js 团队的做法，把事情搞复杂一些，提高数据修改的门槛：
/*  模块（组件）之间可以共享数据，也可以改数据。但是约定，这个数据并不能直接改，
/*  只能执行某些允许的某些修改，而且修改的必须大张旗鼓地告诉开发者。

/*  定义一个函数，叫 dispatch，它专门负责数据的修改：
/***************************************************************************/

function dispatch (action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break
    default:
      break
  }
}


/***************************************************************************/
/*
/*  所有对数据的操作必须通过这个 dispatch 函数。它接受一个参数 action，
/*  这个 action 是一个普通的 JavaScript 对象，里面必须包含一个 type 字段来声明你到底想干什么。
/*  dispatch 在 swtich 里面会识别这个 type 字段，能够识别出来的操作才会执行对 appState 的修改。
/*  
/*  上面的 dispatch 它只能识别两种操作，
/*  一种是 UPDATE_TITLE_TEXT 它会用 action 的 text 字段去更新 appState.title.text；
/*  一种是 UPDATE_TITLE_COLOR，它会用 action 的 color 字段去更新 appState.title.color。
/*  可以看到，action 里面除了 type 字段是必须的以外，其他字段都是可以自定义的。
/*  
/*  任何的模块如果想要修改 appState.title.text，必须大张旗鼓地调用 dispatch：

/*  dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
/*  dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色/*

/*  不需要担心 renderApp(appState) 之前的那堆函数操作会干什么奇奇怪怪得事情，
/*  因为规定不能直接修改 appState，它们对 appState 的修改必须只能通过 dispatch。
/*  而看看 dispatch 的实现可以知道，只能修改 title.text 和 title.color。
/*  
/*  如果某个函数修改了 title.text 但是我并不想要它这么干，我需要 debug 出来是哪个函数修改了，
/*  我只需要在 dispatch的 switch 的第一个 case 内部打个断点就可以调试出来了。
/*  
/*  原来模块（组件）修改共享数据是直接改的：

    [Action] --->|                  | 很难把控每一根指向 appState 的箭头， 
    [Action] --->|                  | appState 里面的东西就无法把控。
    [Action] --->|-->[appState]     | 
    [Action] --->|                  | 
    [Action] --->|                  | 
________________________________________________________________________________________________________

    [Action] --->|                           | 现在我们必须通过一个“中间人” —— dispatch， 
    [Action] --->|                           | 所有的数据修改必须通过它，并且必须用 action 来大声告诉它要修改什么，
    [Action] --->|-->[dispatch]-->[appState] | 只有它允许的才能修改：
    [Action] --->|                           | 再也不用担心共享数据状态的修改的问题，只要把控了 dispatch， 
    [Action] --->|                           | 所有的对 appState 的修改就无所遁形，毕竟只有一根箭头指向 appState了。



/**************************************************ALL CODE***************************************************/
let appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function dispatch (action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break
    default:
      break
  }
}

function renderApp (appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle (title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent (content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

renderApp(appState) // 首次渲染页面
dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
renderApp(appState) // 把新的数据渲染到页面上