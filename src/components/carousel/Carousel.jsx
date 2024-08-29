import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const Carousel = ({ xl_picture_url }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);

    function updateButtonStates(){
        currentIndex === 0 ? setDisablePrev(true) : setDisablePrev(false)
        currentIndex === xl_picture_url.length - 1 ? setDisableNext(true) : setDisableNext(false)
    }

    useEffect(() => {
        updateButtonStates();
    }, [currentIndex]);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? xl_picture_url.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === xl_picture_url.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative h-64 overflow-hidden rounded-lg">
                <img
                    src={xl_picture_url[currentIndex]}
                    alt="carousel"
                    className="w-full h-full object-cover"
                />
                {xl_picture_url.length > 1 && (
                    <div className="absolute bottom-0 w-full flex justify-center py-2 z-10">
                        {xl_picture_url.map((_, index) => (
                            <div
                                key={index}
                                className={`mx-1 text-3xl cursor-pointer ${
                                    index === currentIndex ? "text-black" : "text-[#ffffff]"
                                }`}
                                onClick={() => goToSlide(index)}
                            >
                                &bull;
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {
                !disablePrev ? <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 text-white cursor-pointer rounded-full text-3xl"
                onClick={disablePrev ? null : goToPrevious}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>:null
            }

            {
                !disableNext ? <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 text-white cursor-pointer rounded-full text-3xl"
                onClick={disableNext ? null : goToNext}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>:null
            }

        </div>
    )
};

export default Carousel;
