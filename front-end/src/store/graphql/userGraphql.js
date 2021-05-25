export const loginQuery = (password, email) => {
  return {
    query: ` 
                   query {
                   userLogin(userInput:{email:"${email}",password:"${password}"}){
                   email,
                   name,
                   token,
                   isEmployer
                   }
      
      }
        `,
  };
};

export const registerQuery = (name, email, password, isEmployer) => {
  return {
    query: `
        
        mutation userRegister($email: String!, $name: String!, $password: String!, $isEmployer: Boolean) {

            userRegister(userInput:{email: $email, name: $name, password: $password, isEmployer: $isEmployer}){
                name,
                email,
                token,
                isEmployer
              }
        }
  
        `,
    variables: {
      email: email,
      name: name,
      password: password,
      isEmployer: isEmployer,
    },
  };
};

export const profileQuery = (
  profile_url,
  gender,
  title,
  ethnicity,
  firstName,
  surname,
  phoneNumber,
  citizeship,
  saId,
  dob,
  relocate,
  currCity,
  disability,
  introduction,
  email
) => {
  return {
    query: `
        
        mutation profilePersonal(
          $profile_url: String,
          $gender: String, 
          $title: String,
          $ethnicity: String, 
          $firstName: String,
          $surname:String,
          $phoneNumber:String,  
          $citizeship:String,
          $saId:String,
          $dob:String,
          $relocate:String,
          $currCity:String,
          $disability: String,
          $introduction: String,
          $email: String
          
          ) {

            profilePersonal(userInput:{
              profile_url: $profile_url
              gender:  $gender,
              title:   $title,
              ethnicity: $ethnicity,
              firstName: $firstName,
              surname:  $surname,
              phoneNumber: $phoneNumber,
              citizeship: $citizeship,
              saId: $saId,
              dob: $dob,
              relocate: $relocate,
              currCity: $currCity,
              disability: $disability,
              introduction: $introduction,
              email: $email
            }){
               message
              }
        }
  
        `,
    variables: {
      profile_url,
      gender,
      title,
      ethnicity,
      firstName,
      surname,
      phoneNumber,
      citizeship,
      saId,
      dob,
      relocate,
      currCity,
      disability,
      introduction,
      email,
    },
  };
};

export const profileFetchQuery = (id) => {
  return {
    query: ` 
                   query {
                   fetchProfile(userId:"${id}") {
    personal {
      gender
      title
      ethnicity
      firstName
      surname
      phoneNumber
      citizeship
      saId
      dob
      relocate
      currCity
      disability
      introduction
      email
      profile_url
      complete
    }

    experience {
    experiences {
      jobTitle,
      companyName,
      startDate,
      endDate,
      current,
      industry,
      jobCategory,
      experienceId,
    }
    complete
    }

     education {
    educations {
      gradyear,
  institution,
  subjects,
  qualification,
  educationId,
    }
    complete
    }
  }
      }
        `,
  };
};

// WORK EXPERIENCE QUERY

export const experienceQuery = (
  jobTitle,
  companyName,
  startDate,
  endDate,
  current,
  industry,
  jobCategory,
  experienceId
) => {
  return {
    query: `
        
        mutation  profileExperiece(
          $jobTitle: String,
          $companyName: String, 
          $startDate: String,
          $endDate: String, 
          $current: Boolean,
          $industry:String,
          $jobCategory:String,  
          $experienceId:String,
        
          
          ) {

             profileExperiece(userInput:{
              jobTitle: $jobTitle,
             companyName:  $companyName,
              startDate:   $startDate,
              endDate: $endDate,
              current: $current,
              industry:  $industry,
              jobCategory: $jobCategory,
              experienceId: $experienceId,
              
            }){
               message
              }
        }
  
        `,
    variables: {
      jobTitle,
      companyName,
      startDate,
      endDate,
      current,
      industry,
      jobCategory,
      experienceId,
    },
  };
};

export const removeExpQuery = (id) => {
  return {
    query: `
    
    mutation  removeExperience($expId:String!) {
         removeExperience(userInput: {expId: $expId}) {
          message
        }
    }
    
    
    `,
    variables: {
      expId: id,
    },
  };
};

export const educationQuery = (
  gradyear,
  institution,
  subjects,
  qualification,
  educationId
) => {
  return {
    query: `
        
        mutation  profileEducation(
          $gradyear: String,
          $institution: String, 
          $subjects: String,
          $qualification: String,
          $educationId:String,
        
          
          ) {

             profileEducation(userInput:{
              gradyear: $gradyear,
             institution:  $institution,
              subjects:   $subjects,
             qualification: $qualification,         
              educationId: $educationId,
              
            }){
               message
              }
        }
  
        `,
    variables: {
      gradyear,
      institution,
      subjects,
      qualification,
      educationId,
    },
  };
};

export const fetchWishListQuery = () => {
  return {
    query: `
   query { 
       wishList {
                    title,
                    jobId,
                    createdAt,
                    image_url,
                    location,
                    company,
                    description
                }
            }       
 `,
  };
};
