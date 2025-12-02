import Checkbox from "@/Components/Checkbox";
import InputField from "@/Components/InputField";
import { ArrowRight, } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";

interface JobOverview {
  intro: string;
  aboutRole: string;
  whoYouAre: string;
  bulletPoints: string[];
  perks: string[];
}

interface JobDetail {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  locationType: string;
  department: string;
  compensation: string;
  experience: string;
  role: string;
  overview: JobOverview;
}

interface ApplicationFormData {
  fullName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  finalAgree: boolean;
}

const EXPERIENCE_OPTIONS = [
  "Consulting",
  "Investment Banking",
  "Private Equity",
  "Startup Founder",
  "Venture Capital",
] as const;

type ExperienceOption = (typeof EXPERIENCE_OPTIONS)[number];
type ExperienceState = Record<ExperienceOption, boolean>;

const defaultExperienceState: ExperienceState = EXPERIENCE_OPTIONS.reduce(
  (acc, option) => {
    acc[option] = false;
    return acc;
  },
  {} as ExperienceState
);

const mockJobs: Record<string, JobDetail> = {
  "senior-executive-operations": {
    id: "senior-executive-operations",
    title: "Senior Executive Operations (Office of the CEO)",

    location: "San Francisco",
    employmentType: "Full time",
    locationType: "On-site",
    department: "Operations",
    compensation: "$150K – $200K • Offers Equity",
    experience: "4+ years",
    role: "This is a senior role.",

    overview: {
      intro:
        "Giga builds and deploys AI support agents for the largest B2C companies. Companies like DoorDash trust Giga with their most complex support and operations problems, dramatically improving their resolution rate while accelerating their operations roadmap from years to months. Our mission is to reprogram the world's largest companies using AI.",

      aboutRole:
        "You’ll operate as a senior problem-solver and execution partner to leadership — running operating cadence, aligning teams, and delivering outcomes on high-priority initiatives. This is a hands-on execution role requiring rigorous follow-through.",

      whoYouAre:
        "You have strong strategic knowledge, operations strength, and business execution capabilities. You have experience supporting or scaling teams and feel comfortable representing the executive team internally and externally.",

      bulletPoints: [
        "Ex-consultant (Bain/BCG/McKinsey) or similar strategic background",
        "High-growth tech strategy/ops lead with OKR experience",
        "Chief of Staff / Office of the CEO operator",
        "Ex-startup founder",
        "Private Equity / Investment Banking experience"
      ],

      perks: [
        "Competitive compensation + meaningful equity",
        "Full health, dental, and vision coverage",
        "Equinox membership",
        "Snacks, coffee, and DoorDash credits",
        "Late-evening rides home covered"
      ]
    }
  }
};

// Simulated API
const fetchJobDetails = (id: string): Promise<JobDetail> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockJobs[id]) resolve(mockJobs[id]);
      else reject("Job not found");
    }, 600); // simulate network delay
  });
};

