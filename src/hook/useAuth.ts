import { useEffect, useState } from 'react';
import useMove from './useMove';

export default function useAuth(accessToken: string | null) {
  const { moveToPage } = useMove();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const moveToLogin = () => moveToPage('/signin');

  const moveToTodo = () => moveToPage('/todo');

  const set = async () => {
    setIsLoading(true);

    await new Promise((res, rej) => {
      if (accessToken) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      res('');
    });

    setIsLoading(false);
  };

  useEffect(() => {
    set();
  }, []);

  return {
    isLogin,
    moveToLogin,
    moveToTodo,
    isLoading,
  };
}
