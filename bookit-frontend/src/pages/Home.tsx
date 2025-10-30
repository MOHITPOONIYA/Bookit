import React, { useState, useEffect } from 'react';
import type {  IExperience } from '../services/api';
import  { getExperiences } from '../services/api';
import  ExperienceCard from '../components/ExperiencedCard';

// 1. Define the props we expect from App.tsx
interface HomeProps {
  searchTerm: string;
}

const Home: React.FC<HomeProps> = ({ searchTerm }) => { // 2. Accept props
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This still fetches ALL experiences
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await getExperiences();
        setExperiences(data); // We set the full list
        setError(null);
      } catch (err) {
        setError('Failed to fetch experiences. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []); // Still runs only once

  // 3. Filter the full list based on the searchTerm prop
  const filteredExperiences = experiences.filter(exp =>
    exp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Render Logic ---

  if (loading) {
    return <div className="text-center p-10">Loading experiences...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container md:p-6 ">
      <div className=" grid grid-cols-4 gap-4 w-[80%] mx-auto ">
        
        {/* 4. Map over the NEW filtered list */}
        {filteredExperiences.map((exp) => (
          <ExperienceCard key={exp._id} experience={exp} />
        ))}

        {/* 5. Show a message if the filtered list is empty */}
        {filteredExperiences.length === 0 && (
          <div className="col-span-4 text-center p-10">
            <h2 className="text-xl font-semibold">
              No results found for "{searchTerm}"
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;