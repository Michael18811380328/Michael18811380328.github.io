## React-Hooks

hook: 在class外部使用 state 等属性。在 React v16.7.0 使用。

useState is a hook. It contains to parameters. The first is a viriate and the second is a control function. useState is like this.setState. 异步赋值

~~~jsx
import { useState } from 'react';

function Example() {
  // Declare a new state variable, which we will call 'count'.
  const [count, setCount] = useState(0);
  // the initial state is 0;
  // useState is simalar with this.setState
  
  return (
    <div>
    	<p>{count}</p>
    	<button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
~~~

目前项目中没有使用这部分功能，所以后续使用的时候再加强。
