import React from 'react';
import type { IExperience } from '../../services/api';

interface Props {
  experience: IExperience;
}

const ExperienceInfo: React.FC<Props> = ({ experience }) => {
  return (
    <>
      <img
        src={experience.imageUrl}
        alt={experience.name}
        className="w-[765px] h-[381px] object-cover  rounded-lg "
      />

      <h1 className="text-3xl mt-6  mb-4 font-inter font-medium text-[24px] leading-[32px] tracking-[0em]">{experience.name}</h1>
      <p className="text-gray-600 mb-6">{experience.description}</p>

      

    </>
  );
};

export default ExperienceInfo;
