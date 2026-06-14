export default function CompanyCard({
  company,
  total
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold">
        {company}
      </h2>

      <p>
        Total Cases: {total}
      </p>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        View Details
      </button>

    </div>
  );
}