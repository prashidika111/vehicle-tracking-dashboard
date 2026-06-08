import 
{
  Wifi,
  WifiOff
} from "lucide-react";
interface LiveIndicatorProps 
{
  connected: boolean;
}
export function LiveIndicator({connected}: LiveIndicatorProps) 
{
  let statusText = "";
  let statusStyles = "";
  let StatusIcon = Wifi;
  if (connected) 
  {
    statusText =  "Realtime Active";
    statusStyles = "bg-emerald-500/20 text-emerald-300";
    StatusIcon = Wifi;
  }
  else 
  {
    statusText = "Waiting For Server";
    statusStyles = "bg-rose-500/20 text-rose-300";
    StatusIcon = WifiOff;
  }
  return (
    <section
      className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div
        className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase text-slate-400"> Live Connection </p>
          <h2
            className="mt-2 text-2xl font-bold text-white">
            {connected ? "Connected" : "Disconnected"}
          </h2>
        </div>
        <div className={`flex items-center gap-2 rounded-2xl px-4 py-3 ${statusStyles}`}>
          <StatusIcon
            className="h-5 w-5"/>
          <span> {statusText} </span>
        </div>
      </div>
    </section>
  );
}