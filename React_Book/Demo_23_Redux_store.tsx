/***************************************************************************/
/*  动手实现 Redux（二）：抽离 store 和监控数据变化 */

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

/***************************************************************************/

/*  把它们集中到一个地方，给这个地方起个名字叫做 store，
/*  然后构建一个函数 createStore，用来专门生产这种 state 和 dispatch 的集合，
/*  这样别的 App 也可以用这种模式了：*/

  function createStore (state, stateChanger) {
    const getState = () => state
    const dispatch = (action) => stateChanger(state, action)
    return { getState, dispatch }
  }

/***************************************************************************/
/*
/*  createStore 接受两个参数，一个是表示应用程序状态的 state；
/*  另外一个是 stateChanger，它来描述应用程序状态会根据 action 发生什么变化，
/*  其实就是相当于前章的 dispatch 代码里面的内容。

/*  createStore 会返回一个对象，这个对象包含两个方法 getState 和 dispatch。
/*  getState 用于获取 state 数据，其实就是简单地把 state 参数返回。
/*  
/*  dispatch 用于修改数据，和以前一样会接受 action，
/*  然后它会把 state 和 action 一并传给 stateChanger，
/*  那么 stateChanger 就可以根据 action 来修改 state 了。
/*  
/*  现在有了 createStore，可以这么修改原来的代码，
/*  保留原来所有的渲染函数不变，修改数据生成的方式：/*
/***************************************************************************/

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

function stateChanger (state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}

const store = createStore(appState, stateChanger)

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
renderApp(store.getState()) // 把新的数据渲染到页面上

/**********************************************************************/
/* 监控数据变化
/* 上面的代码有一个问题，每次通过 dispatch 修改数据的时候，
/* 其实只是数据发生了变化，如果不手动调用 renderApp，页面上的内容是不会发生变化的。
/* 但是总不能每次 dispatch 的时候都手动调用一下 renderApp，
/* 肯定希望数据变化的时候程序能够智能一点地自动重新渲染数据，而不是手动调用。
/* 
/* 这好办，往 dispatch里面加 renderApp 就好了，但是这样 createStore 就不够通用了。
/* 希望用一种通用的方式“监听”数据变化，然后重新渲染页面，这里要用到观察者模式。修改 createStore：*/

function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}

/*  在 createStore 里面定义了一个数组 listeners，还有一个新的方法 subscribe，
/*  可以通过 store.subscribe(listener) 的方式给 subscribe 传入一个监听函数，这个函数会被 push 到数组当中。
/*  
/*  修改了 dispatch，每次当它被调用的时候，除了会调用 stateChanger 进行数据的修改，
/*  还会遍历 listeners 数组里面的函数，然后一个个地去调用。
/*  相当于我们可以通过 subscribe 传入数据变化的监听函数，每当 dispatch 的时候，
/*  监听函数就会被调用，这样就可以在每当数据变化时候进行重新渲染：/*

/***************************************************************************/

  const store = createStore(appState, stateChanger)
  store.subscribe(() => renderApp(store.getState()))

  renderApp(store.getState()) // 首次渲染页面
  store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
  store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
/* ...后面不管如何 store.dispatch，都不需要重新调用 renderApp


/** 现在有了一个比较通用的 createStore，它可以产生一种新定义的数据类型 store，
/** 通过 store.getState 获取共享状态，而且约定只能通过 store.dispatch 修改共享状态。
/** store 也允许通过 store.subscribe 监听数据数据状态被修改了，并且进行后续的例如重新渲染页面的操作。

/***************************************************************************/
