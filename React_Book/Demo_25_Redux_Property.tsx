/***************************************************************************/
/*
/*  细心可以发现，其实之前的例子当中是有比较严重的性能问题的。在每个渲染函数的开头打一些 Log 看看：
/*
*/
  function renderApp (appState) {
    console.log('render app...')
    renderTitle(appState.title)
    renderContent(appState.content)
  }

  function renderTitle (title) {
    console.log('render title...')
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
  }

  function renderContent (content) {
    console.log('render content...')
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
  }

/*
/*  结果前三个毫无疑问是第一次渲染打印出来的。中间三个是第一次 store.dispatch 导致的，
/*  最后三个是第二次 store.dispatch 导致的。可以看到问题就是，
/*  每当更新数据就重新渲染整个 App，但其实两次更新都没有动到 appState 里面的 content 字段的对象，
/*  而动的是 title 字段。其实并不需要重新 renderContent，它是一个多余的更新操作，现在我们需要优化它。

/*  这里提出的解决方案是，在每个渲染函数执行渲染操作之前先做个判断，
/*  判断传入的新数据和旧的数据是不是相同，相同的话就不渲染了。
/*
*/
/*  防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}*/
    function renderApp (newAppState, oldAppState = {}) { 
      if (newAppState === oldAppState) return // 数据没有变化就不渲染了
      console.log('render app...')
      renderTitle(newAppState.title, oldAppState.title)
      renderContent(newAppState.content, oldAppState.content)
    }

    function renderTitle (newTitle, oldTitle = {}) {
      if (newTitle === oldTitle) return // 数据没有变化就不渲染了
      console.log('render title...')
      const titleDOM = document.getElementById('title')
      titleDOM.innerHTML = newTitle.text
      titleDOM.style.color = newTitle.color
    }

    function renderContent (newContent, oldContent = {}) {
      if (newContent === oldContent) return // 数据没有变化就不渲染了
      console.log('render content...')
      const contentDOM = document.getElementById('content')
      contentDOM.innerHTML = newContent.text
      contentDOM.style.color = newContent.color
    }

/**************************** 共享结构的对象 *********************************/ 

/*  ES6 的语法：

    const obj = { a: 1, b: 2}
    const obj2 = { ...obj } // => { a: 1, b: 2 }

/*  const obj2 = { ...obj } 其实就是新建一个对象 obj2，
/*  然后把 obj 所有的属性都复制到 obj2 里面，相当于对象的浅复制。
/*  上面的 obj 里面的内容和 obj2 是完全一样的，但是却是两个不同的对象。
/*  除了浅复制对象，还可以覆盖、拓展对象属性：

    const obj = { a: 1, b: 2}
    const obj2 = { ...obj, b: 3, c: 4} // => { a: 1, b: 3, c: 4 }，覆盖了 b，新增了 c

/*  可以把这种特性应用在 state 的更新上，禁止直接修改原来的对象，
/*  一旦你要修改某些东西，就得把修改路径上的所有对象复制一遍

/*  appState.title.text = '《React.js 小书》'
/*  取而代之的是，新建一个 appState，新建 appState.title，新建 appState.title.text：

    let newAppState = { // 新建一个 newAppState
      ...appState, // 复制 appState 里面的内容
      title: { // 用一个新的对象覆盖原来的 title 属性
        ...appState.title, // 复制原来 title 对象里面的内容
        text: '《React.js 小书》' // 覆盖 text 属性
      }
    }

    appState 和 newAppState 其实是两个不同的对象，因为对象浅复制的缘故，
    其实它们里面的属性 content 指向的是同一个对象；但是因为 title 被一个新的对象覆盖了，
    所以它们的 title 属性指向的对象是不同的。同样地，修改 appState.title.color：

    let newAppState1 = { // 新建一个 newAppState1
      ...newAppState, // 复制 newAppState1 里面的内容
      title: { // 用一个新的对象覆盖原来的 title 属性
        ...newAppState.title, // 复制原来 title 对象里面的内容
        color: "blue" // 覆盖 color 属性
      }
    }

/*  每次修改某些数据的时候，都不会碰原来的数据，
/*  而是把需要修改数据路径上的对象都 copy 一个出来。

    appState !== newAppState // true，两个对象引用不同，数据变化了，重新渲染
    appState.title !== newAppState.title // true，两个对象引用不同，数据变化了，重新渲染
    appState.content !== appState.content // false，两个对象引用相同，数据没有变化，不需要重新渲染

/*  修改数据的时候就把修改路径都复制一遍，但是保持其他内容不变，
/*  最后的所有对象具有某些不变共享的结构（例如上面三个对象都共享 content 对象）。
/*  大多数情况下可以保持 50% 以上的内容具有共享结构，这种操作具有非常优良的特性，可以用它来优化上面的渲染性能。

/******************************************************性能优化**************************************************************/

