// Components
import { Text } from '@/components';
import { FormBooking } from '@/sections';

const Page = async ({ params }: { params: Promise<{ doctorId: string }> }) => {
  const { doctorId } = await params;

  return (
    <div className="container">
      <div className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center">
        <Text color="tertiary" size="4xl">
          Booking Appointments
        </Text>
      </div>
      <FormBooking doctorId={doctorId} />
    </div>
  );
};

export default Page;
