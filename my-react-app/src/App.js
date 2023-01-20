import './App.css';
import {useEffect, useState, memo, createContext, useContext, useRef} from 'react';

const MyContext = createContext(100);

function Blah() {
  console.log('render Blah');
  useEffect(() => {
    console.log('blah');
  });

  const test = useContext(MyContext);

  return <div>blah: {test}</div>;
}
const BlahMemo = memo(Blah);

function BlahParent({children}) {
  console.log('render BlahParent');
  useEffect(() => {
    console.log('blah parent');
  })

  return <Blah />;
}
const BlahParentMemo = memo(BlahParent);

function Focusable({domRef, onFocus}) {
  console.log('render Focusable');
  return <button ref={domRef} onFocus={onFocus}>hello</button>;
}

function App() {
  console.log('render App');
  const [we, setWe] = useState(1);
  const focusableRef = useRef(null);
  const [contextValue, setContextValue] = useState(200);

  useEffect(() => {
    console.log('useEffect setTimeout setWe');
    const id = setTimeout(() => {
      setWe(2);
    }, 2000);

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    console.log('useEffect setTimeout focus');
    const id = setTimeout(() => {
      focusableRef.current?.focus();
    }, 3000);

    return () => clearTimeout(id);
  }, []);

  return (
    <MyContext.Provider value={contextValue}>
      <div>
        hi
      </div>
      <div>
        {we}
      </div>
      <div>
        <Focusable domRef={focusableRef} onFocus={() => {
          console.log(`contextValue: ${contextValue}`);
          console.log(`setContextValue(${contextValue + 1})`);
          setContextValue(oldContextValue => oldContextValue + 1);
        }} />
      </div>
      <div>
        {/* <BlahMemo /> */}
        {/* <Blah /> */}
        <BlahParentMemo />
      </div>
    </MyContext.Provider>
  );
}

export default App;
