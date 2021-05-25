export const jobQuery = (jobData) => {
  return {
    query: `
       
       mutation  createJob(       $title:String!,
                                    $company: String!,
                                    $image_url:String
                                    $location: String!,
                                    $salary: Int!,
                                    $job_type: String!,
                                    $company_details: String!,
                                    $job_description: String!,
                                    $qualification: String!,
                                    $requirements: String!,
                                    $benefical: String!,
                                    $sectors: String!,
  
       ) {

        createJob(jobInput:{   title:$title,
                                company:$company,
                                image_url:$image_url
                                location:$location,
                                salary:$salary,
                                job_type:$job_type,
                                company_details:$company_details,
                                job_description:$job_description,
                                qualification:$qualification,
                                requirements:$requirements,
                                benefical:$benefical,
                                sectors:$sectors
          
        }) {
       message
        }
       }
       
       
       `,
    variables: {
      title: jobData.title,
      company: jobData.company,
      image_url: jobData.image_url,
      location: jobData.location,
      salary: jobData.salary,
      job_type: jobData.job_type,
      company_details: jobData.company_details,
      job_description: jobData.job_description,
      qualification: jobData.qualification,
      requirements: jobData.requirements,
      benefical: jobData.benefical,
      sectors: jobData.sectors,
    },
  };
};

export const fetchPostGql = (page) => {
  return {
    query: `
    
    query post($page:Int!) { posts(postInput:{page:$page}) {
      
     employerPosts {title,sectors,createdAt,_id,applicants}
        totalJobs
    }
  }
    
    `,
    variables: {
      page: page,
    },
  };
};

export const deleteJob = (id) => {
  return {
    query: `
    
    mutation postDelete($postId:ID!) {
        postDelete(posterInput: {postId: $postId}) {
          message
        }
    }
    
    
    `,
    variables: {
      postId: id,
    },
  };
};

export const fetchAllJobsGql = (page) => {
  return {
    query: `
    
    query  allJobsFetch($page:Int!) { allJobsFetch(pagenumber:{page:$page}) {
      
     jobPost {title,createdAt,jobId, image_url, location,company,description}
      jobsTotal
    }
  }
    
    `,
    variables: {
      page: page,
    },
  };
};

export const fetchSingleJobGql = (id) => {
  return {
    query: `
    
    query  fetchSingleJob($postId:ID!) {
        fetchSingleJob(jobId: {postId: $postId}) {
          job {
        title
    company
   image_url
    location
    salary
    job_type
    company_details
    job_description
    qualification
    requirements
    benefical
    sectors
     createdAt
    } 
    
     similarJobs {
     jobId
    title
    image_url 
    company
    location
    createdAt
  
  }

        }
    }
    
    
    `,
    variables: {
      postId: id,
    },
  };
};
