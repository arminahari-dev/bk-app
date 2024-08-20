import React from 'react';

export default function FiltersOption({ type, typeNum, setTypeNum ,typeBull,setTypeBool }) {
    return (
        type === "bedroom" || type === "bathroom" ||  type === "bed" ? (
            <div
                className={`flex flex-row items-center ${type === "bed" ? "gap-[9.40rem]" : ""} ${type === "bedroom" ? "gap-[7.2rem]" : ""} ${type === "bathroom" ? "gap-[7rem]" : ""}`}>
                <span>{type}</span>
                <div>
                    {typeNum > 1 ? (
                        <button onClick={() => setTypeNum(typeNum - 1)} className="btn mobile-s:btn-sm mobile-m:btn-sm mobile:btn-sm tablet:btn-md laptop:btn-lg desktop:btn-lg desktop-large::btn-lg border_style">
                            -
                        </button>
                    ) : (
                        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg border_style disabled cursor-not-allowed opacity-[50%]">
                            -
                        </button>
                    )}
                    &nbsp;
                    {typeNum}
                    &nbsp;
                    <button onClick={() => setTypeNum(typeNum + 1)} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg border_style">
                        +
                    </button>
                </div>
            </div>
        ) : (
            <div className={"flex flex-row items-center gap-[13rem]"}>
                <div>
                    <span className="label-text">{type}</span>
                </div>
                <label className="label cursor-pointer">
                    <input onClick={()=>{setTypeBool(!typeBull)}} type="checkbox" className="toggle"/>
                </label>
            </div>
        )
    );
}
