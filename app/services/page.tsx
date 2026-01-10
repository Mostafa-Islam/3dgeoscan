
import OurServices from '@/components/services/our-services';
import Service1 from '@/components/services/service-1';
import Service2 from '@/components/services/service-2';
import Service3 from '@/components/services/service-3';
import Service4 from '@/components/services/service-4';
import ReadySection from '@/components/projects/ready';

export default function ServicesPage() {
  return (
    <main>
      <OurServices />
      <Service1 />
      <Service2 />
      <Service3 />
      <Service4 />
      <ReadySection />
      {/* Add more service sections as needed */}
    </main>
  );
}