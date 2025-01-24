import mongoose, { Schema, model } from 'mongoose';
import { type } from 'os';

const riskCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false, // Checkbox status (true = checked, false = unchecked)
  },
  whoIsAtRisk: {
    type: String,
    required: function () {
      return this.isChecked; // Only required if the category is checked
    },
  },
  riskManagement: {
    type: String,
    required: function () {
      return this.isChecked; // Only required if the category is checked
    },
  },
  riskRating: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: function () {
      return this.isChecked; // Only required if the category is checked
    },
  },
});

const AssessmentSchema = new Schema({
  supportWorkerSignature: { type: String, default: '' },
  tenantSignature: { type: String, default: '' },
  subjecttoorder: { type: String, default: '' },
  supportNeeds: [String],
  homeNo: { type: Boolean, default: false },
  homeNoDetails: { type: String, default: '' },
  workNo: { type: Boolean, default: false },
  workNoDetails: { type: String, default: '' },
  communicationNeeds: { type: Boolean, default: false },
  communicationNeedsDetails: { type: String, default: '' },
  dateOfAssessment: { type: Date },
  debt: { type: Boolean, default: false },
  debts: { type: Boolean, default: false },
  gamblingIssues: { type: Boolean, default: false },
  criminalRecords: { type: Boolean, default: false },
  fullcheck: { type: Boolean, default: false },
  supportFromAgencies: { type: Boolean, default: false },
  physicalHealthcon: { type: Boolean, default: false },
  mentalHealthcon: { type: Boolean, default: false },
  prescribedMedication: { type: Boolean, default: false },
  selfHarmcon: { type: Boolean, default: false },
  drug: { type: Boolean, default: false },
  isotherRisk: { type: Boolean, default: false },
  mentalHealthdig: { type: Boolean, default: false },
  diagnosed_any_mental_health_name_person: { type: String, default: '' },
  diagnosed_any_mental_health_prescribed: { type: String, default: '' },
  diagnosed_any_mental_health_dosage: { type: String, default: '' },
  diagnosed_any_mental_health_medication: { type: String, default: '' },
  related_under_condition: { type: Boolean, default: false },
  records: [
    {
      natureOfOffence: { type: String, default: '' },
      date: { type: Date },
      sentence: { type: String, default: '' },
    },
  ],
  prison: { type: Boolean, default: false },
  family_support: { type: String, enum: ['yes', 'no'] },
  family_support_who: { type: String, default: '' },
  currentAssessmentDate: { type: Date },
  checklist: {
    type: Map,
    of: Boolean,
  },
  preferredArea: { type: String, default: '' },
  ethnicOrigin: { type: String, default: '' },
  religion: { type: String, default: '' },
  sexualOrientation: { type: String, default: '' },
  sourceOfIncome: { type: String, default: '' },
  totalAmount: { type: String, default: '' },
  howOften: { type: String, default: '' },
  debtdetails: { type: String, default: '' },
  gamblingIssuesdetails: { type: String, default: '' },
  qualifyreason: { type: String, default: '' },
  tenantSignature: { type: String, default: '' }, // Base64 encoded image string
  socialWorker: { type: String, default: '' },
  probationOfficer: { type: String, default: '' },
  probationOfficerContactNo: { type: String, default: '' },
  cpn: { type: String, default: '' },
  probationOfficerAddress: { type: String, default: '' },
  psychiatristPsychologist: { type: String, default: '' },
  physicalHealthdetails: { type: String, default: '' },
  mentalHealthdetails: { type: String, default: '' },
  mentalHealthdigdetails: { type: String, default: '' },
  prescribedMedicationdetails: { type: String, default: '' },
  related_under_condition_what: { type: String, default: '' },
  related_under_condition_date: { type: String, default: '' },
  whenprison: { type: String, default: '' },
  reason_for_prison: { type: String, default: '' },
  release_date: { type: Date },
  details: { type: String, default: '' },
  when: { type: String, default: '' },
  where: { type: String, default: '' },
  how: { type: String, default: '' },
  claiming_benefits: { type: String, default: '' },
  drug_use: { type: String, default: '' },
  method_of_administration: { type: String, default: '' },
  administered: { type: String, default: '' },
  injection_body_part: { type: String, default: '' },
  drug_worker: { type: String, default: '' },
  drug_team: { type: String, default: '' },
  accessingBenefits: { type: String, default: '' },
  budgeting: { type: String, default: '' },
  reducingDebt: { type: String, default: '' },
  learnToShopWisely: { type: String, default: '' },
  settingUpAccount: { type: String, default: '' },
  recoupMoniesOwed: { type: String, default: '' },
  manageMentalHealth: { type: String, default: '' },
  managePhysicalHealth: { type: String, default: '' },
  followHealthyDiet: { type: String, default: '' },
  maintainHygiene: { type: String, default: '' },
  reduceSubstanceMisuse: { type: String, default: '' },
  registerGP: { type: String, default: '' },
  accessingTrainingEducation: { type: String, default: '' },
  accessingEmployment: { type: String, default: '' },
  accessingLeisure: { type: String, default: '' },
  accessingVolunteering: { type: String, default: '' },
  moveOn: { type: String, default: '' },
  supportEqualityDiversity: { type: String, default: '' },
  change_offending_behaviour: { type: String, default: '' },
  access_support_services: { type: String, default: '' },
  establishingSupportNetworks: { type: String, default: '' },
  addressAntiSocialBehaviour: { type: String, default: '' },
  addressOffendingBehaviour: { type: String, default: '' },
  developLivingSkills: { type: String, default: '' },
  maintainAccommodation: { type: String, default: '' },
  minimizeRiskOfHarm: { type: String, default: '' },
  otherRisk: { type: String, default: '' },
  interim_risk_review_details: { type: String, default: '' },
  family_support_level: { type: String, default: '' },
  family_support_why: { type: String, default: '' },
  ReferredFrom: { type: String, default: '' },
  nextAssessmentDate: { type: Date },
  categories: { type: Object, default: {} },
  // violenceAggression: { type: Boolean, default: false },
  // knownAssociates: { type: Boolean, default: false },
  // hazardsFromOthers: { type: Boolean, default: false },
})

