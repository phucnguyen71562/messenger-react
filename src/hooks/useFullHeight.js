import { useEffect, useState } from 'react';

function measureHeight() {
  return document.documentElement?.clientHeight || window.innerHeight;
}

function useFullHeight() {
  const [height, setHeight] = useState(measureHeight);

  useEffect(() => {
    function setMeasuredHeight() {
      const measuredHeight = measureHeight();
      setHeight(measuredHeight);
    }

    window.addEventListener('resize', setMeasuredHeight);

    return () => window.removeEventListener('resize', setMeasuredHeight);
  }, []);

  return height;
}

export default useFullHeight;
