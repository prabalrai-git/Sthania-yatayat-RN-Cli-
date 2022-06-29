export const generateUrlEncodedData = (initialObject) => {
    const formData = Object.keys(initialObject)
      .map((key) => {
        // if (initialObject[key]) {
          return `${key}=${encodeURIComponent(initialObject[key])}`
        // }else{
        //     return ''
        // }
      })
      .join('&');
    return formData;
  }