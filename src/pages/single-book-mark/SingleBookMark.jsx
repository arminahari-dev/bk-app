import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import Skeleton from "../../components/skeleton/Skeleton.jsx";
import {useBookMarkContext} from "../../providers/bookmark-context/BookMarkContext.jsx";
import BookMarkCard from "../../components/book-mark-card/BookMarkCard.jsx";

export default function SingleBookMark() {

    //const { id } = useParams();

    const [searchParams] = useSearchParams();
    let id =searchParams.get("id");

    const {getSingleBookMark,singleBookMark,isLoadingSingleBookMark} = useBookMarkContext()

    useEffect(()=>{
        getSingleBookMark(id)
    },[id])

    console.log(singleBookMark)

    return(
        <>
            {isLoadingSingleBookMark ? <Skeleton count={singleBookMark.length}/>:singleBookMark.map(bookmark => (<BookMarkCard bmark={bookmark} key={bookmark.id}/>))}
        </>
    )
}
