import { useNavigate } from "react-router-dom";

export default function useMove() {
    const navigate = useNavigate()

    const moveToPage = (url : string) => {
        navigate(url)
    }

    const moveToPrevPage = () => {
        navigate(-1)
    }

    return {
        moveToPage,
        moveToPrevPage
    }
}