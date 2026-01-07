import React from 'react';
// Import your projects component if needed
import OurWork from '@/components/projects/our_work';
import FeaturedProjects from '@/components/projects/featured_projects';
import ReadySection from '@/components/projects/ready';
export default function ProjectsPage() {
  return (
    <main>
      <OurWork />
      <FeaturedProjects />
      <ReadySection />
      {/* Add more content here */}
    </main>
  );
}