const TenantSchema = new Schema({
  tenantSignupEmail: { type: String, default: '' },
  property: { type: mongoose.Types.ObjectId, ref: 'properties', required: true },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'addedByModel' // Dynamic reference based on `addedByModel`
  },
  companyid: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'rsl'
  },
  addedByModel: {
    type: String,
    required: true,
    enum: ['User', 'Staff']  // Only allow "User" or "Staff" as values
  },
  hasGPInfo: { type: Boolean, default: false },
  homelessHostelSupport: { type: Boolean, default: false },
  affordProperty: { type: Boolean, default: false },
  relevantCircumstances: { type: Boolean, default: false },
  bereavement: { type: Boolean, default: false },
  isYouorptnrIstd: { type: Boolean, default: false },
  incapableofwork: { type: Boolean, default: false },
  isBlind: { type: Boolean, default: false },
  ispreblind: { type: Boolean, default: false },
  CarerAllowance: { type: Boolean, default: false },
  needOvernightcare: { type: Boolean, default: false },
  grantpaymentsforvehicle: { type: Boolean, default: false },
  vehicles: { type: Boolean, default: false },
  isdistinguishingMarks: { type: Boolean, default: false },
  isfostercarer: { type: Boolean, default: false },
  isabsentathome: { type: Boolean, default: false },
  hasClaimed: { type: Boolean, default: false },
  incomeChange: { type: Boolean, default: false },
  unearnedIncomeChange: { type: Boolean, default: false },
  capitalChange: { type: Boolean, default: false },
  expensesChange: { type: Boolean, default: false },
  moveInLast12Months: { type: Boolean, default: false },
  ispartnerlivingwithyou: { type: Boolean, default: false },
  visitedUk: { type: Boolean, default: false },
  isemployerDetails: { type: Boolean, default: false },
  signuptype: { type: Boolean, required: false },
  nillIncome: { type: Boolean, default: false },
  hasNextOfKin: { type: Boolean, default: false },
  afford_rent: { type: Boolean, default: false },
  exoffender: { type: Boolean, default: false },
  terms: { type: Boolean, },
  room: { type: Number, },
  signInDate: { type: Date, },
  endDate: { type: Date },
  title_before_name: { type: String, default: '' },
  firstName: { type: String, },
  lastName: { type: String, },
  middleName: { type: String, default: '' },
  tenantContactNumber: { type: String, default: '' },
  tenantEmail: { type: String, default: "" },
  nationalInsuranceNumber: { type: String, },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  build: { type: String, default: '' },
  claimReferenceNumber: { type: String, default: 'No' },
  maritalstatus: { type: String, enum: ['single', 'married', 'divorced', 'widowed', `separated`] },
  height: { type: String, default: '' },
  shoeSize: { type: String, default: '' },
  clothingSize: { type: String, default: '' },
  eyeColor: { type: String, default: '' },
  skinTone: { type: String, default: '' },
  hairColor: { type: String, default: '' },
  dateOfBirth: { type: Date },
  placeOfBirth: { type: String, default: '' },
  reasonforhomelessness: { type: String, default: '' },
  vehiclesdetails: { type: String, default: '' },
  distinguishingMarks: { type: String, default: '' },
  employerDetails: { type: String, default: '' },
  address: { type: String, default: '' },
  pincode: { type: String, default: '' },
  city: { type: String, default: '' },
  tenancy_type: { type: String, default: '' },
  ukvisitedDate: { type: Date },
  partner_title_before_name: { type: String, default: '' },
  partner_firstName: { type: String, default: '' },
  partner_lastName: { type: String, default: '' },
  partner_middleName: { type: String, default: '' },
  partner_nationalInsuranceNumber: { type: String, default: '' },
  partner_dateOfBirth: { type: Date },
  roomfroChild: { type: Boolean, default: false },
  absenceReason: { type: String, default: '' },
  absenceStartDate: { type: Date },
  intendToReturn: { type: String, default: '' },
  subletStatus: { type: String, default: '' },
  absenceDuration: { type: String, default: '' },
  dateLastClaimed: { type: Date },
  lastNameClaimed: { type: String, default: '' },
  localAuthority: { type: String, default: '' },
  previousClaimReference: { type: String, default: '' },
  incomeChangeDetails: { type: String, default: '' },
  unearnedIncomeChangeDetails: { type: String, default: '' },
  capitalChangeDetails: { type: String, default: '' },
  expensesChangeDetails: { type: String, default: '' },
  early_date: { type: Boolean, default: false },
  claim_start_date: { type: Date },
  circumstances_the_same: { type: Boolean, default: false },
  circumstances_2_details: { type: String, default: '' },
  other_charges_of_tenant: { type: String, default: '' },
  source_of_income: { type: String, default: '' },
  total_amount: { type: String, default: '' },
  how_often: { type: String, default: '' },
  photo_uploaded: { type: Boolean, default: false },
  proof_of_benefit_radio: { type: Boolean, default: false },
  bereavementDetails: { type: String, default: '' },
  relevantCircumstancesDetails: { type: String, default: '' },
  nextOfKinName: { type: String, default: '' },
  nextOfKinAddress: { type: String, default: '' },
  nextOfKinContactNo: { type: String, default: '' },
  nextOfKinRelation: { type: String, default: '' },
  nextOfKinOtherContact: { type: String, default: '' },
  nextOfKinVisitDetails: { type: String, default: '' },
  gpDetails: { type: String, default: '' },
  medicationNeeds: { type: String, default: '' },
  nillIncomeFormFilledByOther: { type: Boolean, default: false },
  relationship: { type: String, default: '' },
  reason: { type: String, default: '' },
  from: { type: Date },
  signOutDate: { type: Date, default: Date.now() },
  to: { type: Date },
  noOfSavings: { type: String, default: '' },
  borrowingMoneyFromFamily: { type: String, default: '' },
  borrowingMoneyFromFriends: { type: String, default: '' },
  usingMySavings: { type: String, default: '' },
  childTaxCredit: { type: String, default: '' },
  otherSupport: { type: String, default: '' },
  additionalInformation: { type: String, default: '' },
  supportCheckList_terms: { type: Boolean, default: false },
  licenseToOccupy_terms: { type: Boolean, default: false },
  weeklyServiceCharge_terms: { type: Boolean, default: false },
  missingPersonForm_terms: { type: Boolean, default: false },
  tenantIdConsentForm_terms: { type: Boolean, default: false },
  personalDetails_terms: { type: Boolean, default: false },
  licenseChargePayments_terms: { type: Boolean, default: false },
  fireEvacuationProcedure_terms: { type: Boolean, default: false },
  supportAgreement_terms: { type: Boolean, default: false },
  complaintsProcedureDeclaration_terms: { type: Boolean, default: false },
  confidentialityWaiverForm_terms: { type: Boolean, default: false },
  niIncomeForm_terms: { type: Boolean, default: false },
  authorizationForm_terms: { type: Boolean, default: false },
  supportServices_terms: { type: Boolean, default: false },
  supportCheckList: { type: String, default: '' },
  licenseToOccupy: { type: String, default: '' },
  weeklyServiceCharge: { type: String, default: '' },
  missingPersonForm: { type: String, default: '' },
  tenantIdConsentForm: { type: String, default: '' },
  personalDetails: { type: String, default: '' },
  licenseChargePayments: { type: String, default: '' },
  supportAgreement: { type: String, default: '' },
  fireEvacuationProcedure: { type: String, default: '' },
  complaintsProcedureDeclaration: { type: String, default: '' },
  confidentialityWaiverForm: { type: String, default: '' },
  niIncomeForm: { type: String, default: '' },
  authorizationForm: { type: String, default: '' },
  supportServices: { type: String, default: '' },
  staffagree_terms: { type: Boolean, default: false },
  supportmansign: { type: String, default: '' },
  bcc_form: {
    filename: { type: String, default: '' },
    path: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: '' },
  },
  proof_of_benefit: {
    filename: { type: String, default: '' },
    path: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: '' },
  },
  photo: {
    filename: { type: String, default: '' },
    path: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: '' },
  },
  staffSignature: { type: String, default: '' },
  signoutsignature: { type: String, default: '' },
  nillincomesign: { type: String, default: '' },
  isSignOut: { type: Number, default: 0 },
  isPresent: { type: Boolean, default: false },
  signOutper: {
    byWhom: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'addedByModel'
    },
    addedByModel: {
      type: String,
      enum: ['User', 'Staff']
    },
  },
  status: { type: Number, default: 0 },
  assesment: {
    type: AssessmentSchema,
    default: {}
  },
  approved_status: {
    type: Number,
    enum: [0, 1, 2],
    //0:pending,
    //1:approved,
    //2:reject
  },
  error: { type: String, default: '' },
  checked: { type: String, default: 0 },
  Next_HB_payment_date: { type: Date, },
  Next_HB_payment_amount: { type: Number, default: 0 },
  Housing_benefit_weekly_amount: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Tenants = mongoose.model('Tenants', TenantSchema);
export default Tenants;
