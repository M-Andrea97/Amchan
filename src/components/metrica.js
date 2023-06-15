export default function Metrica(props) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-white p-6">
      <span className="rounded-full bg-blue-100 p-3 text-yellow-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={props.icon} />
        </svg>
      </span>

      <div>
        <p className="text-2xl font-medium text-yellow-900">
          {props.data}
          {props.currency ? <span className="text-sm"> USD</span> : ""}
        </p>

        <p className="text-sm text-yellow-500">{props.text}</p>
      </div>
    </div>
  );
}
