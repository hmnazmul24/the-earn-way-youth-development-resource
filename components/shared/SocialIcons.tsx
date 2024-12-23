import Link from "next/link";
import React, { Fragment } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";

const SocialIcons = ({
  footer,
  className,
}: {
  footer?: boolean;
  className?: string;
}) => {
  const socialLinks = [
    {
      href: "https://www.facebook.com/the.earn.way?mibextid=ZbWKwL",

      ariaLabel: "Facebook",
      icon: <FaFacebookF />,
    },
    {
      href: "https://wa.me/message/JL3ZRGMBGJMRK1",

      ariaLabel: "WhatsApp",
      icon: <FaWhatsapp />,
    },
    {
      href: "https://www.instagram.com/hmnajmul24?igsh=bW01ZG1wYnYzb3k5",

      ariaLabel: "Instagram",
      icon: <FaInstagram />,
    },

    {
      href: "https://youtube.com/@theearnwayacademy?si=R823oX_fLO4qaQqd",

      ariaLabel: "YouTube",
      icon: <FaYoutube />,
    },
    {
      href: "https://www.tiktok.com/@hm.nazmul6?_t=8pLn586InFS&_r=1",

      ariaLabel: "TikTok",
      icon: <SiTiktok />,
    },
    { href: "tel:01880110842", ariaLabel: "Call", icon: <FaPhoneAlt /> },
  ];

  return (
    <ul className={`flex items-center justify-center gap-2 ${className}`}>
      {socialLinks.map((item) => (
        <Link href={item.href} target="_blank" key={item.ariaLabel}>
          <li
            className={` rounded-full ${
              footer
                ? "bg-amber-500 p-2 text-black"
                : "text-yellow-500 p-2 bg-black"
            }`}
          >
            {item.icon}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SocialIcons;
