import { useEffect } from "react";
import useMove from "./useMove";

type AuthOption = true | false | null;

export default function useAuth(option : AuthOption) {
    const { moveToPage } = useMove()

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')

        if(option === null) return

        if(option === false) {
            if(accessToken) {
                alert('로그인 한 유저는 접속할 수 없습니다.')
                moveToPage('/todo')
            }
        }

        if(option === true) {
            if(!accessToken) {
                alert('로그인 해주세요.')
                moveToPage('/signin')
            }
        }
    }, [])
}