import React, { useEffect, useRef } from 'react'

interface Props { }

function usePrevious(value: string | number | boolean) {
  const ref = useRef<string | number | boolean | null>();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}
export default usePrevious;
