/************************************************************/
/*                  React.js 中一切皆组件                     */
/*   一个组件类必须要实现一个render方法,且必须返回一个JSX元素       */
/*                                                          */
/*                                                          */
/*                                                          */
/************************************************************/


/*************************表达式插入***************************/
/*
/*     render () {
/*       const className = 'header'
/*       return (
/*         <div className={className}>
/*           <h1>React 小书{(function() {return 'Rui'})()}</h1>
/*         </div>
/*       )
/*     }
/*
/*     {} 内可以放任何 JavaScript 的代码，包括变量、表达式计算、函数执行等等。 render 会把这些代码返回的内容如实地渲染到页面上，非常的灵活。
/*
/*     特例：class | for 均为JS关键字..在React中用 className | htmlFor 代替
/*
/************************************************************/

/***************************条件返回***************************/
/*
/*     render () {
/*       const isSure = true
/*       return (
/*          {
/*              isSure
/*              ?<strong>True</strong>
/*              :<span>False</span>
/*          }
/*       )
/*     }
/*
/************************************************************/



/**************************JSX 元素变量****************************/
/*
/*     render () {
/*       const isSure = true,
/*             A = <strong>True</strong>,
/*             B = <span>False</span>
/*       return (
/*          {
/*              isSure
/*              ? A
/*              : B
/*          }
/*       )
/*     }
/*
/* JSX 元素其实可以像 JavaScript 对象那样自由地赋值给变量，或者作为函数参数传递、或者作为函数的返回值。
/*
/*     renderFun (A, B){
/*       let isTrue = true
/*       return(isTrue ? A : B)
/*     }
/*
/*     render () {
/*       const isSure = true,
/*             A = <strong>True</strong>,
/*             B = <span>False</span>
/*       return (
/*          { this.renderFun(A, B) }
/*       )
/*     }
/*  过表达式插入把该函数返回的 JSX 元素插入到页面上
/*
/*****************************************************************/
