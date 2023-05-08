import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Course from "@/types/Course";

import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import CourseCard from "../course/CourseCard";

interface EnrolledCoursesSliderProsp {
  enrolledCourses: Course[];
}

const EnrolledCoursesSlider: React.FC<EnrolledCoursesSliderProsp> = ({
  enrolledCourses,
}) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (enrolledCourses.length <= 4) {
    return (
      <div className="flex flex-wrap">
        {enrolledCourses.map((course, index) => (
          <div key={course.id} className="px-2 mb-6 mt-6 w-full md:w-1/2 lg:w-1/4">
            <CourseCard course={course as unknown as Course} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <Slider {...sliderSettings} className="mb-8">
        {enrolledCourses.map((course, index) => (
          <div key={course.id} className="px-2 mb-6 mt-6">
            <CourseCard course={course as unknown as Course} />
          </div>
        ))}
      </Slider>
    );
  }
};

export default EnrolledCoursesSlider;
