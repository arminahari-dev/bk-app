import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import Skeleton from "../../components/skeleton/Skeleton.jsx";
import {useBookMarkContext} from "../../providers/bookmark-context/BookMarkContext.jsx";
import BookMarkCard from "../../components/book-mark-card/BookMarkCard.jsx";

export default function SingleBookMark() {

    let [searchParams] = useSearchParams();

    const {getSingleBookMark,singleBookMark,isLoadingSingleBookMark} = useBookMarkContext()

    const id =searchParams.get("id");

    useEffect(()=>{
        getSingleBookMark(id)
    },[id])

    return(
        <>
            {isLoadingSingleBookMark ? <Skeleton count={singleBookMark.length}/>:singleBookMark.map(bookmark => (<BookMarkCard bmark={bookmark} key={bookmark.id}/>))}
        </>
    )
}
