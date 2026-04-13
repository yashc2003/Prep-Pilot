const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { connectToDatabase } = require("../db/connect");
const {
  User,
  Company,
  Job,
  Candidate,
  College,
  Consultancy,
  Application,
  MockInterview,
  Question,
  AIEvaluation,
  InterviewSchedule,
  Payment,
  Notification
} = require("../models");

async function clearCollections() {
  const names = [
    "users",
    "companies",
    "jobs",
    "candidates",
    "colleges",
    "consultancies",
    "applications",
    "mock_interviews",
    "questions",
    "ai_evaluations",
    "interviews",
    "payments",
    "notifications"
  ];

  for (const name of names) {
    // eslint-disable-next-line no-await-in-loop
    await mongoose.connection.collection(name).deleteMany({});
  }
}

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI in environment (.env).");

  await connectToDatabase(uri);
  await clearCollections();

  const passwordHash = await bcrypt.hash("Password@123", 10);

  const adminUser = await User.create({
    name: "System Admin",
    email: "admin@preppilot.local",
    passwordHash,
    role: "admin",
    phone: "9112233445",
    status: "active"
  });

  const collegeUser = await User.create({
    name: "Placement Office",
    email: "placement@abcit.edu",
    passwordHash,
    role: "college",
    phone: "9123456780",
    status: "active"
  });

  const college = await College.create({
    user_id: collegeUser._id,
    college_name: "ABC Institute of Technology",
    location: "Bengaluru",
    contact_email: "placement@abcit.edu"
  });

  const companyUser = await User.create({
    name: "Hiring Team",
    email: "hr@acme.com",
    passwordHash,
    role: "company",
    phone: "9988776655",
    status: "active"
  });

  const company = await Company.create({
    user_id: companyUser._id,
    company_name: "Acme Tech Pvt Ltd",
    industry: "IT",
    location: "Bengaluru",
    website: "https://acme.com",
    description: "Product company hiring freshers & interns."
  });

  const consultancyUser = await User.create({
    name: "TalentScout Desk",
    email: "contact@talentscout.in",
    passwordHash,
    role: "consultancy",
    phone: "9001122334",
    status: "active"
  });

  const consultancy = await Consultancy.create({
    user_id: consultancyUser._id,
    name: "TalentScout Consultancy",
    services: ["Recruitment", "Training"],
    fees: 499,
    rating: 4.4
  });

  const candidateUser = await User.create({
    name: "Aarav Sharma",
    email: "aarav.candidate@example.com",
    passwordHash,
    role: "candidate",
    phone: "9876543210",
    status: "active"
  });

  const candidate = await Candidate.create({
    user_id: candidateUser._id,
    education: "B.Tech CSE",
    skills: ["JavaScript", "React", "Node.js"],
    resume_url: "https://example.com/resume/aarav.pdf",
    experience: "Fresher",
    college_id: college._id
  });

  const job = await Job.create({
    company_id: company._id,
    job_title: "Frontend Developer Intern",
    description: "Work with React + API integration and build UI components.",
    skills_required: ["React", "JavaScript", "HTML", "CSS"],
    salary: "₹15k/month",
    location: "Bengaluru",
    experience: "Fresher",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    status: "open"
  });

  await Application.create({
    job_id: job._id,
    candidate_id: candidate._id,
    status: "applied",
    applied_date: new Date()
  });

  const q1 = await Question.create({
    domain: "Technical",
    question_text: "Explain the difference between var, let, and const in JavaScript.",
    difficulty: "Easy"
  });

  const interview = await MockInterview.create({
    candidate_id: candidate._id,
    date: new Date(),
    domain: "Technical",
    score: 78,
    feedback: "Good fundamentals; improve communication pacing.",
    confidence_score: 70,
    communication_score: 65
  });

  await AIEvaluation.create({
    interview_id: interview._id,
    answer_text: "var is function-scoped, let/const are block-scoped; const prevents reassignment.",
    score: 80,
    remarks: `Good answer. Related question: ${q1._id}`
  });

  await InterviewSchedule.create({
    candidate_id: candidate._id,
    company_id: company._id,
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    mode: "online",
    status: "scheduled"
  });

  await Payment.create({
    candidate_id: candidate._id,
    consultancy_id: consultancy._id,
    amount: 499,
    status: "paid",
    date: new Date()
  });

  await Notification.create({
    user_id: candidateUser._id,
    message: "Your application has been submitted successfully.",
    status: "unread",
    created_at: new Date()
  });

  await Notification.create({
    user_id: adminUser._id,
    message: "Seed completed and sample data inserted.",
    status: "read",
    created_at: new Date()
  });

  // eslint-disable-next-line no-console
  console.log("Seed complete.");
  await mongoose.disconnect();
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
