


const getLessonIdFromURL = () => {
    if (typeof window !== 'undefined') {
      const pathArray = window.location.pathname.split('/');
      const lessonIndex = pathArray.indexOf('lessons');
      if (lessonIndex !== -1 && pathArray.length > lessonIndex + 1) {
        return pathArray[lessonIndex + 1];
      }
    }
    return null;
  };



  export default getLessonIdFromURL;