import React from 'react';

export default function FiltersOption({ type, typeNum, setTypeNum }) {
    return (
        <div
            className={`flex flex-row items-center justify-between`}>
            <span>{type}</span>
            <div className={"flex items-center justify-center"}>
                {typeNum > 0 ? (
                    <button onClick={() => setTypeNum(typeNum - 1)}
                            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg border_style">
                        -
                    </button>
                ) : (
                    <button
                        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg border_style disabled cursor-not-allowed opacity-[50%]">
                        -
                    </button>
                )}
                &nbsp;
                {typeNum}
                &nbsp;
                <button onClick={() => setTypeNum(typeNum + 1)}
                        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg border_style">
                    +
                </button>
            </div>
        </div>
    )
}
