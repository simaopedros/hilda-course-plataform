const getCourseIdFromURL = () => {
    if (typeof window !== 'undefined') {
      const pathArray = window.location.pathname.split('/');
      const courseIndex = pathArray.indexOf('courses');
      if (courseIndex !== -1 && pathArray.length > courseIndex + 1) {
        return pathArray[courseIndex + 1];
      }
    }
    return null;
  };



  export default getCourseIdFromURL;