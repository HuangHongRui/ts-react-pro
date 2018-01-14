/***************************************************************************/   

https://github.com/HuangHongRui/redux-demo-app/tree/master/src/List/Demo9

/*  在工程目录下使用 npm 安装 Redux 和 React-redux 模块：
/*  
*/  npm install redux react-redux --save
/*  把 src/ 目录下 Header.js、ThemeSwitch.js、Content.js 的模块导入中的：
/*  
*/  import { connect } from './react-redux'
/*  改成：
/*  
*/  import { connect } from 'react-redux'
/*  也就是本来从本地 ./react-redux 导入的 connect 改成从第三方 react-redux 模块中导入。
/*  
/*  修改 src/index.js，把前面部分的代码调整为：
*/  
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { createStore } from 'redux'
    import { Provider } from 'react-redux'
    import Header from './Header'
    import Content from './Content'
    import './index.css'
    
    const themeReducer = (state, action) => {
      if (!state) return {
        themeColor: 'red'
      }
      switch (action.type) {
        case 'CHANGE_COLOR':
          return { ...state, themeColor: action.themeColor }
        default:
          return state
      }
    }
    
    const store = createStore(themeReducer)
    
    ...
/*  删除了自己写的 createStore，改成使用第三方模块 redux 的 createStore；
/*  Provider 本来从本地的 ./react-redux 引入，
/*  改成从第三方 react-redux 模块中引入。其余代码保持不变。
/*  
/*  接着删除 src/react-redux.js，它的已经用处不大了。最后启动工程 npm start：

/**********************************DONE***************************************/   
