// src/utils/formConfig.js

export const roleOptions = [
  { value: 'candidate', label: 'Candidate' },
  { value: 'college', label: 'College' },
  { value: 'company', label: 'Company' },
  { value: 'consultancy', label: 'Consultancy' },
  { value: 'admin', label: 'Admin' }
];

export const commonFields = [
  { name: 'role', label: 'Role / Module', type: 'select', required: true, options: roleOptions },
  { name: 'fullName', label: 'Full Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
  { name: 'username', label: 'Username', type: 'text', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
  { name: 'address', label: 'Address', type: 'textarea', required: true },
  { name: 'city', label: 'City', type: 'text', required: true },
  { name: 'state', label: 'State', type: 'text', required: true },
  { name: 'pincode', label: 'Pincode', type: 'number', required: true },
  { name: 'profilePhoto', label: 'Profile Photo', type: 'file', required: false },
  { name: 'agreeTerms', label: 'I agree to Terms & Conditions', type: 'checkbox', required: true }
];

export const roleSpecificFields = {
  candidate: [
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
    { name: 'gender', label: 'Gender', type: 'radio', required: true, options: ['Male', 'Female', 'Other'] },
    { name: 'qualification', label: 'Qualification', type: 'select', required: true, options: ['10th', '12th', 'Diploma', 'UG', 'PG', 'PhD'] },
    { name: 'collegeName', label: 'College Name', type: 'text', required: true },
    { name: 'skills', label: 'Skills', type: 'multiselect', required: true, options: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL'] },
    { name: 'experience', label: 'Experience', type: 'select', required: true, options: ['Fresher', '1-2 years', '2-5 years', '5+ years'] },
    { name: 'resume', label: 'Resume Upload', type: 'file', required: true },
    { name: 'preferredJobRole', label: 'Preferred Job Role', type: 'text', required: false },
    { name: 'preferredLocation', label: 'Preferred Location', type: 'text', required: false }
  ],
  college: [
    { name: 'collegeName', label: 'College Name', type: 'text', required: true },
    { name: 'collegeCode', label: 'College Code', type: 'text', required: true },
    { name: 'affiliationUniversity', label: 'Affiliation University', type: 'text', required: true },
    { name: 'naacGrade', label: 'NAAC Grade', type: 'select', required: false, options: ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C'] },
    { name: 'coursesOffered', label: 'Courses Offered', type: 'multiselect', required: true, options: ['Engineering', 'Medicine', 'Commerce', 'Arts', 'Science'] },
    { name: 'placementOfficerName', label: 'Placement Officer Name', type: 'text', required: true },
    { name: 'collegeEmail', label: 'College Email', type: 'email', required: true },
    { name: 'collegePhone', label: 'College Phone', type: 'tel', required: true },
    { name: 'website', label: 'Website', type: 'url', required: false }
  ],
  company: [
    { name: 'companyName', label: 'Company Name', type: 'text', required: true },
    { name: 'companyRegNo', label: 'Company Registration No', type: 'text', required: true },
    { name: 'industryType', label: 'Industry Type', type: 'select', required: true, options: ['IT', 'Manufacturing', 'Healthcare', 'Finance', 'Retail', 'Other'] },
    { name: 'companySize', label: 'Company Size', type: 'select', required: true, options: ['1-10', '11-50', '51-200', '201-500', '500+'] },
    { name: 'hrName', label: 'HR Name', type: 'text', required: true },
    { name: 'hrEmail', label: 'HR Email', type: 'email', required: true },
    { name: 'hrPhone', label: 'HR Phone', type: 'tel', required: true },
    { name: 'companyWebsite', label: 'Company Website', type: 'url', required: false },
    { name: 'companyAddress', label: 'Company Address', type: 'textarea', required: true }
  ],
  consultancy: [
    { name: 'consultancyName', label: 'Consultancy Name', type: 'text', required: true },
    { name: 'licenseNo', label: 'License No', type: 'text', required: true },
    { name: 'servicesOffered', label: 'Services Offered', type: 'multiselect', required: true, options: ['Recruitment', 'Training', 'Consulting', 'Career Counseling'] },
    { name: 'contactPersonName', label: 'Contact Person Name', type: 'text', required: true },
    { name: 'contactEmail', label: 'Contact Email', type: 'email', required: true },
    { name: 'contactPhone', label: 'Contact Phone', type: 'tel', required: true },
    { name: 'website', label: 'Website', type: 'url', required: false },
    { name: 'officeAddress', label: 'Office Address', type: 'textarea', required: true }
  ],
  admin: [
    { name: 'adminId', label: 'Admin ID', type: 'text', required: true },
    { name: 'department', label: 'Department', type: 'select', required: true, options: ['Operations', 'HR', 'IT', 'Management'] },
    { name: 'accessLevel', label: 'Admin Access Level', type: 'select', required: true, options: ['Super Admin', 'Manager', 'Staff'] }
  ]
};