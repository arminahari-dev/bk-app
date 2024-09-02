import toast from 'react-hot-toast';
import Skeleton from "../../components/skeleton/Skeleton.jsx";
import {useBookMarkContext} from "../../providers/bookmark-context/BookMarkContext.jsx";
import BookMarkCard from "../../components/book-mark-card/BookMarkCard.jsx";

export default function AllBookMarkPage() {

    const {allBookMarks,loading,error,singleBookMark} = useBookMarkContext();

    if (error) toast.error(error.message);

    return (
        <div className={`all-book-marks bg-base-300 h-[80%]`}>
            <div className={"flex justify-center text-lg"}>
                {
                    allBookMarks.length < 1 ? <h1>no bookmarks to show</h1> : <h1>All bookmarks</h1>
                }

            </div>
            <div
                className={`grid desktop-large:grid-cols-4 desktop:grid-cols-3 laptop:grid-cols-2 tablet:grid-cols-1 justify-items-center gap-y-8`}>
                {
                    loading ? <Skeleton count={allBookMarks.length}/> : allBookMarks.map((bookmark) => {

                        const isLast = bookmark.id === singleBookMark[0]?.id

                        return (
                            <BookMarkCard
                                bmark={bookmark}
                                key={bookmark.id}
                                isLast={isLast}
                            />
                        );
                    })
                }
            </div>
        </div>
    )
}

