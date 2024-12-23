"use client";
import { isImage } from "@/components/data/helpers";
import { GetBranchInfoType } from "@/types";
import Image from "next/image";

const DetailBranch = ({ branchInfo }: { branchInfo: GetBranchInfoType }) => {
  let {
    branchInfo: branch,
    nationalIDCard,
    ppSizePhoto,
    signature,
    tradeLicense,
    moreInfo,
    personalInfo,
  } = branchInfo;

  let docsArr = [nationalIDCard, ppSizePhoto, signature, tradeLicense];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Branch Info</h2>
          <p>
            <strong>Branch Name:</strong> {branch?.branchName}
          </p>
          <p>
            <strong>Branch Mobile:</strong> {branch?.branchMobile}
          </p>
          <p>
            <strong>Branch Email:</strong> {branch?.branchEmail}
          </p>
          <p>
            <strong>Institute Age:</strong> {branch?.instituteAge}
          </p>
          <p>
            <strong>Number of Computers:</strong> {branch?.noOfComputers}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Personal Info</h2>
          <p>
            <strong>Full Name:</strong> {personalInfo?.fullName}
          </p>
          <p>
            <strong>Father&apos;s Name:</strong> {personalInfo?.fathersName}
          </p>
          <p>
            <strong>Mother&apos;s Name:</strong> {personalInfo?.mothersName}
          </p>
          <p>
            <strong>Gender:</strong> {personalInfo?.gender}
          </p>
          <p>
            <strong>Blood Group:</strong> {personalInfo?.bloodGroup}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">More Info</h2>
          <p>
            <strong>Additional Mobile:</strong> {moreInfo?.additionalMobile}
          </p>
          <p>
            <strong>Division:</strong> {moreInfo?.division}
          </p>
          <p>
            <strong>District:</strong> {moreInfo?.district}
          </p>
          <p>
            <strong>Upazila:</strong> {moreInfo?.upazila}
          </p>
          <p>
            <strong>Address:</strong> {moreInfo?.address}
          </p>
          <p>
            <strong>Postcode:</strong> {moreInfo?.postcode}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Documents</h2>
          {docsArr.map((item, i) => (
            <div key={i} className="mt-2">
              <Image
                height={200}
                width={200}
                src={item?.secure_url!}
                alt="PDF Document"
                className="w-28 h-28 mr-3 object-cover mb-2"
              />

              <a
                href={item?.secure_url!}
                target="_blank"
                download
                className="text-blue-500 text-sm hover:underline"
              >
                Detail view
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailBranch;
