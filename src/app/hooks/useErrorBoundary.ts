import { useState, useEffect } from 'react';

function useErrorBoundary(): boolean {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const errorHandler: EventListener = (event: Event | ErrorEvent): void => {
      setHasError(true);
      console.error(event);
    };
    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return hasError;
}

export default useErrorBoundary;

