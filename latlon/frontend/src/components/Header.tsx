import { MapPin } from "lucide-react";
export function Header() 
{
  return (
    <header
      className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div
        className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase text-sky-400"> Vehicle Tracking </p>
            <h1 className="mt-2 text-3xl font-bold text-white"> Live GPS Dashboard </h1>
        </div>
        <div
          className="flex items-center gap-4 rounded-2xl bg-slate-900 px-4 py-3">
          <MapPin
            className="h-5 w-5 text-sky-400" />
          <div>
            <p className="text-sm text-slate-400"> Backend URL </p>
            <p className="text-sm font-semibold text-white"> http://localhost:8080 </p>
          </div>
        </div>
      </div>
    </header>
  );
}