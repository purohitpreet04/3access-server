export const rslData = [
    { key: 'fname', label: 'First Name' },
    { key: 'lname', label: 'Last Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'rslname', label: 'Company Name' },
    { key: 'rslAddress', label: 'Address' },
    { key: 'rsLArea', label: 'Area' },
    { key: 'rslCity', label: 'City' },
    { key: 'rslpincode', label: 'Pincode' },
    { key: 'phonenumber', label: 'Phone Number' },
    { key: 'website', label: 'Website' },
    { key: 'role', label: 'Role' },
    { key: 'emailto', label: 'Email To' },
    { key: 'emailcc', label: 'Email CC' },
    { key: 'addedBy', label: 'Added By' },
    { key: 'maname', label: 'Management Agent Name' },
    

];


export const riskCategories = [
    { label: "Violence / Aggression", name: "violenceAggression" },
    { label: "Known associates", name: "knownAssociates" }, // New
    { label: "Hazards from others (friend/family/visitors)", name: "hazardsFromOthers" }, // New
    { label: "Recent discontinuation of medication", name: "medicationDiscontinuation" }, // New
    { label: "Professional boundaries", name: "professionalBoundaries" },
    { label: "Finance / Gambling / Debt", name: "financeGamblingDebt" },
    { label: "Attempted suicide", name: "attemptedSuicide" }, // New
    { label: "Arson", name: "arson" },
    { label: "Violent ideas/acts", name: "violentIdeasActs" }, // New
    { label: "Substance abuse/alcohol misuse", name: "substanceAbuse" },
    { label: "Harm to self, others or from others/injurious behaviour", name: "harmToSelfOthers" }, // New
    { label: "Criminal/police or court involvement", name: "criminalInvolvement" }, // New
    { label: "Offending behaviour", name: "offendingBehaviour" },
    { label: "Anti-social behaviour", name: "antiSocialBehaviour" },
    { label: "Physical Health", name: "physicalHealth" },
    { label: "Mental Health", name: "mentalHealth" },
    { label: "Sex Offences", name: "sexOffences" }, // New
    { label: "Domestic Abuse", name: "domesticAbuse" }, // New
    { label: "Extreme anger and hostility", name: "extremeanger" }, // New
];

// rslname: data?.property.rslTypeGroup.companyname,
// rslAddress:data?.property.rslTypeGroup.address,
// rsLArea:data?.property.rslTypeGroup.area,
// rslCity:data?.property.rslTypeGroup.city,
// pro_address:data?.property.address,
// pro_city:data?.property.city,
// pro_area:data?.property.area,
// pro_eligibleRent:data?.property.eligibleRent,
// pro_postCode:data?.property.postCode,
// pro_serviceCharges:data?.property?.serviceCharges,

export const propertyFormFields = [
    { key: 'pro_city', label: 'City' },
    { key: 'pro_address', label: 'Address' },
    { key: 'pro_eligibleRent', label: 'Eligible Rent' },
    { key: 'pro_postCode', label: 'Post Code' },
    { key: 'pro_serviceCharges', label: 'Service Charges' },
    { key: 'pro_area', label: 'Area' },
    { key: 'ineligibleCharge', label: 'Weekly Ineligible Charge' },
    { key: 'pro_bedrooms', label: 'Number of Bedrooms' },
    { key: 'two_weeksserviceCharge', label: '2 weeks Service Charges' },
    { key: 'basicRent', label: 'Basic Rent' },
    // { key: 'visibleTo', label: 'Visible To' },
    // { key: 'addedBy', label: 'Added By' },
    // { key: 'addedByModel', label: 'Added By Model' },
    // { key: 'councilTaxPayer', label: 'Council Tax Payer' },
    // { key: 'rslTypeGroup', label: 'RSL Type Group' },
    // { key: 'basicRent', label: 'Basic Rent' },
    // { key: 'sharedWithOther', label: 'Shared With Other' },
    // { key: 'otherInformation', label: 'Other Information' },
    // { key: 'bedist', label: 'Bedist' },
    // { key: 'selfContainedFlat', label: 'Self Contained Flat' },
    // { key: 'quantityOfFloors', label: 'Quantity of Floors' },
    // { key: 'unfurnished', label: 'Unfurnished' },
    // { key: 'partFurnished', label: 'Part Furnished' },
    // { key: 'fullyFurnished', label: 'Fully Furnished' },
    // { key: 'centralHeating', label: 'Central Heating' },
    // { key: 'garden', label: 'Garden' },
    // { key: 'garageParkingSpace', label: 'Garage Parking Space' },
    // { key: 'accommodationLocation', label: 'Accommodation Location' },
    // { key: 'accommodationFloor', label: 'Accommodation Floor' },
    // { key: 'totalLivingRooms', label: 'Total Living Rooms' },
    // { key: 'totalBedsitRooms', label: 'Total Bedsit Rooms' },
    // { key: 'totalBedrooms', label: 'Total Bedrooms' },
    // { key: 'totalBathrooms', label: 'Total Bathrooms' },
    // { key: 'totalToilets', label: 'Total Toilets' },
    // { key: 'totalKitchens', label: 'Total Kitchens' },
    // { key: 'totalOtherRooms', label: 'Total Other Rooms' },
    // { key: 'tenants', label: 'Tenants' },
    // { key: 'status', label: 'Status' }
];

export const tenatsignImageArray = [
    { key: "supportCheckList", label: "Support Checklist" },
    { key: "licenseToOccupy", label: "License to Occupy" },
    { key: "weeklyServiceCharge", label: "Weekly Service Charge" },
    { key: "missingPersonForm", label: "Missing Person Form" },
    { key: "tenantIdConsentForm", label: "Tenant ID Consent Form" },
    { key: "personalDetails", label: "Personal Details" },
    { key: "licenseChargePayments", label: "License Charge Payments" },
    { key: "supportAgreement", label: "Support Agreement" },
    { key: "fireEvacuationProcedure", label: "Fire Evacuation Procedure" },
    { key: "complaintsProcedureDeclaration", label: "Complaints Procedure Declaration" },
    { key: "confidentialityWaiverForm", label: "Confidentiality Waiver Form" },
    { key: "niIncomeForm", label: "NI Income Form" },
    { key: "authorizationForm", label: "Authorization Form" },
    { key: "supportServices", label: "Support Services" },
    { key: "supportmansign", label: "Support Man Sign" },
    { key: "supportWorkerSignature", label: "Support Worker Signature" },
    { key: "tenantSignature", label: "Tenant Signature" },
    { key: "staffSignature", label: "Staff Signature" },

];


export const tenantields = [
    { key: 'hasGPInfo', label: 'Has GP Info' },
    { key: 'homelessHostelSupport', label: 'Homeless Hostel Support' },
    { key: 'affordProperty', label: 'Afford Property' },
    { key: 'relevantCircumstances', label: 'Relevant Circumstances' },
    { key: 'bereavement', label: 'Bereavement' },
    { key: 'isYouorptnrIstd', label: 'Is You or Partner in Supported Housing' },
    { key: 'incapableofwork', label: 'Incapable of Work' },
    { key: 'isBlind', label: 'Is Blind' },
    { key: 'ispreblind', label: 'Is Pre-Blind' },
    { key: 'CarerAllowance', label: 'Carer Allowance' },
    { key: 'needOvernightcare', label: 'Need Overnight Care' },
    { key: 'grantpaymentsforvehicle', label: 'Grant Payments for Vehicle' },
    { key: 'vehicles', label: 'Vehicles' },
    { key: 'isdistinguishingMarks', label: 'Is Distinguishing Marks' },
    { key: 'isfostercarer', label: 'Is Foster Carer' },
    { key: 'isabsentathome', label: 'Is Absent at Home' },
    { key: 'hasClaimed', label: 'Has Claimed' },
    { key: 'incomeChange', label: 'Income Change' },
    { key: 'unearnedIncomeChange', label: 'Unearned Income Change' },
    { key: 'capitalChange', label: 'Capital Change' },
    { key: 'expensesChange', label: 'Expenses Change' },
    { key: 'moveInLast12Months', label: 'Move In Last 12 Months' },
    { key: 'ispartnerlivingwithyou', label: 'Is Partner Living With You' },
    { key: 'visitedUk', label: 'Visited UK' },
    { key: 'isemployerDetails', label: 'Employer Details' },
    { key: 'signuptype', label: 'Sign-up Type' },
    { key: 'nillIncome', label: 'No Income' },
    { key: 'hasNextOfKin', label: 'Has Next of Kin' },
    { key: 'afford_rent', label: 'Afford Rent' },
    { key: 'exoffender', label: 'Ex Offender' },
    { key: 'terms', label: 'Terms' },
    { key: 'property', label: 'Property' },
    { key: 'room', label: 'Room' },
    { key: 'signInDate', label: 'Sign In Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'title_before_name', label: 'Title Before Name' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'middleName', label: 'Middle Name' },
    { key: 'tenantContactNumber', label: 'Tenant Contact Number' },
    { key: 'tenantEmail', label: 'Tenant Email' },
    { key: 'nationalInsuranceNumber', label: 'National Insurance Number' },
    { key: 'gender', label: 'Gender' },
    { key: 'build', label: 'Build' },
    { key: 'claimReferenceNumber', label: 'Claim Reference Number' },
    { key: 'maritalstatus', label: 'Marital Status' },
    { key: 'height', label: 'Height' },
    { key: 'shoeSize', label: 'Shoe Size' },
    { key: 'clothingSize', label: 'Clothing Size' },
    { key: 'eyeColor', label: 'Eye Color' },
    { key: 'skinTone', label: 'Skin Tone' },
    { key: 'hairColor', label: 'Hair Color' },
    { key: 'dateOfBirth', label: 'Date of Birth' },
    { key: 'placeOfBirth', label: 'Place of Birth' },
    { key: 'reasonforhomelessness', label: 'Reason for Homelessness' },
    { key: 'vehiclesdetails', label: 'Vehicle Details' },
    { key: 'distinguishingMarks', label: 'Distinguishing Marks' },
    { key: 'employerDetails', label: 'Employer Details' },
    { key: 'address', label: 'Address' },
    { key: 'pincode', label: 'Pincode' },
    { key: 'city', label: 'City' },
    { key: 'tenancy_type', label: 'Tenancy Type' },
    { key: 'ukvisitedDate', label: 'UK Visited Date' },
    { key: 'partner_title_before_name', label: 'Partner Title Before Name' },
    { key: 'partner_firstName', label: 'Partner First Name' },
    { key: 'partner_lastName', label: 'Partner Last Name' },
    { key: 'partner_middleName', label: 'Partner Middle Name' },
    { key: 'partner_nationalInsuranceNumber', label: 'Partner National Insurance Number' },
    { key: 'partner_dateOfBirth', label: 'Partner Date of Birth' },
    { key: 'roomfroChild', label: 'Room for Child' },
    { key: 'absenceReason', label: 'Absence Reason' },
    { key: 'absenceStartDate', label: 'Absence Start Date' },
    { key: 'intendToReturn', label: 'Intend to Return' },
    { key: 'subletStatus', label: 'Sublet Status' },
    { key: 'absenceDuration', label: 'Absence Duration' },
    { key: 'dateLastClaimed', label: 'Date Last Claimed' },
    { key: 'lastNameClaimed', label: 'Last Name Claimed' },
    { key: 'localAuthority', label: 'Local Authority' },
    { key: 'previousClaimReference', label: 'Previous Claim Reference' },
    { key: 'incomeChangeDetails', label: 'Income Change Details' },
    { key: 'unearnedIncomeChangeDetails', label: 'Unearned Income Change Details' },
    { key: 'capitalChangeDetails', label: 'Capital Change Details' },
    { key: 'expensesChangeDetails', label: 'Expenses Change Details' },
    { key: 'early_date', label: 'Early Date' },
    { key: 'claim_start_date', label: 'Claim Start Date' },
    { key: 'circumstances_the_same', label: 'Circumstances the Same' },
    { key: 'circumstances_2_details', label: 'Circumstances 2 Details' },
    { key: 'other_charges_of_tenant', label: 'Other Charges of Tenant' },
    { key: 'source_of_income', label: 'Source of Income' },
    { key: 'total_amount', label: 'Total Amount' },
    { key: 'how_often', label: 'How Often' },
    { key: 'photo_uploaded', label: 'Photo Uploaded' },
    { key: 'proof_of_benefit_radio', label: 'Proof of Benefit Radio' },
    { key: 'bereavementDetails', label: 'Bereavement Details' },
    { key: 'relevantCircumstancesDetails', label: 'Relevant Circumstances Details' },
    { key: 'nextOfKinName', label: 'Next of Kin Name' },
    { key: 'nextOfKinAddress', label: 'Next of Kin Address' },
    { key: 'nextOfKinContactNo', label: 'Next of Kin Contact No' },
    { key: 'nextOfKinRelation', label: 'Next of Kin Relation' },
    { key: 'nextOfKinOtherContact', label: 'Next of Kin Other Contact' },
    { key: 'nextOfKinVisitDetails', label: 'Next of Kin Visit Details' },
    { key: 'gpDetails', label: 'GP Details' },
    { key: 'medicationNeeds', label: 'Medication Needs' },
    { key: 'nillIncomeFormFilledByOther', label: 'Nil Income Form Filled by Other' },
    { key: 'relationship', label: 'Relationship' },
    { key: 'reason', label: 'Reason' },
    { key: 'from', label: 'From' },
    { key: 'signOutDate', label: 'Sign Out Date' },
    { key: 'to', label: 'To' },
    { key: 'noOfSavings', label: 'Number of Savings' },
    { key: 'borrowingMoneyFromFamily', label: 'Borrowing Money from Family' },
    { key: 'borrowingMoneyFromFriends', label: 'Borrowing Money from Friends' },
    { key: 'usingMySavings', label: 'Using My Savings' },
    { key: 'childTaxCredit', label: 'Child Tax Credit' },
    { key: 'otherSupport', label: 'Other Support' },
    { key: 'additionalInformation', label: 'Additional Information' },
    { key: 'signatureOfApplicant', label: 'Signature of Applicant' },
    { key: 'supportPersonName', label: 'Support Person' },
    { key: 'signOutBy', label: 'Sign Out By' },
    { key: 'subjecttoorder', label: 'Subject to Order' },
    { key: 'supportNeeds', label: 'Support Needs' },
    { key: 'homeNo', label: 'Home Number' },
    { key: 'workNo', label: 'Work Number' },
    { key: 'communicationNeeds', label: 'Communication Needs' },
    { key: 'dateOfAssessment', label: 'Date of Assessment' },
    { key: 'debt', label: 'Debt' },
    { key: 'debts', label: 'Debts' },
    { key: 'gamblingIssues', label: 'Gambling Issues' },
    { key: 'criminalRecords', label: 'Criminal Records' },
    { key: 'fullcheck', label: 'Full Check' },
    { key: 'supportFromAgencies', label: 'Support From Agencies' },
    { key: 'physicalHealthcon', label: 'Physical Health Concern' },
    { key: 'mentalHealthcon', label: 'Mental Health Concern' },
    { key: 'prescribedMedication', label: 'Prescribed Medication' },
    { key: 'selfHarmcon', label: 'Self Harm Concern' },
    { key: 'drug', label: 'Drug Use' },
    { key: 'isotherRisk', label: 'Other Risks' },
    { key: 'mentalHealthdig', label: 'Mental Health Diagnosis' },
    { key: 'related_under_condition', label: 'Related Under Condition' },
    { key: 'records', label: 'Records' },
    { key: 'prison', label: 'Prison' },
    { key: 'family_support', label: 'Family Support' },
    { key: 'family_support_who', label: 'Family Support (Who)' },
    { key: 'currentAssessmentDate', label: 'Current Assessment Date' },
    { key: 'checklist', label: 'Checklist' },
    { key: 'preferredArea', label: 'Preferred Area' },
    { key: 'ethnicOrigin', label: 'Ethnic Origin' },
    { key: 'religion', label: 'Religion' },
    { key: 'sexualOrientation', label: 'Sexual Orientation' },
    { key: 'sourceOfIncome', label: 'Source of Income' },
    { key: 'totalAmount', label: 'Total Amount' },
    { key: 'howOften', label: 'How Often' },
    { key: 'debtdetails', label: 'Debt Details' },
    { key: 'gamblingIssuesdetails', label: 'Gambling Issues Details' },
    { key: 'qualifyreason', label: 'Qualify Reason' },
    // { key: 'tenantSignature', label: 'Tenant Signature' },
    { key: 'socialWorker', label: 'Social Worker' },
    { key: 'probationOfficer', label: 'Probation Officer' },
    { key: 'probationOfficerContactNo', label: 'Probation Officer Contact Number' },
    { key: 'cpn', label: 'Community Psychiatric Nurse (CPN)' },
    { key: 'probationOfficerAddress', label: 'Probation Officer Address' },
    { key: 'psychiatristPsychologist', label: 'Psychiatrist or Psychologist' },
    { key: 'physicalHealthdetails', label: 'Physical Health Details' },
    { key: 'mentalHealthdetails', label: 'Mental Health Details' },
    { key: 'mentalHealthdigdetails', label: 'Mental Health Diagnosis Details' },
    { key: 'prescribedMedicationdetails', label: 'Prescribed Medication Details' },
    { key: 'related_under_condition_what', label: 'Related Under Condition (What)' },
    { key: 'related_under_condition_date', label: 'Related Under Condition (Date)' },
    { key: 'whenprison', label: 'When in Prison' },
    { key: 'reason_for_prison', label: 'Reason for Prison' },
    { key: 'release_date', label: 'Release Date' },
    { key: 'details', label: 'Details' },
    { key: 'when', label: 'When' },
    { key: 'where', label: 'Where' },
    { key: 'how', label: 'How' },
    { key: 'claiming_benefits', label: 'Claiming Benefits' },
    { key: 'drug_use', label: 'Drug Use' },
    { key: 'method_of_administration', label: 'Method of Administration' },
    { key: 'administered', label: 'Administered' },
    { key: 'injection_body_part', label: 'Injection Body Part' },
    { key: 'drug_worker', label: 'Drug Worker' },
    { key: 'drug_team', label: 'Drug Team' },
    { key: 'accessingBenefits', label: 'Accessing Benefits' },
    { key: 'budgeting', label: 'Budgeting' },
    { key: 'reducingDebt', label: 'Reducing Debt' },
    { key: 'learnToShopWisely', label: 'Learn to Shop Wisely' },
    { key: 'settingUpAccount', label: 'Setting Up Account' },
    { key: 'recoupMoniesOwed', label: 'Recoup Monies Owed' },
    { key: 'manageMentalHealth', label: 'Manage Mental Health' },
    { key: 'managePhysicalHealth', label: 'Manage Physical Health' },
    { key: 'followHealthyDiet', label: 'Follow Healthy Diet' },
    { key: 'maintainHygiene', label: 'Maintain Hygiene' },
    { key: 'reduceSubstanceMisuse', label: 'Reduce Substance Misuse' },
    { key: 'registerGP', label: 'Register GP' },
    { key: 'accessingTrainingEducation', label: 'Accessing Training/Education' },
    { key: 'accessingEmployment', label: 'Accessing Employment' },
    { key: 'accessingLeisure', label: 'Accessing Leisure' },
    { key: 'accessingVolunteering', label: 'Accessing Volunteering' },
    { key: 'moveOn', label: 'Move On' },
    { key: 'supportEqualityDiversity', label: 'Support Equality and Diversity' },
    { key: 'change_offending_behaviour', label: 'Change Offending Behaviour' },
    { key: 'access_support_services', label: 'Access Support Services' },
    { key: 'establishingSupportNetworks', label: 'Establishing Support Networks' },
    { key: 'addressAntiSocialBehaviour', label: 'Address Anti-Social Behaviour' },
    { key: 'addressOffendingBehaviour', label: 'Address Offending Behaviour' },
    { key: 'developLivingSkills', label: 'Develop Living Skills' },
    { key: 'maintainAccommodation', label: 'Maintain Accommodation' },
    { key: 'minimizeRiskOfHarm', label: 'Minimize Risk of Harm' },
    { key: 'violenceAggression', label: 'Violence and Aggression' },
    { key: 'knownAssociates', label: 'Known Associates' },
    { key: 'hazardsFromOthers', label: 'Hazards From Others' },
    { key: 'otherRisk', label: 'Other Risk' },
    { key: 'interim_risk_review_details', label: 'Interim Risk Review Details' },
    { key: 'family_support_level', label: 'Family Support Level' },
    { key: 'family_support_why', label: 'Family Support (Why)' },
    { key: 'nextAssessmentDate', label: 'Next Assessment Date' },
    { key: 'risk_Identified', label: 'Risk Identified' },


];
