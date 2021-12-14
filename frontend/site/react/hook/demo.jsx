import React, { useState, useEffect, useMemo, useRef }from 'react';
import PortalWrapper from './src/PortalWrapper';

function App() {
  const divRef = React.useRef();
  const outerRef = React.useRef();

  React.useEffect(() => {
    console.log(divRef.current);
  }, []);

  return (
    <>
      <PortalWrapper visible getContainer={() => outerRef.current}>
        {() => <div ref={divRef}>innerDiv</div>}
      </PortalWrapper>
      <div ref={outerRef}>outerDiv</div>
    </>
  );
};

function App2(props) {
  const [count, setCount] = useState(0);
  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);
  const outerRef = useRef();
  useEffect(() => {
    console.log(count);
    console.log(outerRef.current);
  }, [count]);
  return (
    <button
      ref={outerRef}
      onClick={() => {setCount(count + 1)}}
    />
  );
}

function App3(props) {
  const [count, setCount] = useState(0);
  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);
  const timerID = useRef();
  const couterRef = useRef();
  useEffect(() => {
    timerID.current = setInterval(() => {
      setCount(count => count++);
    }, 1000);
  }, []);
  useEffect(() => {
    if (count > 10) {
      clearInterval(timerID.current);
    }
  });
  return (
    <button
      ref={counterRef}
      onClick={() => { setCount(count + 1) }}
    />
  );
}

export { App, App2, App3 };
