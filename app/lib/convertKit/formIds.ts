interface ICKFormIds {
  miniCourse: {
    signUp: string,
    homepage: string,
    getNotified: string
  },
  resourceLibrary:{
    footer: string,
    // aboutPage: string,
    // blogWidget: string,
    // freebieWidget: string,
    landingPage: string,
    sellPage: string,
    // sidebar: string
  },
  styleStudies:{
    // signUp: {
    //   print: string,
    //   procreate: string
    // }
  }
}

// TOOD: CHECK CONVERTKIT FLOWS / FORMS
export const ckFormIds: ICKFormIds = {
  miniCourse: {
    signUp: '2853459',
    homepage: '1034740',
    getNotified: '1096984' //form Name in CK: LFM_GetNotified
  },
  resourceLibrary:{
    footer: '2855591', //form Name in CK: MakersSignUp: Footer
    // aboutPage: '969013',
    // blogWidget: '969014',
    // freebieWidget: '969015',
    landingPage: '3512068', //form Name in CK: MakersSignUp: HomePage Header
    sellPage: '2850591', //form Name in CK: MakersSignUp: LandingPage
    // sidebar: '969012'
  },
  styleStudies:{
    // signUp:{
    //   print: '1083902',
    //   procreate: '1083920'
    // }
  }
}
