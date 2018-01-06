/*****************************************************************/

为了防止别人往组件传一个不符合要求的数据类型，导致BUG。
React.js 提供了一种机制：
可以给组件的配置参数加上类型验证。

只要传的值不符合要求..那么报错提醒.

安装 React.js 提供的第三方库： `prop-types`

`npm install --save prop-types`

/*****************************************************************/

import React, { Component } from 'react'
import PropTypes from 'prop-types'   //引入

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object        //要求接受值类型为对象
  }

  render () {
    const { comment } = this.props
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment.username} </span>：
        </div>
        <p>{comment.content}</p>
      </div>
    )
  }
}

/*****************************************************************/

propTypes 帮忙指定了参数类型，但是并没有说这个参数一定要传入，
事实上，这些参数默认都是可选的。可选参数可以通过配置 defaultProps，
让它在不传入的时候有默认值。但是我们这里并没有配置 defaultProps，
所以如果直接用 <Comment /> 而不传入任何参数的话，
comment 就会是 undefined，comment.username 会导致程序报错

所以：对应的方法除了使用 `defaultProps`，
还有: 加上 `isRequired`, 要求必须传入参数.否则报错
static propTypes = {
  commit : PropTypes.boject.isRequired
}

React.js 提供的PropTypes 提供一系列的数据类型可以用来配置组件的参数：
```
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.node
PropTypes.element
```

组件参数验证在构建大型的组件库的时候相当有用，可以帮助迅速定位这种类型错误，
让组件开发更加规范。另外也起到了一个说明文档的作用，如果项目都约定都写 propTypes ，
那在使用别人写的组件的时候，只要看到组件的 propTypes 就清晰地知道这个组件到底能够接受什么参数，
什么参数是可选的，什么参数是必选的。

/*****************************************************************/

总结：
通过 PropTypes 给组件的参数做类型限制，可以在帮助迅速定位错误，
这在构建大型应用程序的时候特别有用；
另外，给组件加上 propTypes，也让组件的开发、使用更加规范清晰。

这里建议写组件的时候尽量都写 propTypes，有时候有点麻烦，但是是[值得]的。

/*****************************************************************/