/*  修改 stateChanger，让它修改数据的时候，并不会直接修改原来的数据 state，而是产生上述的共享结构的对象：
*/

function stateChanger (state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state // 没有修改，返回原来的对象
  }
}

/*  代码稍微比原来长了一点，但是是值得的。每次需要修改的时候都会产生新的对象，
/*  并且返回。而如果没有修改（在 default 语句中）则返回原来的 state 对象。

/*  因为 stateChanger 不会修改原来对象了，而是返回对象，所以需要修改一下 createStore。
/*  让它用每次 stateChanger(state, action) 的调用结果覆盖原来的 state：

function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = stateChanger(state, action) // 覆盖原对象
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}

/*  这样成功地把不必要的页面渲染优化掉了，问题解决。
/*  另外，并不需要担心每次修改都新建共享结构对象会有性能、内存问题，因为构建对象的成本非常低，
/*  而且最多保存两个对象引用（oldState 和 newState），其余旧的对象都会被垃圾回收掉。


/******************************************************All-CODE**************************************************************/

      function createStore (state, stateChanger) {
        const listeners = []
        const subscribe = (listener) => listeners.push(listener)
        const getState = () => state
        const dispatch = (action) => {
          state = stateChanger(state, action) // 覆盖原对象
          listeners.forEach((listener) => listener())
        }
        return { getState, dispatch, subscribe }
      }

      function renderApp (newAppState, oldAppState = {}) { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
        if (newAppState === oldAppState) return // 数据没有变化就不渲染了
        console.log('render app...')
        renderTitle(newAppState.title, oldAppState.title)
        renderContent(newAppState.content, oldAppState.content)
      }

      function renderTitle (newTitle, oldTitle = {}) {
        if (newTitle === oldTitle) return // 数据没有变化就不渲染了
        console.log('render title...')
        const titleDOM = document.getElementById('title')
        titleDOM.innerHTML = newTitle.text
        titleDOM.style.color = newTitle.color
      }

      function renderContent (newContent, oldContent = {}) {
        if (newContent === oldContent) return // 数据没有变化就不渲染了
        console.log('render content...')
        const contentDOM = document.getElementById('content')
        contentDOM.innerHTML = newContent.text
        contentDOM.style.color = newContent.color
      }

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
            return { // 构建新的对象并且返回
              ...state,
              title: {
                ...state.title,
                text: action.text
              }
            }
          case 'UPDATE_TITLE_COLOR':
            return { // 构建新的对象并且返回
              ...state,
              title: {
                ...state.title,
                color: action.color
              }
            }
          default:
            return state // 没有修改，返回原来的对象
        }
      }

      const store = createStore(appState, stateChanger)
      let oldState = store.getState() // 缓存旧的 state
      store.subscribe(() => {
        const newState = store.getState() // 数据可能变化，获取新的 state
        renderApp(newState, oldState) // 把新旧的 state 传进去渲染
        oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
      })

      renderApp(store.getState()) // 首次渲染页面
      store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
      store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色

/******************************************************All-CODE**************************************************************/
