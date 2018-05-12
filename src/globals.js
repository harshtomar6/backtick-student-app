
export const tintColor = '#0960BD'
export const BASE_URL = 'https://backtick-api.herokuapp.com'

export const getImageURI = photoURI => {
  let url='';
  if(photoURI){
    if(photoURI.includes('graph.facebook.com')){
      url = `${photoURI}?width=200`
    }
    else{
      url = `https://ce8d52bcc.cloudimg.io/width/1000/x/${photoURI}`
    }
  }

  return url;
}