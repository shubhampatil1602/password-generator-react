import { useState, useCallback, useEffect, useRef } from 'react';

const Password = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [copy, setCopy] = useState('Copy');

  const passwordGenerator = useCallback(() => {
    let password = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()/|?[]{}=_~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }
    setPassword(password);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopy('Copied!');
  }, [password]);

  useEffect(() => {
    passwordGenerator();
    setCopy('Copy');
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='bg-[#192734] text-white h-screen pt-20'>
      <div className='w-full max-w-lg md:max-w-2xl mx-auto shadow-md rounded-lg px-9 text-orange-500 bg-gray-700'>
        <h1 className='text-4xl text-center font-bold p-9'>
          Password Generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-3 px-4 mt-3 rounded-tl-xl rounded-bl-xl'
            placeholder='Your Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-orange-500 text-white py-3 px-6  mt-3 rounded-tr-xl rounded-br-xl'
          >
            {copy}
          </button>
        </div>
        <div className='block md:flex md:items-center md:gap-x-4 py-6'>
          <div className='flex items-center gap-x-2'>
            <input
              type='range'
              min={8}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
