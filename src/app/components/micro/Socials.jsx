import { useGetSocialQuery } from "@/redux/api/socials.api";
import React from "react";
import styles from "@/app/css/footer.module.css";

const SocialIcon = ({ href, children, className = "" }) => (
  <div className="">
    <a target="_blank" href={href} className={className}>
      {children}
    </a>
  </div>
);

const socialIcons = {
  telegram: (href) => (
    <SocialIcon href={href}>
      <img src="/icon/socials/vkIcon.svg" alt="vk иконка" />
    </SocialIcon>
  ),
  vk: (href) => (
    <SocialIcon href={href}>
      <img src="/icon/socials/tgIcon.svg" alt="telegram иконка" />
    </SocialIcon>
  ),
  youtube: (href) => (
    <SocialIcon href={href}>
      <img src="/icon/socials/youtubeIcon.svg" alt="telegram иконка" />
    </SocialIcon>
  ),
};

function Socials() {
  const { isLoading, data } = useGetSocialQuery();

  if (isLoading || !data?.data?.[0]?.attributes) {
    return null;
  }

  const socials = data.data[0].attributes;

  return (
    <div className="!flex gap-2 pt-3">
      {socials.telegram && socialIcons.telegram(socials.telegram)}
      {socials.vk && socialIcons.vk(socials.vk)}
      {socials.youtube && socialIcons.youtube(socials.youtube)}
    </div>
  );
}

export default Socials;
