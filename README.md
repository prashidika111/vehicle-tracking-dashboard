# Vehicle-Tracking-Dashboard
A simple real time vehicle monitoring system built to have an idea of how systems like realtime GPS tracking, vehicle monitoring and all things live-state-managing are developed using socket.io. I built a 5ms timer-based buffering system where incoming vehicle positions were continuously pushed and stored every 100ms without triggering rerenders using latitude-longitude coordinates data from a demo backend server and practiced displaying realtime positions of the vehicle. To ensure maximum UX and data articulacy and representation, I experimented with additional features like marker interactions and vehicle path tracing. 
Concepts explored:
Socket.IO client-server architecture
Realtime state management
useEffect lifecycle and cleanup
Event listeners
TypeScript type narrowing
GPS tracking systems
Temporary vs persistent storage
Re-render optimization
Buffering and batching strategies
Interval-based processing
Hybrid HTTP + Socket architecture
Map centering and marker interactions
Vehicle tracing systems
Memory optimization
Popup component architecture
HLS video streaming
.m3u8 playback handling
Built only for practising around!!
