export default function Skeleton({ count }) {
    return (
        <>
            {Array.from({ length: count }).map(() => (
                <>
                    <div className="skeleton bg-[#2e313e] p-4 rounded shadow-md mb-4 w-[27rem] h-[27rem]"></div>
                </>
            ))}
        </>
    );
}