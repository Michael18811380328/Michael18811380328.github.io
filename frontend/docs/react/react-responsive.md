# react-responsive

You can use this jsx tag rather media query in css. 

And it make mobile web page more convenient.

~~~bash
# install
npm install react-responsive --save
~~~

basic use

~~~jsx
import MediaQuery from 'react-responsive';

const Example = () => (
  <div>
  	<MediaQuery query="(min-device-width: 1224px)">
  		<span>You are a desktop</span>
  	</MediaQuery>
  	<MediaQuery query="(max-device-width: 1224px)">
  		<span>You are sized a mobile phone though</span>
  	</MediaQuery>
  </div>
);

// 1224 means 1224px
const Example2 = () => (
  <MediaQuery minDeviceWidth={1224}>
  </MediaQuery>
  <MediaQuery maxDeviceWidth={1224}>
  </MediaQuery>
);
~~~

common use case

~~~jsx
import Respnosive from 'react-responsive';

const Desktop = props => (<Responsive {...props} minWidth={992}/>);
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991}/>;
const Mobile = props => <Responsive {...props} maxWidth={767}/>;
const Default = props => <Responsive {...props} minWidth={768}/>;

const Example = () => {
  <div>
    <Desktop></Desktop>
  	<Tablet></Tablet>
  	<Mobile></Mobile>
  	<Default></Default>
  </div>
};

export default Example;
~~~

browser support

Don't support old IE（<9）