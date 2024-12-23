import { CertificateInfoType } from "@/types";
import { StudentResultPDFtype } from "@/types/pdf";
import { BranchStudentType } from "@/types/students";

import { jsPDF } from "jspdf";

// Define the interface

const fetchImageAsDataURL = async (imageUrl: string): Promise<string> => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

export const generateStudentResultPDF = async (data: StudentResultPDFtype) => {
  const doc = new jsPDF();

  // Fetch student photo as a data URL
  const photoData = await fetchImageAsDataURL(data.photoUrl);

  // Add logo directly from the public folder
  const logoPath = `${window.location.origin}${data.logoPath}`;
  const logoResponse = await fetch(logoPath);
  const logoBlob = await logoResponse.blob();
  const logoData = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(logoBlob);
  });

  // Add logo at the center top
  doc.addImage(logoData, "JPEG", 90, 10, 30, 30);

  // Add title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("The Earn Way Youth Development Resource", 105, 50, {
    align: "center",
  });

  // Student Information
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const startX = 20;
  const startY = 70;
  const lineHeight = 10;

  const studentData = [
    { label: "Name", value: data.name },
    { label: "Father Name", value: data.fatherName },
    { label: "Mother Name", value: data.motherName },
    { label: "Roll No.", value: data.rollNo },
    { label: "Reg. No.", value: data.regNo },
    { label: "Result", value: data.result },
    { label: "Branch", value: data.branch },
  ];

  studentData.forEach((item, index) => {
    doc.text(`${item.label} :`, startX, startY + index * lineHeight);
    doc.text(item.value, startX + 50, startY + index * lineHeight);
  });

  // Add student photo
  doc.addImage(photoData, "JPEG", 150, 60, 40, 40);

  // Save the PDF
  doc.save("Student-Result.pdf");
};

export const generateAdmissionFormPDF = (data: BranchStudentType) => {
  const doc = new jsPDF("p", "mm", "a4");

  // Add the header image
  const img = new Image();
  img.src = "/logo.png"; // Path to the image
  doc.addImage(img, "PNG", 85, 10, 40, 40); // Adjust positioning and size

  // Add the header text
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("Admission Form", 105, 55, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("The Earn May Youth Development Resource", 105, 62, {
    align: "center",
  });
  doc.text("Sohidul Islam Market, Damurhuda, Chuadanga", 105, 68, {
    align: "center",
  });

  // Add a line separator below the header
  doc.line(15, 75, 195, 75);

  // Add Personal Details section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Personal Details", 15, 85);
  doc.setLineWidth(0.5);
  doc.line(15, 87, 47, 87);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${data.name}`, 15, 95);
  doc.text(`Father's Name: ${data.fatherName}`, 105, 95);

  doc.text(`Mother's Name: ${data.motherName}`, 15, 105);
  doc.text(`Mobile: ${data.mobile}`, 105, 105);

  doc.text(`Gender: ${data.gender}`, 15, 115);
  doc.text(`Date of Birth: ${data.dateOfBirth}`, 105, 115);

  doc.text(`Nationality: ${data.nationality}`, 15, 125);
  doc.text(`Religion: ${data.religion}`, 105, 125);

  doc.text(`Blood Group: ${data.bloodGroup}`, 15, 135);
  doc.text(`Email: ${data.email || "N/A"}`, 105, 135);

  // Add Course Details section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Course Details", 15, 145);
  doc.line(15, 147, 46, 147);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Course Duration: ${data.courseDuration}`, 15, 155);
  doc.text(`Course Range: ${data.courseRange}`, 105, 155);

  doc.text(`Course Trade: ${data.courseTrade}`, 15, 165);
  doc.text(`Medium: ${data.mediam}`, 105, 165);

  // Add Academic Details section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Academic Details", 15, 175);
  doc.line(15, 177, 49, 177);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Passed Board: ${data.passedBoard}`, 15, 185);
  doc.text(`Passed Year: ${data.passedYear}`, 105, 185);

  doc.text(`Passed Roll: ${data.passedRoll}`, 15, 195);
  doc.text(`Passed Result: ${data.passedResult}`, 105, 195);

  // Add footer lines for signature
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Student's Signature", 15, 275);
  doc.text("Authority's Signature", 135, 275);
  doc.line(15, 271, 48, 271); // Adjusted line width for student's signature
  doc.line(135, 271, 168, 271); // Adjusted line width for authority's signature

  // Save the PDF
  doc.save(`${data.name}_Admission_Form.pdf`);
};