// --------------------------------------------------
// MAIN PAGE
// --------------------------------------------------

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "application">(
    "overview"
  );
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: "",
    email: "",
    phoneCountry: "+91",
    phoneNumber: "",
    finalAgree: false,
  });
  const [experience, setExperience] = useState<ExperienceState>(
    defaultExperienceState
  );
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetchJobDetails(id)
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch(() => {
        setJob(null);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setExperience((prev) => ({
      ...prev,
      [name as ExperienceOption]: checked,
    }));
  };

  const handleFinalAgree = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormData((prev) => ({ ...prev, finalAgree: checked }));
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setResumeFile(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for API submission - keeps wiring ready for future integration.
    // eslint-disable-next-line no-console
    console.log({
      ...formData,
      experience: Object.entries(experience)
        .filter(([, value]) => value)
        .map(([key]) => key),
      resumeFile,
      jobId: job?.id,
    });
  };

  // --------------------------------------------------
  // LOADING STATE
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-[var(--hero-text)] 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-semibold">Loading job details…</p>
      </div>
    );
  }

  // --------------------------------------------------
  // NOT FOUND
  // --------------------------------------------------

  if (!job) {
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-[var(--hero-text)] 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-semibold mb-3">Job not found</h1>
        <Link to="/Careers" className="text-[var(--color)] underline ">
          Go back to jobs
        </Link>
      </section>
    );
  }

  // --------------------------------------------------
  // PAGE UI
  // --------------------------------------------------

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]  xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px]">

      {/* PAGE TITLE */}
      <h1 className="xl:text-[64px] lg:text-[56px] md:text-[48px] sm:text-[40px] text-[32px] font-semibold text-black lg:mb-12 mb-6">
        {job.title}
      </h1>

      <div className="grid grid-cols-1 2xl:grid-cols-[470px_1fr] xl:grid-cols-[400px_1fr] lg:grid-cols-[250px_1fr] 2xl:gap-16 xl:gap-12 lg:gap-10 gap-6">

        {/* LEFT SIDEBAR */}
        <div className="flex flex-col gap-[24px] 2xl:pt-[88px] xl:pt-[72px] lg:pt-[60px] pt-[24px]">
          <Field label="Location" value={job.location} />
          <div className="w-full h-[2px] bg-[#EEEEEE]"></div>
          <Field label="Employment Type" value={job.employmentType} />
          <div className="w-full h-[2px] bg-[#EEEEEE]"></div>
          <Field label="Location Type" value={job.locationType} />
          <div className="w-full h-[2px] bg-[#EEEEEE]"></div>
          <Field label="Department" value={job.department} />
          <div className="w-full h-[2px] bg-[#EEEEEE]"></div>
          <Field label="Compensation" value={job.compensation} />

        </div>

        {/* RIGHT */}
        <div className="space-y-10">

          {/* TABS */}
          <div className="flex border-b border-[#F0F1F2]">
            <button
              onClick={() => setActiveTab("overview")}
              className={`lg:px-6 px-4 lg:py-5 py-3 lg:text-[20px] md:text-[18px] text-[16px] font-urbanist ${
                activeTab === "overview"
                  ? "border-b-4 border-[var(--color)] bg-[var(--color)]/10"
                  : "border-b-4 border-transparent bg-white"
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveTab("application")}
              className={`lg:px-6 px-4 lg:py-5 py-3 lg:text-[20px] md:text-[18px] text-[16px] font-urbanist ${
                activeTab === "application"
                  ? "border-b-4 border-[var(--color)] bg-[var(--color)]/10"
                  : "border-b-4 border-transparent bg-white"
              }`}
            >
              Application
            </button>
          </div>


          {activeTab === "overview" && (
  <div className="space-y-6">

    {/* Experience Line */}
    <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] text-[var(--medium-text)] leading-tight">
      <span className="font-semibold">Location:</span> {job.location} <br />
      <span className="font-semibold">Experience:</span> {job.experience}
    </p>

    {/* Senior Role */}
    <p className="font-semibold text-[var(--medium-text)] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] leading-tight">
      {job.role}
    </p>

    {/* Intro Paragraph */}
    <p className="text-[var(--medium-text)] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] leading-[1.55]">
      {job.overview.intro}
    </p>

    {/* About the Role */}
    <div>
    <h3 className="text-[26px] font-semibold text-[var(--medium-text)]">About the Role</h3>
    <p className="text-[var(--medium-text)] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] leading-[1.55]">
      {job.overview.aboutRole}
    </p>
    </div>

    {/* Who You Are */}
    <div>
    <h3 className="text-[26px] font-semibold text-[var(--medium-text)]">Who You Are</h3>
    <p className="text-[var(--medium-text)] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] leading-[1.55]">
      {job.overview.whoYouAre}
    </p>
    <ul className="list-none pl-8 space-y-3 text-[var(--medium-text)] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] leading-[1.55]">
    {job.overview.bulletPoints.map((item: string, i: number) => (
    <li key={i} className="relative md:pl-2 ">
      <span className="
        absolute -left-5
        top-[11px] lg:top-[13px] xl:top-[18px]
        h-[3px] w-[3px] md:h-[4px] md:w-[4px] lg:h-[5px] lg:w-[5px]
        rounded-full bg-[#B3B3B3]
      "></span>
      {item}
    </li>
  ))}
    </ul>
    </div>
    {/* Perks */}
    <div>
    <h3 className="text-[26px] font-semibold text-[var(--medium-text)]">Perks & Benefits</h3>
    <ul className="list-none pl-8 space-y-3 text-[var(--medium-text)] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] leading-[1.55]">
      {job.overview.perks.map((perk: string, i: number) => (
        <li key={i} className="relative md:pl-2 ">
      <span className="
        absolute -left-5
        top-[11px] lg:top-[13px] xl:top-[18px]
        h-[3px] w-[3px] md:h-[4px] md:w-[4px] lg:h-[5px] lg:w-[5px]
        rounded-full bg-[#B3B3B3]
      "></span>
      {perk}
    </li>
      ))}
    </ul>
    </div>

    {/* Apply Button */}
    <button className="inline-flex items-center bg-black text-white lg:px-8 lg:py-6 px-6 py-4  lg:text-[20px] md:text-[18px] text-[16px] font-urbanist hover:bg-neutral-900">
      Apply for this Job <ArrowRight strokeWidth={1.5} className="w-6 h-6 lg:w-8 lg:h-8" />
    </button>
  </div>
)}

          {/* --------------------------- */}
          {activeTab === "application" && (
  <form className="space-y-10" onSubmit={handleSubmit}>

    {/* FULL NAME */}
    <InputField
      label="Your Name"
      id="fullName"
      name="fullName"
      required
      placeholder="Enter Full Name"
      value={formData.fullName}
      onChange={handleInputChange}
    />

    {/* EMAIL */}
    <InputField
      label="Your Email"
      id="email"
      name="email"
      type="email"
      required
      placeholder="Enter Your Email"
      value={formData.email}
      onChange={handleInputChange}
    />

    {/* UPLOAD RESUME */}
    <div className="w-full">
      <label
        htmlFor="resumeUpload"
        className="flex flex-col items-center justify-center w-full p-6 space-y-4 border-2 border-[#E5E7EA] cursor-pointer
                   focus-within:border-[var(--color)] focus-within:ring-[var(--color)] transition"
      >
        <svg
          className="w-[28px] h-[28px] text-[var(--color)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>

        <p className="text-[16px] text-black">Upload Resume</p>

        <p className="text-[14px] text-[var(--medium-text)]">
          {resumeFile
            ? `Selected file: ${resumeFile.name}`
            : (
              <>
                Drag and drop files here or{" "}
                <span className="inline-block px-4 py-1 border border-[var(--color)] text-black">
                  Browse
                </span>
              </>
            )}
        </p>

        <hr className="w-full border-[#E5E7EA]" />

        <p className="text-[14px] text-[var(--medium-text)]">
          Supported formats: .pdf, .doc, .docx
        </p>

        <input
          id="resumeUpload"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>

    {/* PHONE NUMBER */}
    <div className="relative w-full">
      <label
        htmlFor="phoneNumber"
        className="absolute -top-2.5 left-3 bg-white px-1 text-[16px] text-[var(--medium-text)] z-10"
      >
        Phone Number <span className="text-red-500">*</span>
      </label>

      <div className="flex w-full border-2 border-[#E5E7EA] 
                      focus-within:border-[var(--color)] focus-within:ring-[var(--color)]">

        {/* COUNTRY SELECT */}
        <select
          name="phoneCountry"
          value={formData.phoneCountry}
          onChange={handleInputChange}
          className="w-20 pl-3 pr-1 py-[14px] bg-transparent text-base text-[#999] appearance-none focus:ring-0"
        >
          <option value="+91">+91</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
        </select>

        {/* Divider */}
        <div className="border-r-2 border-[#E5E7EA] my-3"></div>

        {/* PHONE FIELD */}
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          required
          placeholder="Enter Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="flex-1 px-3 py-[14px] text-base text-[#999] bg-transparent focus:ring-0 outline-none"
        />
      </div>
    </div>

    {/* EXPERIENCE CHECKBOXES */}
    <div className="space-y-4">
      <p className="text-[18px] font-semibold text-[var(--medium-text)]">
        Select all that apply from your previous experience<span className="text-red-500">*</span>
      </p>

      {EXPERIENCE_OPTIONS.map((label, index) => (
        <Checkbox
          key={index}
          label={label}
          id={`exp-${label}`}
          name={label}
          checked={experience[label]}
          onChange={handleExperienceChange}
        />
      ))}
    </div>

    {/* ARE YOU READY? */}
    <div className="space-y-4">
      <p className="text-[18px] font-semibold text-[var(--medium-text)]">
        Are you ready?<span className="text-red-500">*</span>
      </p>

      <ul className="list-none pl-6 space-y-3 text-[18px] leading-[1.55] text-[var(--medium-text)]">
        {[
          "Like the rest of the team, you will need to be in the office 6 days a week",
          "You will need to be based in San Francisco",
          "You may need to be on-call anytime to support the CEO",
        ].map((item, i) => (
          <li key={i} className="relative">
            <span
              className="absolute -left-4 top-[10px] h-[4px] w-[4px] rounded-full bg-[#B3B3B3]"
            ></span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* FINAL CONFIRMATION */}
    <Checkbox
      label="Do you accept and understand?"
      id="finalAgree"
      name="finalAgree"
      checked={formData.finalAgree}
      onChange={handleFinalAgree}
    />

    {/* SUBMIT BUTTON */}
    <button
      type="submit"
      className="inline-flex items-center bg-black text-white px-8 py-4 mt-6
                 text-[18px] hover:bg-neutral-900"
    >
      Submit <ArrowRight strokeWidth={1.5} className="ml-2 w-6 h-6" />
    </button>
  </form>
)}

        </div>
      </div>
    </section>
  );
};



const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col lg:gap-[8px] md:gap-[6px] gap-[4px]">
    <p className="lg:text-[20px] md:text-[18px] text-[16px] font-urbanist text-[var(--medium-text)]">
      {label}
    </p>
    <p className="lg:text-[28px] md:text-[24px] text-[20px] font-urbanist font-medium text-[var(--medium-text)]">{value}</p>
  </div>
);

export default JobDetailsPage;
