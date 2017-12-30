/***************************************************************************/
/*  渲染存放 JSX 元素的数组  
/*
/*  const users = [
        { username: 'Jerry', age: 21, gender: 'male' },
        { username: 'Tomy', age: 22, gender: 'male' },
        { username: 'Lily', age: 19, gender: 'female' },
        { username: 'Lucy', age: 20, gender: 'female' }
    ]

  
    class Index extends Component {
    render () {
        return (
        <div>
            {[
            <span>React.js </span>,
            <span>is </span>,
            <span>good</span>
            ]}
        </div>
        )
    }
    }
    
    ReactDOM.render(
    <Index />,
    document.getElementById('root')
    )

/***************************************************************************/



/***************************************************************************/
/*
/*  React.js 把插入表达式数组里面的每一个 JSX 元素一个个罗列下来，渲染到页面上。
/*  所以这里有个关键点：
/*      如果你往 {} 放一个数组，React.js 会帮你把数组里面一个个元素罗列并且渲染出来。
/*
/***************************************************************************/

/****************************使用 map 渲染列表数据*****************************/
import React,{Component} from 'react'
import ReactDOM from "react-dom"

const users = [
    { username: 'Jerry', age: 21, gender: 'male' },
    { username: 'Tomy', age: 22, gender: 'male' },
    { username: 'Lily', age: 19, gender: 'female' },
    { username: 'Lucy', age: 20, gender: 'female' }
  ]
  
  class Index extends Component {
    render () {
      const usersElements = [] // 保存每个用户渲染以后 JSX 的数组
      for (let user of users) {
        usersElements.push( // 循环每个用户，构建 JSX，push 到数组中
          <div>
            <div>姓名：{user.username}</div>
            <div>年龄：{user.age}</div>
            <div>性别：{user.gender}</div>
            <hr />
          </div>
        )
      }
  
      return (
        <div>{usersElements}</div>
      )
    }
  }
  
  ReactDOM.render(
    <Index />,
    document.getElementById('root')
  )
/*一般都用 ES6 自带的 map 方法：*/
class Index1 extends Component {
    render () {
      return (
        <div>
          {users.map((user) => {
            return (
              <div>
                <div>姓名：{user.username}</div>
                <div>年龄：{user.age}</div>
                <div>性别：{user.gender}</div>
                <hr />
              </div>
            )
          })}
        </div>
      )
    }
  }

/*  这样的模式在 JavaScript 中非常常见，
/*  一般来说，在 React.js 处理列表就是用 map 来处理、渲染的。
/*  现在进一步把渲染单独一个用户的结构抽离出来作为一个组件，继续优化代码 */

const users1 = [
    { username: 'Jerry', age: 21, gender: 'male' },
    { username: 'Tomy', age: 22, gender: 'male' },
    { username: 'Lily', age: 19, gender: 'female' },
    { username: 'Lucy', age: 20, gender: 'female' }
  ]
  
  class User extends Component {
    render () {
      const { user }:any = this.props
      return (
        <div>
          <div>姓名：{user.username}</div>
          <div>年龄：{user.age}</div>
          <div>性别：{user.gender}</div>
          <hr />
        </div>
      )
    }
  }
  
  class Index2 extends Component {
    render () {
      return (
        <div>
          {users.map((user, i) => <User key={i} user={user} />)}
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <Index />,
    document.getElementById('root')
  )

/*  需要记住一个简单的规则：
/*      对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 key 属性，
/*      这个 key 必须是每个元素唯一的标识。
/*      一般来说，key 的值可以直接后台数据返回的 id，因为后台的 id 都是唯一的。
/*
/*      http://huziketang.com/books/react/lesson13
/*k
/***************************************************************************/

/*  现在需要你构建两个组件。一个组件为 Lesson 组件，渲染特定章节的内容。
    可以接受一个名为 lesson 的 props，并且把章节以下面的格式显示出来：

    <h1>Lesson 1: title</h1>
    <p>Lesson 1: description</p>
    点击每个章节的时候，需要把章节在列表中的下标和它的标题打印（console.log）出来，
    例如第一个章节打印： 0 - Lesson 1: title，第二个章节打印：1 - Lesson 2: title。

    另外一个组件为 LessonsList，接受一个名为 lessons 的 props，
    它会使用 Lesson 组件把章节列表渲染出来。
*/



const lessons = [
    { title: 'Lesson 1: title', description: 'Lesson 1: description' },
    { title: 'Lesson 2: title', description: 'Lesson 2: description' },
    { title: 'Lesson 3: title', description: 'Lesson 3: description' },
    { title: 'Lesson 4: title', description: 'Lesson 4: description' }
  ]
  
    class Lesson extends Component {
      handleClick() {
        console.log(this.props.index + ' - ' + this.props.lesson.title)
      }
      render() {
        const {lesson} = this.props
        return (
          <div onClick={this.handleClick.bind(this)}>
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>
          </div>
        )
      }
    }
  
    class App extends Component {
      render() {
        return (
          <div>
            {lessons.map((lesson, i) => 
              <Lesson key={i} index={i} lesson={lesson} />
            )}
          </div>
        )
      }
    }
  