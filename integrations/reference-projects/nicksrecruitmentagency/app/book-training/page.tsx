import SimpleForm from "@/components/SimpleForm";

export default function BookTrainingPage() {
  return (
    <div className="container-page max-w-lg py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">Book Training</h1>
      <p className="mt-3 text-navy-700/70">Reserve a seat in an upcoming course.</p>
      <div className="mt-8">
        <SimpleForm
          title="Training Booking"
          submitLabel="Book Seat"
          fields={[
            { name: "fullName", label: "Full name" },
            { name: "phone", label: "Phone number", type: "tel" },
            { name: "course", label: "Course name" },
          ]}
        />
      </div>
    </div>
  );
}