export const generateRegistrationCardPDF = (
  data: BranchStudentType,
  branchName: string
) => {
  const doc = new jsPDF("p", "mm", "a4");

  // Add the header image
  const img = new Image();
  img.src = "/reg2.jpeg"; // Template background
  doc.addImage(img, "JPEG", 10, 10, 190, 277); // Full-page template

  // Add the student's image
  if (data.profileDoc) {
    const profileImg = new Image();
    profileImg.src = data.profileDoc.secure_url; // Cloudinary URL
    doc.addImage(profileImg, "JPEG", 150, 135, 30, 30); // Position & size of profile picture
  }

  // image for overwridding r

  const img2 = new Image();
  img2.src = "/white.png";
  doc.addImage(img2, "PNG", 51, 212, 5, 5);

  // Set font settings
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  // Add the title text
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(data.courseTrade || "Course Name", 105, 120, { align: "center" });

  // Add registration details
  const startY = 142;

  doc.setFontSize(13);
  const labels = [
    { y_axis: 0, value: data.name },
    { y_axis: 9, value: data.fatherName },
    { y_axis: 18, value: data.motherName },
    { y_axis: 28, value: data.gender },
    { y_axis: 39, value: data.dateOfBirth },
    { y_axis: 47, value: branchName },
    { y_axis: 57, value: data.genReg || "N/A" },
    { y_axis: 74, value: data.genRoll || "N/A" },
  ];

  labels.forEach((item) => {
    const y = startY + item.y_axis;
    doc.text(``, 20, y);
    doc.text(item.value || "N/A", 88, y);
  });
  doc.setFontSize(10);
  doc.text(data.courseRange, 136, 217);
  doc.text(new Date(data.createdAt).getFullYear().toString(), 142, 224);

  // Save the PDF
  doc.save(`${data.name}_Registration_Card.pdf`);
};

export const generateCertificatePdf = async (info: CertificateInfoType) => {
  const doc = new jsPDF("l", "mm", "a4");

  // show images
  const img = new Image();
  img.src = "/certificate/certificate.jpeg";
  doc.addImage(img, "JPEF", 2, 2, 293, 206);
  const img2 = new Image();
  img2.src = "/certificate/symbol.png";
  doc.addImage(img2, "PNG", 21.5, 19.5, 50, 60);
  const img3 = new Image();
  img3.src = "/certificate/subjects.png";
  doc.addImage(img3, "PNG", 21.5, 81.5, 50.5, 66);
  const img4 = new Image();
  img4.src = "/certificate/score.png";
  doc.addImage(img4, "PNG", 21.8, 151.5, 50, 37);

  doc.setFontSize(12);

  // for roll
  doc.text(info.roll.toString(), 238, 83);
  // for reg
  doc.text(info.reg.toString(), 238, 90);
  // for issueDate
  doc.text(new Date().toLocaleString().slice(0, 10), 238, 98);

  // for name
  doc.text(info.fullName, 131, 107);
  // for father
  doc.text(info.fathersName, 125, 117);
  // for mother
  doc.text(info.mothersName, 210, 117);
  // for courseName
  doc.text(info.courseName, 172, 127);
  // for institution name
  doc.text(info.branchName, 130, 136);
  // for held from
  doc.text(info.held, 118, 145);
  // for branch code
  doc.text(info.branchCode, 252, 136);
  // for grade
  doc.text(info.grade, 247, 145.5);

  doc.save("certificate.pdf");
};
