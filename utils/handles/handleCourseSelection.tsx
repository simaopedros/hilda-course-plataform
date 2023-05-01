
//utils\handles\handleCourseSelection.tsx

function handleCourseSelection(index: string) {
    setSelectedCourseIndex(index);
}

function setSelectedCourseIndex(index: string) {
   console.log(index);
}


const handleCourseClick = (courseId: string) => {
    if (handleCourseSelection) {
      handleCourseSelection(courseId);
    }
  };
  
    


export {
    handleCourseSelection,
    setSelectedCourseIndex,
    handleCourseClick
}